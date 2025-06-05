import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
  } from '@mui/material';
  
  type Props = {
    open: boolean;
    onClose: () => void;
    title?: string;
    data: any;
  };
  
  export default function PreviewModal({ open, onClose, title = 'Preview', data }: Props) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography component="pre" variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(data, null, 2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
  