import { Box, Typography } from '@mui/material';

type Props = {
    data: Record<string, any>;
};

export default function PreviewBlock({ data }: Props) {
    return (
        <Box mt={4} p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography variant="subtitle1" gutterBottom>
                Submitted Data:
            </Typography>
            <pre style={{ margin: 0, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(data, null, 2)}
            </pre>
        </Box>
    );
}
