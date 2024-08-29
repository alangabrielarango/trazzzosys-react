import { Router } from 'express';
import Category from '../models/Category';
import { requireAuth } from '../middleware/requireAuth';
import {
  deleteData,
  insertData,
  selectData,
  updateData,
} from '../controller/crud';

const router = Router();

router.get('/', requireAuth, (req, res) => selectData(res, Category));

router.post('/', requireAuth, (req, res) => insertData(res, Category, req.body));

router.delete('/', requireAuth, (req, res) =>
  deleteData(res, Category, req.body.ids)
);

router.put('/:id', requireAuth, (req, res) =>
  updateData(res, Category, req.params.id, req.body)
);

export default router;
