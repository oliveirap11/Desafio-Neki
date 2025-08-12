import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Button from '../../components/Button/Button';
import { useAuth } from '../../contexts/AuthContext';
import styles from './cadastro.styles.module.css';

export function Cadastro() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Observar o valor da senha para validar confirmação
  const watchPassword = watch('password');

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');
    try {
      // Remover confirmPassword antes de enviar para API
      const { confirmPassword, name, ...userData } = data;
      // Backend espera nome, email, senha, confirmarSenha
      const payload = {
        nome: name,
        email: userData.email,
        senha: userData.password,
        confirmarSenha: confirmPassword
      };
      const response = await import('../../api/api').then(({ default: api }) =>
        api.post('/auth/cadastro', payload)
      );
      setSuccessMessage(response.data.message || 'Cadastro realizado com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setApiError(error.response?.data?.message || 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h1 className={styles.title}>Criar Conta</h1>
          <p className={styles.subtitle}>
            Preencha seus dados para criar uma nova conta
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Campo Nome */}
          <TextInput
            label="Nome completo"
            placeholder="Digite seu nome completo"
            {...register('name', {
              required: 'Nome é obrigatório',
              minLength: {
                value: 2,
                message: 'Nome deve ter pelo menos 2 caracteres'
              }
            })}
            error={errors.name?.message}
          />

          {/* Campo Email */}
          <TextInput
            label="Email"
            type="email"
            placeholder="Digite seu email"
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            error={errors.email?.message}
          />

          {/* Campo Senha */}
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            {...register('password', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 6,
                message: 'Senha deve ter pelo menos 6 caracteres'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Senha deve conter ao menos: 1 maiúscula, 1 minúscula e 1 número'
              }
            })}
            error={errors.password?.message}
          />

          {/* Campo Confirmar Senha */}
          <PasswordInput
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            {...register('confirmPassword', {
              required: 'Confirmação de senha é obrigatória',
              validate: value =>
                value === watchPassword || 'As senhas não coincidem'
            })}
            error={errors.confirmPassword?.message}
          />

          {/* Mensagens de erro e sucesso */}
          {apiError && (
            <div className={styles.errorMessage}>
              {apiError}
            </div>
          )}

          {successMessage && (
            <div className={styles.successMessage}>
              {successMessage}
            </div>
          )}

          {/* Botão de Cadastro */}
          <Button
            type="submit"
            variant="primary"
            size="large"
            isLoading={isLoading}
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </Button>

          {/* Link para Login */}
          <div className={styles.registerLink}>
            <span>Já tem uma conta? </span>
            <Link to="/" className={styles.link}>
              Fazer login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
