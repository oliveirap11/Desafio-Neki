import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { authAPI } from '../services/api';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('auth_token');
      const storedUser = await SecureStore.getItemAsync('user_data');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar dados de autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginValue: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login({ email: loginValue, senha: password });
      
      // Converter a resposta para User
      const user: User = {
        id: response.id,
        nome: response.nome,
        email: response.email
      };
      
      // Armazenar token e dados do usuário
      await SecureStore.setItemAsync('auth_token', response.token);
      await SecureStore.setItemAsync('user_data', JSON.stringify(user));
      
      setToken(response.token);
      setUser(user);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (nome: string, email: string, senha: string, confirmarSenha: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register({ nome, email, senha, confirmarSenha });
      
      // Registro bem-sucedido, mas não faz login automático
      // O usuário precisará fazer login manualmente
      return response;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('user_data');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
