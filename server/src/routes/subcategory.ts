import { Router } from 'express';
import Subcategory from '../models/Subcategory';
import { requireAuth } from '../middleware/requireAuth';
import {
  deleteData,
  insertData,
  selectData,
  updateData,
} from '../controller/crud';

const router = Router();

router.get('/', requireAuth, (req, res) =>
  selectData(res, Subcategory, [{ path: 'category', select: 'name' }])
);

router.post('/', requireAuth, (req, res) =>
  insertData(res, Subcategory, req.body)
);

router.delete('/', requireAuth, (req, res) =>
  deleteData(res, Subcategory, req.body.ids)
);

router.put('/:id', requireAuth, (req, res) =>
  updateData(res, Subcategory, req.params.id, req.body)
);

export default router;
