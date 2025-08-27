
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config.js';
import { sequelize } from './db.js';
import { syncModels, Role } from './models/index.js';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import departmentRoutes from './routes/departments.js';
import attendanceRoutes from './routes/attendance.js';
import leaveRoutes from './routes/leaves.js';
import payrollRoutes from './routes/payroll.js';
import performanceRoutes from './routes/performance.js';
import { auth, requireRoles } from './middleware/auth.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Public
app.get('/', (_req, res) => res.json({ status: 'EMS API up' }));
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/employees', auth(), requireRoles('Admin','HR','Manager'), employeeRoutes);
app.use('/api/departments', auth(), requireRoles('Admin','HR'), departmentRoutes);
app.use('/api/attendance', auth(), attendanceRoutes); // self-service: anyone signed-in can view/post (ideally stricter)
app.use('/api/leaves', auth(), leaveRoutes);
app.use('/api/payroll', auth(), requireRoles('Admin','HR'), payrollRoutes);
app.use('/api/performance', auth(), requireRoles('Admin','HR','Manager'), performanceRoutes);

// Boot
(async () => {
  await sequelize.authenticate();
  await syncModels();
  // Seed default roles
  const roles = ['Admin','HR','Manager','Employee'];
  for (const r of roles) {
    await Role.findOrCreate({ where: { name: r }, defaults: { name: r } });
  }
  app.listen(config.port, () => console.log(`EMS API running on http://localhost:${config.port}`));
})();
