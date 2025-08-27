
import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Role = sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true } // Admin, HR, Manager, Employee
  }, { tableName: 'roles' });
  return Role;
};
