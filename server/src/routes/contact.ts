import { Router } from 'express';
import Contact from '../models/Contact';
import { requireAuth } from '../middleware/requireAuth';
import {
  deleteData,
  insertData,
  selectData,
  updateData,
} from '../controller/crud';

const router = Router();

router.get('/', requireAuth, (req, res) => selectData(res, Contact));

router.post('/', requireAuth, (req, res) => insertData(res, Contact, req.body));

router.delete('/', requireAuth, (req, res) =>
  deleteData(res, Contact, req.body.ids)
);

router.put('/:id', requireAuth, (req, res) =>
  updateData(res, Contact, req.params.id, req.body)
);

export default router;
