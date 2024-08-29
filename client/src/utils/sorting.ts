import { Entity, InterfaceField, Order } from '../types/types';

export const stableSort = <T extends Entity>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const getComparator = (
  order: Order,
  orderBy: InterfaceField,
): ((
  a: Entity,
  b: Entity,
) => number) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

export const getObjectValue = (
  value: any,
) => {
  if (typeof value === 'object') {
    return value.name || value.number || value._id;
  }
  return value;
}

export const descendingComparator = (a: Entity, b: Entity, orderBy: InterfaceField) => {
  const aValue =
    a[orderBy as keyof Entity] !== undefined && a[orderBy as keyof Entity] !== null ? getObjectValue(a[orderBy as keyof Entity]) : false;
  const bValue =
    b[orderBy as keyof Entity] !== undefined && b[orderBy as keyof Entity] !== null ? getObjectValue(b[orderBy as keyof Entity]) : false;

  if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
    return bValue === aValue ? 0 : bValue ? 1 : -1;
  }
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
};
