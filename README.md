
# EMS Backend (Express + Sequelize + JWT)

## Quick start
```bash
cd ems-backend
cp .env.example .env
npm install
npm run dev
# API on http://localhost:4000
```
Create a user and login:
- POST `/api/auth/register` with `{ "name": "Admin", "email": "admin@ems.com", "password": "secret123", "role": "Admin" }`
- POST `/api/auth/login` to get a JWT.

Use the JWT as `Authorization: Bearer <token>` for protected endpoints.

SQLite database is stored at `./data/ems.sqlite` (auto-created).
Switch to Postgres/MySQL by setting env vars in `.env`.
