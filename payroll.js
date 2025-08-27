
import { Router } from 'express';
import { Payroll } from '../models/index.js';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/', async (req, res) => {
  const rows = await Payroll.findAll();
  res.json(rows);
});

router.post('/',
  body('employeeId').isInt(),
  async (req, res) => {
    const { salary = 0, bonuses = 0, deductions = 0 } = req.body;
    const netSalary = Number(salary) + Number(bonuses) - Number(deductions);
    const payload = { ...req.body, netSalary };
    const created = await Payroll.create(payload);
    res.status(201).json(created);
  }
);

export default router;
