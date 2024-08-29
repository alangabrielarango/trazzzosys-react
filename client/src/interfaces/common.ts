import { InterfaceField } from '../types/types';
import { IContact, IUser } from './entities';

export interface ISnackbar {
  isOpen: boolean;
  message: string;
  severity: 'success' | 'error';
}

export interface IFormField {
  id: InterfaceField;
  label: string;
  isNumeric: boolean;
  type: 'checkbox' | 'textfield' | 'select';
  disablePadding?: boolean;
  disableWrap?: boolean;
  mergedIds?: Array<InterfaceField>;
  selectConfig?: {
    entity?: string;
    fields?: Array<string>;
    options?: Array<string> | Array<{ key: string; value: string | number }>;
  };
}
