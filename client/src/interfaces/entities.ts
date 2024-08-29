export interface IContact {
  _id: string;
  name: string;
  nit: string;
  fullName: string;
  phone1: string;
  phone2: string;
  phone3: string;
  email: string;
  webPage: string;
  tags: string;
  hasAccount: boolean;
  isClient: boolean;
  isProvider: boolean;
  isWorker: boolean;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
}

export interface ICompany {
  _id: string;
  name: string;
  nit: string;
  fullName: string;
}

export interface IAccount {
  _id: string;
  name: string;
  type: string;
  bank: string;
  number: string;
  contact: Partial<IContact>;
}

export interface ICategory {
  _id: string;
  name: string;
  sign: number;
}

export interface ISubcategory {
  _id: string;
  name: string;
  sign: number;
  category: ICategory;
}
