
import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Department = sequelize.define('Department', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    location: { type: DataTypes.STRING }
  }, { tableName: 'departments' });
  return Department;
};
