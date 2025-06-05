import { useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Typography,
} from '@mui/material';
import type { CheckboxFieldType } from '../../types/form';
import { resolveFieldValidation } from '../../utils/resolveFieldValidation';

type Props = {
  field: CheckboxFieldType;
  value: boolean;
  onChange: (name: string, value: boolean) => void;
  submitted: boolean;
};

export default function CheckboxField({ field, value, onChange, submitted }: Props) {
  const [touched, setTouched] = useState<boolean>(false);

  const {
    helperText,
    shouldShowError,
    showRequiredMark,
  } = resolveFieldValidation(field, value, {}, submitted, touched);

  return (
    <FormControl
      required={showRequiredMark}
      error={shouldShowError}
      component="fieldset"
      sx={{ mb: 2 }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={value || false}
              onChange={(e) => {
                if (!touched) setTouched(true);
                onChange(field.name, e.target.checked);
              }}
              onBlur={() => setTouched(true)}
            />
          }
          label={
            <Typography component="span">
              {field.label}
              {showRequiredMark && <span > *</span>}
            </Typography>
          }
        />
      </FormGroup>
      <FormHelperText>{shouldShowError ? helperText || 'Required' : ' '}</FormHelperText>
    </FormControl>
  );
}
