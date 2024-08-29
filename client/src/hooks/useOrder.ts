import { useState } from 'react';
import { InterfaceField, Order } from '../types/types';

export const useOrder = (field: InterfaceField) => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<InterfaceField>(field);
};