import { useState } from 'react';

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

import type { DropdownFieldType } from '../../types/form';
import { resolveFieldValidation } from '../../utils/resolveFieldValidation';

type Props = {
    field: DropdownFieldType;
    value: string;
    onChange: (name: string, value: string) => void;
    submitted: boolean;
};

export default function DropdownField({ field, value, onChange, submitted }: Props) {
    const [touched, setTouched] = useState(false);

    const {
        helperText,
        shouldShowError,
        showRequiredMark,
    } = resolveFieldValidation(field, value, {}, submitted, touched);

    return (
        <FormControl
            fullWidth
            error={shouldShowError}
            required={showRequiredMark}
            sx={{ mb: 2 }}
        >
            <InputLabel>{field.label}</InputLabel>
            <Select
                value={value}
                label={field.label}
                onChange={(e: SelectChangeEvent<string>) => {
                    if (!touched) setTouched(true);
                    onChange(field.name, e.target.value);
                }}
                onBlur={() => setTouched(true)}
            >

                {field.options.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{shouldShowError ? helperText || 'Required' : ' '}</FormHelperText>
        </FormControl>
    );
}
