import { useCallback, useMemo, useState } from 'react';
import { DefaultData, Entity, InterfaceField, Order } from '../types/types';
import { useTablePagination } from './useTablePagination';
import { getComparator, stableSort } from '../utils/sorting';
import { deleteData, fetchData, insertData, updateData } from '../api/crud';
import { ISnackbar } from '../interfaces/common';
import { useNavigate } from 'react-router-dom';

interface useCrodProps {
  defaultData: DefaultData;
  entity: string;
  isEditMode: boolean;
  newRecord: Entity;
  rows: Entity[];
  orderBy: InterfaceField;
  orderType: Order;
  setIsEditMode: (isEditMode: boolean) => void;
  setNewRecord: (newRecord: Entity) => void;
  setOrderBy: (field: InterfaceField) => void;
  setOrderType: (type: Order) => void;
  setRows: (rows: Entity[]) => void;
  setShowForm: (showForm: boolean) => void;
  setSnackbar: (snackbar: ISnackbar) => void;
}

export const useCrud = ({
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
}: useCrodProps) => {
  const [selectedRows, setSelectedRows] = useState<readonly string[]>([]);
  const {
    page,
    rowsPerPage,
    setPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTablePagination(10, setSelectedRows);
  const [keyphrase, setKeyphrase] = useState<string>('');
  const [filteredRows, setFilteredRows] = useState<Entity[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [rowsToDelete, setRowsToDelete] = useState<Entity[]>([]);
  const navigate = useNavigate();

  const fetchRows = useCallback(async () => {
    const response = await fetchData(entity, setSnackbar, () => navigate('/login'));
    if (response) {
      setRows(response);
      setFilteredRows(response);
    } else {
      setSnackbar({
        isOpen: true,
        message: `Error, no se pudo encontrar los registros`,
        severity: 'error',
      });
    }
  }, [entity, setRows, setFilteredRows, setSnackbar]);

  const handleOpenDeleteModal = useCallback(() => {
    const selected = rows.filter((row) => selectedRows.includes(row._id));
    setRowsToDelete(selected);
    setShowDialog(true);
  }, [rows, selectedRows, setRowsToDelete, setShowDialog]);

  const handleRefresh = useCallback(() => {
    setKeyphrase('');
    fetchRows();
  }, [setKeyphrase, fetchRows]);

  const handleSearch = useCallback(() => {
    const lowercasedKeyphrase = keyphrase.toLowerCase();
    const filteredData = rows.filter((row) =>
      Object.values(row).some(
        (value) =>
          value && (typeof value === 'object' ? (value.name | value.number | value._id) : value).toString().toLowerCase().includes(lowercasedKeyphrase)
      )
    );
    setFilteredRows(filteredData);
    setPage(0);
  }, [rows, keyphrase, setFilteredRows, setPage]);

  const handleUpdate = useCallback(() => {
    const record = rows.find((row) => selectedRows.includes(row._id))!;
    setIsEditMode(true);
    setNewRecord(record);
    setShowForm(true);
  }, [rows, selectedRows, setIsEditMode, setNewRecord, setShowForm]);

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = filteredRows.map((n) => n._id);
        setSelectedRows(newSelected);
        return;
      }
      setSelectedRows([]);
    },
    [filteredRows, setSelectedRows]
  );

  const handleRequestSort = useCallback(
    (property: InterfaceField) => {
      const isAsc = orderBy === property && orderType === 'asc';
      setOrderType(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
      setPage(0);
      setSelectedRows([]);
    },
    [orderBy, orderType]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<unknown>, id: string) => {
      const selectedIndex = selectedRows.indexOf(id);
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedRows, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedRows.slice(1));
      } else if (selectedIndex === selectedRows.length - 1) {
        newSelected = newSelected.concat(selectedRows.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedRows.slice(0, selectedIndex),
          selectedRows.slice(selectedIndex + 1)
        );
      }
      setSelectedRows(newSelected);
    },
    [selectedRows, setSelectedRows]
  );

  const handleDeleteSelected = useCallback(async () => {
    const response = await deleteData(entity, selectedRows, setSnackbar);
    if (response) {
      setRows(rows.filter((row) => !selectedRows.includes(row._id)));
      setFilteredRows(
        filteredRows.filter((row) => !selectedRows.includes(row._id))
      );
      setSelectedRows([]);
      setShowDialog(false);
      setSnackbar({
        isOpen: true,
        message: 'Registro(s) eliminado!',
        severity: 'success',
      });
    }
  }, [
    entity,
    filteredRows,
    selectedRows,
    rows,
    setFilteredRows,
    setRows,
    setSelectedRows,
    setShowDialog,
    setSnackbar,
  ]);

  const handleSave = useCallback(
    async (addMore: boolean = false) => {
      let response: Entity | undefined;
      if (isEditMode && newRecord) {
        response = await updateData(
          newRecord._id,
          entity,
          newRecord,
          setSnackbar
        );
      } else {
        response = await insertData(entity, newRecord, setSnackbar);
      }
      if (response) {
        setNewRecord(defaultData as Entity);
        if (!addMore) {
          await fetchRows();
          setSelectedRows([]);
          setKeyphrase('');
          setPage(0);
          setShowForm(false);
        }
        setIsEditMode(false);
        setSnackbar({
          isOpen: true,
          message: 'Registro guardado!',
          severity: 'success',
        });
      }
    },
    [
      entity,
      newRecord,
      rows,
      orderType,
      orderBy,
      isEditMode,
      newRecord,
      setIsEditMode,
      setKeyphrase,
      setPage,
      setSelectedRows,
      setShowForm,
      setSnackbar,
      fetchData,
    ]
  );

  const handleAddNewMore = useCallback(() => handleSave(true), [handleSave]);

  const visibleRows = useMemo(
    () =>
      stableSort(filteredRows, getComparator(orderType, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [orderType, orderBy, page, rowsPerPage, filteredRows]
  );

  return {
    filteredRows,
    keyphrase,
    page,
    rowsPerPage,
    rowsToDelete,
    selectedRows,
    showDialog,
    visibleRows,
    setPage,
    fetchRows,
    handleChangePage,
    handleChangeRowsPerPage,
    handleClick,
    handleAddNewMore,
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
  };
};
// // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = useMemo(
  //   () =>
  //     page > 0
  //       ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length)
  //       : 0,
  //   [filteredRows, page, rowsPerPage]
  // );