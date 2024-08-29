import axios from 'axios';
import { Entity } from '../types/types';
import { ISnackbar } from '../interfaces/common';

const getApi = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined in the environment variables.');
  }
  return apiUrl;
};

export const fetchData = async (
  entity: string,
  setSnackbar: (snackbar: ISnackbar) => void,
  redirectToLogin: () => void
): Promise<Entity[] | undefined> => {
  try {
    const response = await axios.get<Entity[]>(`${getApi()}/api/${entity}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (err: any) {
    setSnackbar({
      isOpen: true,
      message: `Error al consultar registro(s): ${err}`,
      severity: 'error',
    });
    if (err?.response?.status === 401) {
      redirectToLogin();
    }
    return undefined;
  }
};

export const deleteData = async (
  entity: string,
  selectedRows: readonly string[],
  setSnackbar: (snackbar: ISnackbar) => void
): Promise<any> => {
  try {
    return await axios.delete(`${getApi()}/api/${entity}`, {
      data: { ids: selectedRows },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  } catch (err) {
    console.error(err);
    setSnackbar({
      isOpen: true,
      message: `Error al eliminar registro(s): ${selectedRows}`,
      severity: 'error',
    });
    return undefined;
  }
};

export const insertData = async (
  entity: string,
  record: Entity,
  setSnackbar: (snackbar: ISnackbar) => void
): Promise<Entity | undefined> => {
  try {
    const response = await axios.post(`${getApi()}/api/${entity}`, record, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    setSnackbar({
      isOpen: true,
      message: `Error al guardar registro: ${err}`,
      severity: 'error',
    });
    return undefined;
  }
};

export const updateData = async (
  id: string,
  entity: string,
  record: Entity,
  setSnackbar: (snackbar: ISnackbar) => void
): Promise<Entity | undefined> => {
  try {
    const response = await axios.put(
      `${getApi()}/api/${entity}/${id}`,
      record,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    setSnackbar({
      isOpen: true,
      message: `Error al guardar registro: ${err}`,
      severity: 'error',
    });
    return undefined;
  }
};
