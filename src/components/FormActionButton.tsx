import { Button } from '@mui/material';

type FormActionButtonProps = {
  onClick: () => void;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'contained' | 'outlined' | 'text'; 
  color?: 'primary' | 'secondary' | 'success' | 'error';
};

export default function FormActionButton({
  onClick,
  label = 'Submit',
  loading = false,
  disabled = false,
  type = 'button',
  variant = 'contained',
  color = 'primary'
}: FormActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      variant={variant}
      color={color}
    >
      {loading ? 'Loading...' : label}
    </Button>
  );
}
