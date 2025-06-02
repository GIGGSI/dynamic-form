import { TextField as MUITextField } from '@mui/material';
import type { TextFieldType } from '../../types/form';

type Props = {
  field: TextFieldType;
  value: string;
  onChange: (name: string, value: string) => void;
  allValues: Record<string, any>;
};

export default function TextField({ field, value, onChange, allValues }: Props) {
  let error = '';
  let pattern = field.validation?.pattern;

  // Handle dependent validation
  if (field.validation?.dependsOn) {
    const depFieldValue = allValues[field.validation.dependsOn.field];
    const rules = field.validation.dependsOn.rules;
    const conditionalRule = rules?.[depFieldValue];
    if (conditionalRule?.pattern) {
      pattern = conditionalRule.pattern;
    }
  }

  if (pattern && !new RegExp(pattern).test(value)) {
    error = 'Invalid format';
  }

  return (
    <MUITextField
      fullWidth
      label={field.label}
      value={value}
      onChange={(e) => onChange(field.name, e.target.value)}
      error={Boolean(error)}
      helperText={error || ''}
    />
  );
}
