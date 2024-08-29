import { FC } from 'react';
import { IFormField } from '../interfaces/common';
import { TableEntity } from './TableEntity';

const DEFAULT_DATA = {
  _id: '',
  name: '',
  type: '',
  bank: '',
  number: '',
  contact: {
    _id: '',
    name: '',
  },
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
    id: 'type',
    label: 'Tipo',
    disablePadding: false,
    disableWrap: false,
    isNumeric: false,
    type: 'select',
    selectConfig: {
      options: [
        'Monetaria',
        'Ahorro',
        'Efectivo',
        'Tarjeta Crédito',
        'Extrafinanciamiento',
        'Prestamo',
        'Dólares Monetaria',
        'Dólares Ahorro',
        'Dólares Efectivo',
        'Euros Monetaria',
        'Euros Ahorro',
        'Euros Efectivo',
      ],
    },
  },
  {
    id: 'bank',
    label: 'Banco',
    disablePadding: false,
    isNumeric: false,
    type: 'select',
    selectConfig: {
      options: [
        'Efectivo',
        'Banco Agromercantil',
        'Banrural',
        'Banco Industrial',
        'G&T Continental',
        'Crédito Hipotecario Nacional',
        'BAC Credomatic',
      ],
    },
  },
  {
    id: 'number',
    label: 'Número',
    disablePadding: false,
    isNumeric: false,
    type: 'textfield',
  },
  {
    id: 'contact',
    label: 'Trabajador',
    disablePadding: false,
    isNumeric: false,
    type: 'select',
    selectConfig: {
      entity: 'contacts',
      fields: ['name', 'nit'],
    }
  },
];

export const Account: FC = () => {
  return (
    <TableEntity
      defaultData={DEFAULT_DATA}
      entity="accounts"
      entityName="Cuentas"
      fields={fields}
    />
  );
};
