import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  
  // Tamanhos
  small: {
    height: 36,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  large: {
    height: 60,
    paddingHorizontal: 24,
    marginVertical: 12,
  },
  
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#007AFF',
  },
  disabledText: {
    color: '#999',
  },
  
  // Tamanhos de texto
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
});
