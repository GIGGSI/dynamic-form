import { useState } from 'react';
import { Box } from '@mui/material';
import type { FormSchema } from '../types/form';
import TextField from './fields/TextField';
import DropdownField from './fields/Dropdown';
import TextAreaField from './fields/TextArea';
import RadioField from './fields/RadioField';
import CheckboxField from './fields/CheckboxField';
import FormGroup from './fields/FormGroup';
import FormActionButton from './FormActionButton';

import { isFieldVisible } from '../utils/visibility';

type Props = {
    schema: FormSchema;
    onChange: (data: Record<string, any>) => void;
    parentValues?: Record<string, any>;      // ✅ Optional parent values (group support)
    parentAllValues?: Record<string, any>;   // ✅ Optional full form values
};


export default function FormRenderer({ schema, onChange, parentValues, parentAllValues }: Props) {
    const [values, setValues] = useState<Record<string, any>>(parentValues || {});
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (name: string, value: any) => {
        const updated = { ...values, [name]: value };
        setValues(updated);
        onChange(updated);
    };

    const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
        e?.preventDefault();
        setSubmitted(true);
        onChange(values);
        console.log('✅ Final form data:', values);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
                {schema.fields.map((field) => {
                    if (!isFieldVisible(field, values)) return null;

                    switch (field.type) {
                        case 'text':
                            return (
                                <TextField
                                    key={field.name}
                                    field={field}
                                    value={values[field.name] || ''}
                                    onChange={handleChange}
                                    allValues={parentAllValues || values}
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
                        case 'group':
                            return (
                                <FormGroup
                                    key={field.name}
                                    field={field}
                                    value={values[field.name]}
                                    onChange={handleChange}
                                    allValues={parentAllValues || values}
                                />
                            )
                        default:
                            return null;
                    }
                })}
            </Box>
            <FormActionButton
                onClick={handleSubmit}
                label="Submit"
                type="submit"
            />
        </form>
    );
}
