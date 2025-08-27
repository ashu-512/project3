
import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING },
    hireDate: { type: DataTypes.DATEONLY },
    status: { type: DataTypes.STRING, defaultValue: 'Active' },
    salary: { type: DataTypes.DECIMAL(10,2) },
    departmentId: { type: DataTypes.INTEGER },
    roleId: { type: DataTypes.INTEGER }
  }, { tableName: 'employees' });
  return Employee;
};
