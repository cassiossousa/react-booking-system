import type { ReactNode } from 'react';
import { FieldWrapper, Label, ErrorText, StyledInput } from './Input.styles';

interface FieldProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

export const Field = ({ label, error, children }: FieldProps) => {
  return (
    <FieldWrapper>
      {label && <Label>{label}</Label>}
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </FieldWrapper>
  );
};

export const Input = StyledInput;
