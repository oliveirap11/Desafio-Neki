import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button/Button';
import styles from './home.styles.module.css';

export function Home() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={styles.userInfo}>
            <span className={styles.welcome}>
              Bem-vindo, {user?.nome || user?.email}!
            </span>
            <Button 
              variant="outline" 
              size="small"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.card}>
            <h2>Suas Skills</h2>
            <p>Gerencie suas habilidades técnicas aqui.</p>
            <Button>Ver Skills</Button>
          </div>

          <div className={styles.card}>
            <h2>Perfil</h2>
            <p>Visualize e edite suas informações pessoais.</p>
            <Button variant="secondary">Editar Perfil</Button>
          </div>

          <div className={styles.card}>
            <h2>Estatísticas</h2>
            <p>Acompanhe seu progresso e desenvolvimento.</p>
            <Button variant="outline">Ver Relatórios</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
