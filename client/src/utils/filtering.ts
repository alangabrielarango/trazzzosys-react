import { IFormField } from '../interfaces/common';
import { Entity, InterfaceField } from '../types/types';

export const getFilteredRowForSelect = (
  entity: string,
  field: InterfaceField,
  rows: Entity[],
  newRecord: Entity
) => {
  switch (entity) {
    case 'accounts':
      return field === 'contact' ? rows.filter((r) => r.isWorker) : rows;
    case 'subcategories':
      return field === 'category' ? rows.filter((r) => r.sign === newRecord.sign) : rows;
    default:
      return rows;
  }
};
