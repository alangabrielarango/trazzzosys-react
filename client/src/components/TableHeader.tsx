import { FC, useCallback } from 'react';
import { InterfaceField, Order } from '../types/types';
import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { IFormField } from '../interfaces/common';

interface TableHeaderProps {
  fields: Array<IFormField>;
  numSelected: number;
  order: Order;
  orderBy: string;
  rowCount: number;
  handleRequestSort: (property: InterfaceField) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TableHeader: FC<TableHeaderProps> = ({
  fields,
  order,
  orderBy,
  numSelected,
  rowCount,
  handleSelectAllClick,
  handleRequestSort,
}) => {
  return (
    <TableHead
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: '#105189',
        color: '#FFFFFF',
      }}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {fields.map((field) => (
          <TableCell
            key={field.id}
            align={field.isNumeric ? 'right' : 'left'}
            padding={field.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === field.id ? order : false}
            sx={{ color: 'white', whiteSpace: 'nowrap' }}
          >
            <TableSortLabel
              active={orderBy === field.id}
              direction={orderBy === field.id ? order : 'asc'}
              onClick={() => handleRequestSort(field.id)}
              sx={{
                '&.MuiTableSortLabel-root': {
                  color: 'white',
                },
                '&.MuiTableSortLabel-root.Mui-active': {
                  color: 'white',
                },
                '& .MuiTableSortLabel-icon': {
                  color: 'inherit !important',
                },
              }}
            >
              {field.label}
              {orderBy === field.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
