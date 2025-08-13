import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

interface PasswordInputProps extends TextInputProps {
  // Props adicionais se necessário
}

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(({ style, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholderTextColor="#666"
        secureTextEntry={!showPassword}
        {...rest}
      />
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={togglePasswordVisibility}
        activeOpacity={0.7}
      >
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
});
