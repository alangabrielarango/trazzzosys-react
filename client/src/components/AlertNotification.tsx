import { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { ISnackbar } from '../interfaces/common';

interface NotificationProps {
  snackbar: ISnackbar;
  handleSnackbarClose: (
    event: React.SyntheticEvent<Element, Event> | Event | undefined,
    reason?: string
  ) => void;
}

export const AlertNotification: FC<NotificationProps> = ({
  snackbar,
  handleSnackbarClose,
}) => {
  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={snackbar.severity === 'error' ? 6000 : 3000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbar.severity}
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};
