
import { Sequelize } from 'sequelize';
import { config } from './config.js';

const { dialect, storage, host, port, database, username, password } = config.db;

export const sequelize = new Sequelize(database || 'ems', username || 'user', password || '', {
  host,
  port,
  dialect,
  storage,
  logging: false
});
