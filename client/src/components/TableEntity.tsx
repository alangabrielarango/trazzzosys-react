import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import { FC, Fragment, useEffect, useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import { DefaultData, Entity, InterfaceField, Order } from '../types/types';
import { TableToolbar } from './TableToolbar';
import { TableHeader } from './TableHeader';
import { IFormField } from '../interfaces/common';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { DeleteDialog } from './DeleteDialog';
import { useAlertNotification, useTablePagination } from '../hooks';
import { AlertNotification } from './AlertNotification';
import { TableForm } from './TableForm';
import { translateField } from '../utils/translating';

interface TableEntityProps {
  defaultData: DefaultData;
  entity: string;
  entityName: string;
  fields: IFormField[];
}

export const TableEntity: FC<TableEntityProps> = ({
  defaultData,
  entity,
  entityName,
  fields,
}) => {
  const [rows, setRows] = useState<Entity[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newRecord, setNewRecord] = useState<Entity>(defaultData as Entity);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [orderType, setOrderType] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<InterfaceField>(fields[0].id);
  const { snackbar, setSnackbar, handleSnackbarClose } = useAlertNotification();
  const {
    filteredRows,
    keyphrase,
    page,
    selectedRows,
    rowsPerPage,
    rowsToDelete,
    showDialog,
    visibleRows,
    fetchRows,
    handleAddNewMore,
    handleChangePage,
    handleChangeRowsPerPage,
    handleClick,
    handleDeleteSelected,
    handleOpenDeleteModal,
    handleRefresh,
    handleRequestSort,
    handleSave,
    handleSearch,
    handleSelectAllClick,
    handleUpdate,
    setKeyphrase,
    setShowDialog,
  } = useCrud({
    defaultData,
    entity,
    isEditMode,
    newRecord,
    rows,
    orderBy,
    orderType,
    setIsEditMode,
    setNewRecord,
    setOrderBy,
    setOrderType,
    setRows,
    setShowForm,
    setSnackbar,
  });

  useEffect(() => {
    fetchRows();
  }, []);

  return !showForm ? (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          entityName={entityName}
          keyphrase={keyphrase}
          numSelected={selectedRows.length}
          setKeyphrase={setKeyphrase}
          onAddNew={() => setShowForm(true)}
          onDelete={handleOpenDeleteModal}
          onRefresh={handleRefresh}
          onSearch={handleSearch}
          onUpdate={handleUpdate}
        />
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby={entity} size={'small'}>
            <TableHeader
              fields={fields}
              order={orderType}
              orderBy={orderBy}
              numSelected={selectedRows.length}
              rowCount={filteredRows.length}
              handleSelectAllClick={handleSelectAllClick}
              handleRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selectedRows.indexOf(row._id) !== -1;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: index % 2 === 0 ? 'white' : '#e8f1f8',
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': `row-${index}`,
                        }}
                      />
                    </TableCell>
                    {fields.map((field) => {
                      return (
                        <TableCell
                          align={
                            field.isNumeric
                              ? 'right'
                              : field.type === 'checkbox'
                              ? 'center'
                              : 'left'
                          }
                          sx={{
                            whiteSpace: field.disableWrap ? 'nowrap' : 'normal',
                          }}
                        >
                          {field.mergedIds ? (
                            field.mergedIds.map((id, index) => (
                              <Fragment key={id}>
                                {row[id]}
                                {index < (field.mergedIds?.length || 0) - 1 && (
                                  <br />
                                )}
                              </Fragment>
                            ))
                          ) : field.type === 'checkbox' ? (
                            row[field.id] ? (
                              <CheckBoxIcon />
                            ) : (
                              <CheckBoxOutlineBlankIcon />
                            )
                          ) : typeof row[field.id] === 'object' ? (
                            row[field.id].name ||
                            row[field.id].number ||
                            row[field.id]._id
                          ) : (
                            translateField(field.id, row[field.id])
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
        <AlertNotification
          snackbar={snackbar}
          handleSnackbarClose={handleSnackbarClose}
        />
        <DeleteDialog
          field="name"
          entity={entityName}
          rowsToDelete={rowsToDelete}
          showDialog={showDialog}
          handleDeleteSelected={handleDeleteSelected}
          onClose={() => setShowDialog(false)}
        />
      </Paper>
    </Box>
  ) : (
    <TableForm
      entity={entity}
      entityName={entityName}
      fields={fields}
      mode={isEditMode ? 'edit' : 'new'}
      newRecord={newRecord}
      handleAddNewMore={handleAddNewMore}
      handleSave={handleSave}
      setNewRecord={setNewRecord}
      setShowForm={setShowForm}
    />
  );
};
