import styles from './Button.module.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  isLoading = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  const buttonClass = `
    ${styles.button} 
    ${styles[variant]} 
    ${styles[size]} 
    ${isLoading ? styles.loading : ''}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <div className={styles.spinner}></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
