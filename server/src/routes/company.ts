import { Router } from 'express';
import Company from '../models/Company';
import { requireAuth } from '../middleware/requireAuth';
import {
  deleteData,
  insertData,
  selectData,
  updateData,
} from '../controller/crud';

const router = Router();

router.get('/', requireAuth, (req, res) => selectData(res, Company));

router.post('/', requireAuth, (req, res) => insertData(res, Company, req.body));

router.delete('/', requireAuth, (req, res) =>
  deleteData(res, Company, req.body.ids)
);

router.put('/:id', requireAuth, (req, res) =>
  updateData(res, Company, req.params.id, req.body)
);

export default router;
