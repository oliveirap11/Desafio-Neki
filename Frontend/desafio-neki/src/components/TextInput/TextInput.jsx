import { forwardRef } from 'react';
import styles from './TextInput.module.css';

const TextInput = forwardRef(({ 
  label, 
  type = 'text', 
  placeholder, 
  error, 
  ...props 
}, ref) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...props}
      />
      {error && (
        <span className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
