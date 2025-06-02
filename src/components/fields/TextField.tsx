import { TextField as MUITextField } from '@mui/material';
import type { TextFieldType } from '../../types/form';

type Props = {
  field: TextFieldType;
  value: string;
  onChange: (name: string, value: string) => void;
};

export default function TextField({ field, value, onChange }: Props) {
  return (
    <MUITextField
      fullWidth
      label={field.label}
      value={value}
      onChange={(e) => onChange(field.name, e.target.value)}
    />
  );
}
