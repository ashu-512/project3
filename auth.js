
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models/index.js';
import { config } from '../config.js';

const router = Router();

router.post('/register',
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, password, role = 'Employee' } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const roleRow = await Role.findOne({ where: { name: role } });
    if (!roleRow) return res.status(400).json({ message: 'Role not found' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, roleId: roleRow.id });
    return res.status(201).json({ id: user.id, email: user.email });
  }
);

router.post('/login',
  body('email').isEmail(),
  body('password').isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: Role });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ sub: user.id, role: user.Role?.name }, config.jwtSecret, { expiresIn: '8h' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.Role?.name } });
  }
);

export default router;
