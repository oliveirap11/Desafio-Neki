import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Button from '../../components/Button/Button';
import { useAuth } from '../../contexts/AuthContext';
import styles from './login.styles.module.css';

export function Login() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Carregar dados salvos ao montar o componente
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedEmail) {
      setValue('email', savedEmail);
      setRememberMe(true);
    }
    if (savedPassword) {
      setValue('password', savedPassword);
    }
  }, [setValue]);

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');
    
    // Salvar ou remover dados do localStorage baseado no checkbox
    if (rememberMe) {
      localStorage.setItem('savedEmail', data.email);
      localStorage.setItem('savedPassword', data.password);
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
    }
    
    const result = await login(data.email, data.password);
    
    if (result.success) {
      navigate('/home');
    } else {
      setApiError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Acesse sua conta</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            {...register('password', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 6,
                message: 'Senha deve ter pelo menos 6 caracteres'
              }
            })}
            error={errors.password?.message}
          />

          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              Lembrar email e senha
            </label>
          </div>

          {apiError && (
            <div className={styles.errorMessage}>
              {apiError}
            </div>
          )}

          <Button
            type="submit"
            size="large"
            isLoading={isLoading}
            className={styles.submitButton}
          >
            Entrar
          </Button>

          <div className={styles.footer}>
            <p>
              Não tem uma conta?{' '}
              <Link to="/cadastro" className={styles.link}>
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
