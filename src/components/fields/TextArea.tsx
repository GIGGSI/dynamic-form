import { useState } from 'react';

import { TextField as MUITextField } from '@mui/material';
import type { TextAreaFieldType } from '../../types/form';
import { resolveFieldValidation } from '../../utils/resolveFieldValidation';

type Props = {
    field: TextAreaFieldType;
    value: string;
    onChange: (name: string, value: string) => void;
    submitted: boolean
};

export default function TextAreaField({ field, value, onChange, submitted }: Props) {
    const [touched, setTouched] = useState(false);

    const {
        helperText,
        shouldShowError,
        showRequiredMark,
    } = resolveFieldValidation(field, value, {}, submitted, touched);

    return (
        <MUITextField
            fullWidth
            label={`${field.label}${showRequiredMark ? ' *' : ''}`}
            multiline
            rows={4}
            value={value}
            onChange={(e) => {
                if (!touched) setTouched(true);
                onChange(field.name, e.target.value);
            }}
            helperText={shouldShowError ? helperText || 'Invalid value' : ' '}
        />
    );
}
