import { Paper, Typography } from '@mui/material';
import type { GroupFieldType } from '../../types/form';
import FormRenderer from '../FormRenderer';

type Props = {
  field: GroupFieldType;
  value?: Record<string, any>;
  onChange: (name: string, value: any) => void;
  allValues: Record<string, any>;
};

export default function FormGroup({ field, value = {}, onChange, allValues }: Props) {
  const handleGroupChange = (groupData: Record<string, any>) => {
    onChange(field.name, groupData);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>{field.label}</Typography>
      <FormRenderer
        schema={{ fields: field.fields }}
        onChange={handleGroupChange}
        parentValues={value}
        parentAllValues={allValues}
        disableFormWrapper
        hideSubmitButton
      />

    </Paper>
  );
}
