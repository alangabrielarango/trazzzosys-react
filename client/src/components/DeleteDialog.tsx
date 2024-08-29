import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FC } from 'react';
import { Entity } from '../types/types';

interface DeleteDialogProps {
  field: string;
  entity: string;
  rowsToDelete: Array<Entity>;
  showDialog: boolean;
  handleDeleteSelected: () => void;
  onClose: () => void;
}

export const DeleteDialog: FC<DeleteDialogProps> = ({
  field,
  entity,
  rowsToDelete,
  showDialog,
  handleDeleteSelected,
  onClose,
}) => {
  return (
    <Dialog
      open={showDialog}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Confirmar Eliminación'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Está seguro que quiere eliminar los siguientes {entity}?
        </DialogContentText>
        <ul>
          {rowsToDelete.map((row) => (
            <li key={row._id}>{row[field as keyof Entity]}</li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDeleteSelected} color="error" autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
