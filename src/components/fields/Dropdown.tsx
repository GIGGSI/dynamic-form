import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

import type { DropdownFieldType } from '../../types/form';

type Props = {
    field: DropdownFieldType;
    value: string;
    onChange: (name: string, value: string) => void;
};

export default function DropdownField({ field, value, onChange }: Props) {
    return (
        <FormControl fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Select
                value={value}
                label={field.label}
                onChange={(e: SelectChangeEvent<string>) =>
                    onChange(field.name, e.target.value)
                }
            >
                {field.options.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
