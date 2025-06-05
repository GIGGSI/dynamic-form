import { useState } from 'react';
import type { FormSchema } from '../types/form';

import { Box } from '@mui/material';

import TextField from './fields/TextField';
import DropdownField from './fields/Dropdown';
import TextAreaField from './fields/TextArea';
import RadioField from './fields/RadioField';
import CheckboxField from './fields/CheckboxField';
import FormGroup from './fields/FormGroup';
import FormActionButton from './FormActionButton';

import { isFieldVisible } from '../utils/visibility';

import { hasValidationErrors } from '../utils/hasValidationErrors';
import hasEmptyRequiredFields from '../utils/hasEmptyRequiredFields';
import { submitFormMock } from '../api/mockSubmit';


import PreviewModal from './PreviewModal';
import LoadingSpinner from './LoadingSpinner';

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
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [formHidden, setFormHidden] = useState(false);

    const handleChange = (name: string, value: any) => {
        const updated = { ...values, [name]: value };
        setValues(updated);
        onChange(updated);
    };

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        e?.preventDefault();
        setSubmitted(true);

        if (hasValidationErrors(schema, values)) {
            console.warn('Validation failed, submission blocked.');
            return;
        }
        setShowSpinner(true);
        setFormHidden(true);

        try {
            const response = await submitFormMock(values)
            if (response.success) {
                setSubmittedData(values);

                setTimeout(() => {
                    setOpenModal(true);
                }, 300);

                setShowSpinner(false);
                setSubmittedData(values);
                onChange(values);
                setValues({})

            }
        } catch (err) {
            console.error('Form submission failed', err);
        }
    };

    const isSubmitDisabled = hasEmptyRequiredFields(schema, values);
    const content = (
        <Box display="flex" flexDirection="column" gap={2}>

            {!formHidden && schema.fields.map((field) => {
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
            {!formHidden && !hideSubmitButton && (
                <FormActionButton
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    type="submit"
                    label="Submit"
                />
            )}

            {
                showSpinner && (
                    <Box display="flex" justifyContent="center" mt={2}>
                        <LoadingSpinner label='' />
                    </Box>
                )
            }

        </Box >
    )

    return disableFormWrapper ? content : (
        <form onSubmit={handleSubmit}>
            {content}
            <PreviewModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                data={submittedData}
            />
        </form>
    );


}
