import { FC } from 'react';
import { IFormField } from '../interfaces/common';
import { TableEntity } from './TableEntity';

const DEFAULT_DATA = {
  _id: '',
  name: '',
  sign: -1,
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
    id: 'sign',
    label: 'Tipo',
    disablePadding: true,
    disableWrap: true,
    isNumeric: false,
    type: 'select',
    selectConfig: {
      options: [
        { key: 'Gasto', value: -1 },
        { key: 'Ingreso', value: 1 },
      ],
    },
  },
];

export const Category: FC = () => {
  return (
    <TableEntity
      defaultData={DEFAULT_DATA}
      entity="categories"
      entityName="Categorías"
      fields={fields}
    />
  );
};
