import { FC } from 'react';
import { IFormField } from '../interfaces/common';
import { TableEntity } from './TableEntity';

const DEFAULT_DATA = {
  _id: '',
  name: '',
  nit: '',
  fullName: '',
  phone1: '',
  phone2: '',
  phone3: '',
  email: '',
  webPage: '',
  tags: '',
  hasAccount: false,
  isClient: false,
  isProvider: false,
  isWorker: false,
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
  {
    id: 'phone1',
    label: 'Teléfonos',
    disablePadding: false,
    disableWrap: true,
    isNumeric: false,
    type: 'textfield',
    mergedIds: ['phone1', 'phone2', 'phone3'],
  },
  {
    id: 'email',
    label: 'Email',
    disablePadding: false,
    disableWrap: true,
    isNumeric: false,
    type: 'textfield',
  },
  {
    id: 'webPage',
    label: 'Sitio Web',
    disablePadding: false,
    disableWrap: true,
    isNumeric: false,
    type: 'textfield',
  },
  {
    id: 'tags',
    label: 'Tags',
    disablePadding: false,
    isNumeric: false,
    type: 'textfield',
  },
  {
    id: 'hasAccount',
    label: 'Lleva una cuenta?',
    disablePadding: false,
    isNumeric: false,
    type: 'checkbox',
  },
  {
    id: 'isClient',
    label: 'Es un cliente?',
    disablePadding: false,
    isNumeric: false,
    type: 'checkbox',
  },
  {
    id: 'isProvider',
    label: 'Provee productos?',
    disablePadding: false,
    isNumeric: false,
    type: 'checkbox',
  },
  {
    id: 'isWorker',
    label: 'Provee servicios o es un trabajador?',
    disablePadding: false,
    isNumeric: false,
    type: 'checkbox',
  },
];

export const Contact: FC = () => {
  return (
    <TableEntity
      defaultData={DEFAULT_DATA}
      entity="contacts"
      entityName="Contactos"
      fields={fields}
    />
  );
}
