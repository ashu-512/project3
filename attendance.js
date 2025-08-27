
import { Router } from 'express';
import { Attendance } from '../models/index.js';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/:employeeId', async (req, res) => {
  const rows = await Attendance.findAll({ where: { employeeId: req.params.employeeId }, order: [['date','DESC']] });
  res.json(rows);
});

router.post('/',
  body('employeeId').isInt(),
  body('date').isISO8601(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const created = await Attendance.create(req.body);
    res.status(201).json(created);
  }
);

export default router;
