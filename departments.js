
import { Router } from 'express';
import { Department } from '../models/index.js';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await Department.findAll();
  res.json(rows);
});

router.post('/',
  body('name').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const created = await Department.create(req.body);
    res.status(201).json(created);
  }
);

export default router;
