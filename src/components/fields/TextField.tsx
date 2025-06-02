import { useState } from 'react';
import { TextField as MUITextField } from '@mui/material';
import type { TextFieldType } from '../../types/form';

type Props = {
    field: TextFieldType;
    value: string;
    onChange: (name: string, value: string) => void;
    allValues: Record<string, any>;
};

export default function TextField({ field, value, onChange, allValues }: Props) {
    const [touched, setTouched] = useState<boolean>(false);

    let error = '';
    let pattern = field.validation?.pattern;
    let helperText = field.validation?.message ?? '';

    if (field.validation?.dependsOn) {
        const depValue = allValues[field.validation.dependsOn.field];
        const rule = field.validation.dependsOn.rules?.[depValue];

        if (rule?.pattern) pattern = rule.pattern;
        if (rule?.message) helperText = rule.message;
    }


    const isInvalid = pattern && !new RegExp(pattern).test(value);

    if (touched && isInvalid) {
        error = 'Invalid';
    }

    return (
        <MUITextField
            fullWidth
            label={field.label}
            value={value}
            onChange={(e) => {
                if (!touched) setTouched(true);
                onChange(field.name, e.target.value);
            }}
            onBlur={() => setTouched(true)}
            error={!!error}
            helperText={!!error ? helperText : ''}
        />
    );
}

