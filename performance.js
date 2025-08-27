
import { Router } from 'express';
import { Performance } from '../models/index.js';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/:employeeId', async (req, res) => {
  const rows = await Performance.findAll({ where: { employeeId: req.params.employeeId }, order: [['reviewDate','DESC']] });
  res.json(rows);
});

router.post('/',
  body('employeeId').isInt(),
  body('rating').isInt({ min: 1, max: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const created = await Performance.create(req.body);
    res.status(201).json(created);
  }
);

export default router;
