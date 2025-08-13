import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 50, // Espaço para o botão
    backgroundColor: '#fff',
    fontSize: 16,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
});
