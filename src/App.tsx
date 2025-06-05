import { Container, Typography } from '@mui/material';
import FormRenderer from './components/FormRenderer';
import { useState } from 'react';
import type { FormSchema } from './types/form';
import FormLoader from './components/FormLoader';

const exampleSchema: FormSchema = {
  fields: [
    {
      type: 'text', label: 'First Name', name: 'firstName',
      validation: {
        required: true,
        message: 'First name is required'
      }
    },
    { type: 'text', label: 'Last Name', name: 'lastName' },
    { type: 'text', label: 'Email', name: 'email' },
    {
      type: 'textarea',
      label: 'Comments',
      name: 'comments',
      validation: {
        required: true,
        message: 'About section is required'
      }
    },
    {
      type: 'radio',
      label: 'Identification Type',
      name: 'idType',
      options: ['PERSONAL ID', 'PASSPORT'],
      validation: {
        required: true,
        message: 'About section is required'
      }
    },
    {
      type: 'checkbox',
      label: 'I accept the terms and conditions',
      name: 'agree',
      validation: {
        required: true,
        message: 'This field is required'
      }
    },
    {
      type: 'text',
      label: 'Identification Number',
      name: 'idNumber',
      validation: {
        dependsOn: {
          field: 'idType',
          rules: {
            'PERSONAL ID': {
              required: true,
              pattern: '^[0-9]{10}$',
              message: 'Must be exactly 10 digits',
            },
            PASSPORT: {
              required: true,
              pattern: '^[A-Z0-9]{6,9}$',
              message: 'Must be 6–9 uppercase letters or numbers',
            }
          }
        }
      }
    },
    {
      type: 'dropdown',
      label: 'User Type',
      name: 'userType',
      options: ['INDIVIDUAL', 'BUSINESS'],
      validation: {
        required: true,
        message: 'About section is required'
      }
    },
    {
      type: 'group',
      label: 'Business Details',
      name: 'businessDetails',
      visibleIf: {
        field: 'userType',
        equals: 'BUSINESS'
      },
      fields: [
        {
          type: 'text',
          label: 'Company Name',
          name: 'companyName'
        },
        {
          type: 'text',
          label: 'EIK',
          name: 'companyEIK'
        }
      ]
    }

  ]
};

export default function App() {
  const [formData, setFormData] = useState({});

  return (
    <Container sx={{ py: 4 }}>
      {/* <Typography variant="h4" gutterBottom>
        Dynamic Form
      </Typography>
      <FormRenderer schema={exampleSchema} onChange={setFormData} />
      <Typography variant="h6" mt={4}>
        Output:
      </Typography>
      <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      <FormLoader />
    </Container>
  );
}   
