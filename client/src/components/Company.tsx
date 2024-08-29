import { FC } from 'react';
import { IFormField } from '../interfaces/common';
import { TableEntity } from './TableEntity';

const DEFAULT_DATA = {
  _id: '',
  name: '',
  nit: '',
  fullName: '',
};

const fields: IFormField[] = [
  {
    id: 'name',
    label: 'Nombre',
    disablePadding: true,
    isNumeric: false,
    type: 'textfield',
  },
  {
    id: 'nit',
    label: 'NIT',
    disablePadding: true,
    disableWrap: true,
    isNumeric: false,
    type: 'textfield',
  },
  {
    id: 'fullName',
    label: 'Razón Social',
    disablePadding: false,
    isNumeric: false,
    type: 'textfield',
  },
];

export const Company: FC = () => {
  return (
    <TableEntity
      defaultData={DEFAULT_DATA}
      entity="companies"
      entityName="Empresas"
      fields={fields}
    />
  );
}
