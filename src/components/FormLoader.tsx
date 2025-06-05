import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    Alert
} from '@mui/material';
import FormRenderer from './FormRenderer';
import type { FormSchema } from '../types/form';
import LoadingSpinner from './LoadingSpinner';

export default function FormLoader() {
    const [jsonInput, setJsonInput] = useState<string>('');
    const [parsedSchema, setParsedSchema] = useState<FormSchema | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Record<string, any> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRenderForm = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            if (!parsed || !parsed.fields || !Array.isArray(parsed.fields)) {
                throw new Error('Invalid schema format.');
            }
            setIsLoading(true);

            setParsedSchema(parsed);
            setError(null);
            setFormData(null);

            setTimeout(() => {
                setParsedSchema(parsed);
                setIsLoading(false);
            }, 1500);
        } catch (err: any) {
            setParsedSchema(null);
            setError(err.message);
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Load Form from JSON Schema
            </Typography>

            <TextField
                label="Paste Form JSON Here"
                multiline
                maxRows={10}
                minRows={3}
                fullWidth
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={handleRenderForm}>
                Render Form
            </Button>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {isLoading && <LoadingSpinner />}

            {!isLoading && parsedSchema && (
                <Box mt={4}>
                    <FormRenderer
                        schema={parsedSchema}
                        onChange={(data) => setFormData(data)}
                    />
                    {formData && (
                        <Box mt={3}>
                            <Typography variant="subtitle1" gutterBottom>Submitted Data:</Typography>
                            <pre>{JSON.stringify(formData, null, 2)}</pre>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}
