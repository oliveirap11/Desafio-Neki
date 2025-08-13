import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './style';

interface InputProps extends TextInputProps {
  // Props adicionais se necessário
}

export const Input = forwardRef<TextInput, InputProps>(({ style, ...rest }, ref) => {
  return (
    <TextInput
      ref={ref}
      style={[styles.input, style]}
      placeholderTextColor="#666"
      {...rest}
    />
  );
});
