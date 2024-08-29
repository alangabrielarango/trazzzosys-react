import { Router } from 'express';
import Account from '../models/Account';
import { requireAuth } from '../middleware/requireAuth';
import {
  deleteData,
  insertData,
  selectData,
  updateData,
} from '../controller/crud';

const router = Router();

router.get('/', requireAuth, (req, res) =>
  selectData(res, Account, [{ path: 'contact', select: 'name' }])
);

router.post('/', requireAuth, (req, res) => insertData(res, Account, req.body));

router.delete('/', requireAuth, (req, res) =>
  deleteData(res, Account, req.body.ids)
);

router.put('/:id', requireAuth, (req, res) =>
  updateData(res, Account, req.params.id, req.body)
);

export default router;
