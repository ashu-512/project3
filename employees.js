
import { Router } from 'express';
import { Employee, Department, Role } from '../models/index.js';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/', async (req, res) => {
  const rows = await Employee.findAll({ include: [Department, Role] });
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const row = await Employee.findByPk(req.params.id, { include: [Department, Role] });
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.json(row);
});

router.post('/',
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const created = await Employee.create(req.body);
    res.status(201).json(created);
  }
);

router.put('/:id', async (req, res) => {
  const row = await Employee.findByPk(req.params.id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  await row.update(req.body);
  res.json(row);
});

router.delete('/:id', async (req, res) => {
  const row = await Employee.findByPk(req.params.id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  await row.destroy();
  res.json({ message: 'Deleted' });
});

export default router;
