import { Container, Typography } from '@mui/material';
import FormRenderer from './components/FormRenderer';
import { useState } from 'react';
import type { FormSchema } from './types/form';

const exampleSchema: FormSchema = {
  fields: [
    { type: 'text', label: 'First Name', name: 'firstName' },
    { type: 'text', label: 'Last Name', name: 'lastName' },
    { type: 'text', label: 'Email', name: 'email' },
  ]
};

export default function App() {
  const [formData, setFormData] = useState({});

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Form
      </Typography>
      <FormRenderer schema={exampleSchema} onChange={setFormData} />
      <Typography variant="h6" mt={4}>
        Output:
      </Typography>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </Container>
  );
}   
