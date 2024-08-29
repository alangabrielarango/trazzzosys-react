import { FC } from 'react';
import { IFormField } from '../interfaces/common';
import { TableEntity } from './TableEntity';

const DEFAULT_DATA = {
  _id: '',
  username: '',
  password: '',
};

const fields: IFormField[] = [
  {
    id: 'username',
    label: 'Usuario',
    disablePadding: true,
    isNumeric: false,
    type: 'textfield',
  },
  {
    id: 'password',
    label: 'Password',
    disablePadding: true,
    disableWrap: true,
    isNumeric: false,
    type: 'textfield',
  },
];

export const User: FC = () => {
  return (
    <TableEntity
      defaultData={DEFAULT_DATA}
      entity="users"
      entityName="Usuario"
      fields={fields}
    />
  );
}
