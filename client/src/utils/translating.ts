import { InterfaceField } from '../types/types';

export const translateField = (
  field: InterfaceField,
  value: string | number
) => {
  switch (field) {
    case 'sign':
      return value === 1 ? 'Ingreso' : 'Gasto';
    default:
      return value;
  }
};
