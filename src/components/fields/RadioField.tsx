import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import type { RadioFieldType } from '../../types/form';

type Props = {
    field: RadioFieldType;
    value: string;
    onChange: (name: string, value: string) => void;
};

export default function RadioField({ field, value, onChange }: Props) {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
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
        </FormControl>
    );
}
