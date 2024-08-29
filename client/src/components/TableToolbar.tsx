import {
  alpha,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { FC, Fragment } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';

interface TableToolbarProps {
  entityName: string;
  keyphrase: string;
  numSelected: number;
  setKeyphrase: (keyphrase: string) => void;
  onAddNew: () => void;
  onDelete: () => void;
  onRefresh: () => void;
  onSearch: () => void;
  onUpdate: () => void;
}

export const TableToolbar: FC<TableToolbarProps> = ({
  entityName,
  keyphrase,
  numSelected,
  setKeyphrase,
  onAddNew,
  onDelete,
  onRefresh,
  onSearch,
  onUpdate,
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {entityName} seleccionados: {numSelected} 
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id={entityName}
          component="div"
        >
          {entityName.toUpperCase()}
        </Typography>
      )}
      {numSelected === 1 ? (
        <Tooltip title="Editar">
          <IconButton onClick={onUpdate}>
            <EditIcon color="warning" />
          </IconButton>
        </Tooltip>
      ) : null}
      {numSelected > 0 ? (
        <Tooltip title="Eliminar">
          <IconButton onClick={onDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      ) : (
        <Fragment>
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={keyphrase}
            onChange={(e) => setKeyphrase(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
          />
          <Tooltip title="Buscar">
            <IconButton onClick={onSearch}>
              <SearchIcon color="info" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refrescar">
            <IconButton onClick={onRefresh}>
              <RefreshIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Nuevo">
            <IconButton onClick={onAddNew}>
              <AddIcon color="success" />
            </IconButton>
          </Tooltip>
        </Fragment>
      )}
    </Toolbar>
  );
};
