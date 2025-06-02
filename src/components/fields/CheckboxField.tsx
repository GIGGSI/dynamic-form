import { Checkbox, FormControlLabel } from '@mui/material';
import type { CheckboxFieldType } from '../../types/form';

type Props = {
  field: CheckboxFieldType;
  value: boolean;
  onChange: (name: string, value: boolean) => void;
};

export default function CheckboxField({ field, value, onChange }: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value || false}
          onChange={(e) => onChange(field.name, e.target.checked)}
        />
      }
      label={field.label}
    />
  );
}
