import { useState } from 'react';
import { Box } from '@mui/material';
import type { FormSchema } from '../types/form';
import TextField from './fields/TextField';
import DropdownField from './fields/Dropdown';
import TextAreaField from './fields/TextArea';
import RadioField from './fields/RadioField';
import CheckboxField from './fields/CheckboxField';
import FormGroup from './fields/FormGroup';
import FormActionButton from './FormActionButton';

import { isFieldVisible } from '../utils/visibility';

import { hasValidationErrors } from '../utils/hasValidationErrors';
import hasEmptyRequiredFields  from '../utils/hasEmptyRequiredFields';


import PreviewBlock from './PreviewBlock';

type Props = {
    schema: FormSchema;
    onChange: (data: Record<string, any>) => void;
    parentValues?: Record<string, any>;
    parentAllValues?: Record<string, any>;
    disableFormWrapper?: boolean;
    hideSubmitButton?: boolean;
};


export default function FormRenderer({ schema, onChange, parentValues, parentAllValues, disableFormWrapper, hideSubmitButton }: Props) {
    const [values, setValues] = useState<Record<string, any>>(parentValues || {});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

    const handleChange = (name: string, value: any) => {
        const updated = { ...values, [name]: value };
        setValues(updated);
        onChange(updated);
    };

    const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
        e?.preventDefault();
        setSubmitted(true);
      
        if (hasValidationErrors(schema, values)) {
          console.warn('Validation failed, submission blocked.');
          return;
        }
      
        setSubmittedData(values);
        onChange(values);
      };
      

    const isSubmitDisabled = hasEmptyRequiredFields(schema, values);
    const content = (
        <Box display="flex" flexDirection="column" gap={2}>
            {schema.fields.map((field) => {
                if (!isFieldVisible(field, values)) return null;

                switch (field.type) {
                    case 'text':
                        return (
                            <TextField
                                key={field.name}
                                field={field}
                                value={values[field.name] || ''}
                                onChange={handleChange}
                                allValues={parentAllValues || values}
                                submitted={submitted}
                            />
                        );
                    case 'dropdown':
                        return (
                            <DropdownField
                                key={field.name}
                                field={field}
                                value={values[field.name] || ''}
                                onChange={handleChange}
                                submitted={submitted}
                            />
                        );
                    case 'textarea':
                        return <TextAreaField
                            key={field.name}
                            field={field}
                            value={values[field.name] || ''}
                            onChange={handleChange}
                            submitted={submitted}
                        />;
                    case 'radio':
                        return (
                            <RadioField
                                key={field.name}
                                field={field}
                                value={values[field.name] || ''}
                                onChange={handleChange}
                                submitted={submitted}
                            />
                        );
                    case 'checkbox':
                        return (
                            <CheckboxField
                                key={field.name}
                                field={field}
                                value={values[field.name] || false}
                                onChange={handleChange}
                                submitted={submitted}
                            />
                        );
                    case 'group':
                        return (
                            <FormGroup
                                key={field.name}
                                field={field}
                                value={values[field.name]}
                                onChange={handleChange}
                                allValues={parentAllValues || values}
                            />
                        )
                    default:
                        return null;
                }
            })}

            {!hideSubmitButton && (
                <FormActionButton
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    type="submit"
                    label="Submit"
                />
            )}

            {!hideSubmitButton && submittedData && <PreviewBlock data={submittedData} />}

        </Box>
    )

    return disableFormWrapper ? content : <form onSubmit={handleSubmit}>{content}</form>;

}
