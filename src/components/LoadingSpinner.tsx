// src/components/LoadingSpinner.tsx
import { Box, CircularProgress, Fade, Typography } from '@mui/material';

type Props = {
  size?: number;
  centered?: boolean;
  label?: string;
};

export default function LoadingSpinner({
  size = 100,
  centered = true,
  label = 'Loading...'
}: Props) {
  return (
    <Fade in timeout={500}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={centered ? 'center' : 'flex-start'}
        mt={4}
        height={centered ? '100%' : 'auto'}
      >
        <CircularProgress size={size} />
        {label && (
          <Typography variant="body2" color="textSecondary" mt={2}>
            {label}
          </Typography>
        )}
      </Box>
    </Fade>
  );
}
