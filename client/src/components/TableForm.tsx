import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { IFormField } from '../interfaces/common';
import { useAlertNotification } from '../hooks';
import { AlertNotification } from './AlertNotification';
import { Entity } from '../types/types';
import { fetchData } from '../api/crud';
import { useNavigate } from 'react-router-dom';
import { getFilteredRowForSelect } from '../utils/filtering';

interface TableFormProps {
  entity: string;
  entityName: string;
  fields: Array<IFormField>;
  mode: 'edit' | 'new';
  newRecord: Entity;
  handleAddNewMore: () => void;
  handleSave: (addMore: boolean) => void;
  setShowForm: (isOpen: boolean) => void;
  setNewRecord: (record: Entity) => void;
}

export const TableForm: FC<TableFormProps> = ({
  entity,
  entityName,
  fields,
  mode,
  newRecord,
  handleAddNewMore,
  handleSave,
  setShowForm,
  setNewRecord,
}) => {
  const { snackbar, handleSnackbarClose, setSnackbar } = useAlertNotification();
  const [selectOptions, setSelectOptions] = useState<
    Record<string, Array<any>>
  >({});
  const navigate = useNavigate();
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewRecord({
        ...newRecord,
        [event.target.name]: event.target.value,
      });
    },
    [newRecord]
  );

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewRecord({
        ...newRecord,
        [event.target.name]: event.target.checked,
      });
    },
    [newRecord]
  );

  const handleSelectChange = useCallback(
    (event: SelectChangeEvent) => {
      setNewRecord({
        ...newRecord,
        [event.target.name]: event.target.value,
      });
    },
    [newRecord]
  );

  useEffect(() => {
    fields.forEach(async (field) => {
      if (
        field.type === 'select' &&
        field.selectConfig?.entity &&
        field.selectConfig?.fields
      ) {
        const response = await fetchData(
          field.selectConfig.entity,
          setSnackbar,
          () => navigate('/login')
        );
        if (response) {
          const filteredRows = getFilteredRowForSelect(
            entity,
            field.id,
            response,
            newRecord,
          );
          const sortedOptions = filteredRows.sort(
            (a: any, b: any) =>
              field.selectConfig?.fields &&
              a[field.selectConfig.fields[0]].localeCompare(
                b[field.selectConfig.fields[0]]
              )
          );
          setSelectOptions({
            ...selectOptions,
            [field.id]: sortedOptions,
          });
        }
      }
    });
  }, [fields, entity, newRecord, setSelectOptions, setSnackbar, navigate]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          {mode === 'edit' ? 'Editar' : 'Nuevo'} {entityName}
        </Typography>
        {fields.map((field) => {
          return field.type === 'textfield' ? (
            field.mergedIds ? (
              field.mergedIds.map((id) => {
                return (
                  <TextField
                    label={field.label}
                    name={id}
                    value={newRecord[id]}
                    onChange={handleInputChange}
                    margin="dense"
                    fullWidth
                  />
                );
              })
            ) : (
              <TextField
                label={field.label}
                name={field.id}
                value={newRecord[field.id]}
                onChange={handleInputChange}
                margin="dense"
                fullWidth
              />
            )
          ) : field.type === 'select' ? (
            <FormControl fullWidth variant="outlined">
              <InputLabel id={`label-${field.id}`}>{field.label}</InputLabel>
              <Select
                labelId={`label-${field.id}`}
                id={field.id}
                name={field.id}
                value={newRecord[field.id]?._id || newRecord[field.id] || ''}
                label={field.label}
                onChange={handleSelectChange}
              >
                {field.selectConfig?.options
                  ? field.selectConfig.options.map((o) =>
                      typeof o === 'object' ? (
                        <MenuItem key={o.key} value={o.value}>
                          {o.key}
                        </MenuItem>
                      ) : (
                        <MenuItem key={o} value={o}>
                          {o}
                        </MenuItem>
                      )
                    )
                  : field.selectConfig?.entity &&
                    selectOptions[field.id]?.map((o) => (
                      <MenuItem key={o._id} value={o._id}>
                        {field.selectConfig?.fields
                          ? field.selectConfig.fields
                              .map((f, i) =>
                                i > 0 && o[f] ? '( ' + o[f] + ' )' : o[f] ?? ''
                              )
                              .join(' ')
                          : o._id}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          ) : (
            //<Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRecord[field.id] as boolean}
                  onChange={handleCheckboxChange}
                  name={field.id}
                  color="primary"
                />
              }
              label={field.label}
            />
          );
        })}
        <Box sx={{ mt: 2, marginTop: 3 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSave(false)}
          >
            {mode === 'edit' ? 'Guardar Cambios' : 'Guardar'}
          </Button>
          {mode === 'new' && (
            <Button
              sx={{ ml: 2 }}
              variant="contained"
              color="success"
              onClick={handleAddNewMore}
            >
              Guardar y Añadir Otro
            </Button>
          )}
          <Button
            sx={{ ml: 2 }}
            variant="contained"
            color="warning"
            onClick={() => setShowForm(false)}
          >
            Cancelar
          </Button>
          <AlertNotification
            snackbar={snackbar}
            handleSnackbarClose={handleSnackbarClose}
          />
        </Box>
      </Paper>
    </Box>
  );
};
