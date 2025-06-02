import { TextField as MUITextField } from '@mui/material';
import type { TextAreaFieldType } from '../../types/form';

type Props = {
    field: TextAreaFieldType;
    value: string;
    onChange: (name: string, value: string) => void;
};

export default function TextAreaField({ field, value, onChange }: Props) {
    return (
        <MUITextField
            fullWidth
            label={field.label}
            multiline
            rows={4}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
        />
    );
}
