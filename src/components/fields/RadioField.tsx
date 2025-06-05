import { useState } from 'react';

import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    FormHelperText,
    Radio,
    Typography
} from '@mui/material';
import type { RadioFieldType } from '../../types/form';
import { resolveFieldValidation } from '../../utils/resolveFieldValidation';

type Props = {
    field: RadioFieldType;
    value: string;
    onChange: (name: string, value: string) => void;
    submitted: boolean;
};

export default function RadioField({ field, value, onChange, submitted }: Props) {
    const [touched, setTouched] = useState<boolean>(false);

    const {
        helperText,
        shouldShowError,
        showRequiredMark,
    } = resolveFieldValidation(field, value, {}, submitted, touched);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!touched) setTouched(true);
        onChange(field.name, e.target.value);
    };


    return (
        <FormControl
            required={showRequiredMark}
            error={shouldShowError}
            component="fieldset"
            sx={{ mb: 2 }}
        >
            <FormLabel component="legend">
                <Typography component="span">
                    {field.label}
                </Typography>
            </FormLabel>
            <RadioGroup
                value={value}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
            >
                {field.options.map((opt) => (
                    <FormControlLabel
                        key={opt}
                        value={opt}
                        control={<Radio />}
                        label={opt}
                    />
                ))}
            </RadioGroup>
            <FormHelperText>{shouldShowError ? helperText || 'Required' : ' '}</FormHelperText>
        </FormControl>
    );
}
