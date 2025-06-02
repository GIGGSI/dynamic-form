import { useState } from 'react';
import { Box } from '@mui/material';
import type { FormSchema } from '../types/form';
import TextField from './fields/TextField';
import DropdownField from './fields/Dropdown';
import TextAreaField from './fields/TextArea';
import RadioField from './fields/RadioField';
import CheckboxField from './fields/CheckboxField';

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
                    case 'dropdown':
                        return (
                            <DropdownField
                                key={field.name}
                                field={field}
                                value={values[field.name] || ''}
                                onChange={handleChange}
                            />
                        );
                    case 'textarea':
                        return <TextAreaField
                            key={field.name}
                            field={field}
                            value={values[field.name] || ''}
                            onChange={handleChange}
                        />;
                    case 'radio':
                        return (
                            <RadioField
                                key={field.name}
                                field={field}
                                value={values[field.name] || ''}
                                onChange={handleChange}
                            />
                        );
                    case 'checkbox':
                        return (
                            <CheckboxField
                                key={field.name}
                                field={field}
                                value={values[field.name] || false}
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
