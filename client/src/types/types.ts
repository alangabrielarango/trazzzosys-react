import {
  IAccount,
  ICategory,
  ICompany,
  IContact,
  ISubcategory,
  IUser,
} from '../interfaces/entities';

export type Order = 'asc' | 'desc';
export type InterfaceField =
  | keyof IContact
  | keyof IUser
  | keyof ICompany
  | keyof IAccount
  | keyof ICategory
  | keyof ISubcategory;
export type Entity = Record<InterfaceField, any>;
export type DefaultData =
  | IContact
  | IUser
  | ICompany
  | IAccount
  | ICategory
  | ISubcategory;
