import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../components/Input/Input';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { styles } from './style';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login: authLogin, isLoading } = useAuth();

  // Carregar credenciais salvas
  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedCredentials = await AsyncStorage.getItem('userCredentials');
      if (savedCredentials) {
        const { login: savedLogin, password: savedPassword } = JSON.parse(savedCredentials);
        setLogin(savedLogin);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.log('Erro ao carregar credenciais:', error);
    }
  };

  const saveCredentials = async () => {
    try {
      if (rememberMe) {
        await AsyncStorage.setItem('userCredentials', JSON.stringify({
          login,
          password
        }));
      } else {
        await AsyncStorage.removeItem('userCredentials');
      }
    } catch (error) {
      console.log('Erro ao salvar credenciais:', error);
    }
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async () => {
    if (!login.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      await saveCredentials(); // Salvar ou remover credenciais baseado no checkbox
      await authLogin(login, password);
      // Navegação será feita automaticamente pelo App.tsx
    } catch (error: any) {
      Alert.alert(
        'Erro no Login',
        error.response?.data?.message || 'Credenciais inválidas'
      );
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Sistema de Skills</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          <View style={styles.form}>
            <Input
              placeholder="Login"
              value={login}
              onChangeText={setLogin}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <PasswordInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleRememberMe}
              activeOpacity={0.7}
            >
              <View style={styles.checkbox}>
                {rememberMe && (
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color="#007AFF"
                  />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Lembrar usuário e senha</Text>
            </TouchableOpacity>

            <Button
              title={isLoading ? 'Entrando...' : 'Entrar'}
              onPress={handleLogin}
              disabled={isLoading}
            />

            <Button
              title="Criar conta"
              variant="secondary"
              onPress={navigateToRegister}
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
