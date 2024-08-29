import { useCallback, useState } from 'react';
import { ISnackbar } from '../interfaces/common';

export const useAlertNotification = () => {
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    isOpen: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarClose = useCallback(
    (
      event: React.SyntheticEvent<Element, Event> | Event | undefined,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbar({ ...snackbar, isOpen: false });
    },
    [snackbar]
  );

  return {
    snackbar,
    setSnackbar,
    handleSnackbarClose,
  };
};
