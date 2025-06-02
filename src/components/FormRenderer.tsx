import { useState } from 'react';
import { Box } from '@mui/material';
import type { FormSchema, Field } from '../types/form';
import TextField from './fields/TextField';

type Props = {
  schema: FormSchema;
  onChange: (data: Record<string, any>) => void;
};

export default function FormRenderer({ schema, onChange }: Props) {
  const [values, setValues] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    const updated = { ...values, [name]: value };
    setValues(updated);
    onChange(updated);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {schema.fields.map((field) => {
        switch (field.type) {
          case 'text':
            return (
              <TextField
                key={field.name}
                field={field}
                value={values[field.name] || ''}
                onChange={handleChange}
              />
            );
          default:
            return null;
        }
      })}
    </Box>
  );
}
