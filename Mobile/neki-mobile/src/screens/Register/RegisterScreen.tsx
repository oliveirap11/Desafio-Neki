import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Input } from '../../components/Input/Input';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { styles } from './style';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const response = await register(nome, email, senha, confirmarSenha);
      Alert.alert(
        'Cadastro Realizado!', 
        response.message || 'Sua conta foi criada com sucesso. Agora você pode fazer login.',
        [
          {
            text: 'Ir para Login',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Erro no Cadastro',
        error.response?.data?.message || 'Erro ao criar conta'
      );
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
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
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>

          <View style={styles.form}>
            <Input
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              autoCorrect={false}
            />

            <Input
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />

            <PasswordInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              autoCapitalize="none"
            />

            <PasswordInput
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              autoCapitalize="none"
            />

            <Button
              title={isLoading ? 'Criando conta...' : 'Criar conta'}
              onPress={handleRegister}
              disabled={isLoading}
            />

            <Button
              title="Já tenho uma conta"
              variant="secondary"
              onPress={navigateToLogin}
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
