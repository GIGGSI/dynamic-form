import { useState } from 'react';
import { TextField as MUITextField } from '@mui/material';
import type { TextFieldType } from '../../types/form';
import { resolveFieldValidation } from '../../utils/resolveFieldValidation';

type Props = {
    field: TextFieldType;
    value: string;
    onChange: (name: string, value: any) => void;
    allValues: Record<string, any>;
    submitted: boolean;
};

export default function TextField({ field, value, onChange, allValues, submitted }: Props) {
    const [touched, setTouched] = useState<boolean>(false);

    const {
        helperText,
        shouldShowError,
        showRequiredMark,
    } = resolveFieldValidation(field, value, allValues, submitted, touched);

    return (
        <MUITextField
            fullWidth
            label={`${field.label}${showRequiredMark ? ' *' : ''}`}
            value={value}
            onChange={(e) => {
                if (!touched) setTouched(true);
                onChange(field.name, e.target.value);
            }}
            onBlur={() => setTouched(true)}
            error={shouldShowError}
            helperText={shouldShowError ? helperText || 'Invalid value' : ' '}
        />
    );
}