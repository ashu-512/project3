
import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Leave = sequelize.define('Leave', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employeeId: { type: DataTypes.INTEGER, allowNull: false },
    leaveType: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATEONLY, allowNull: false },
    endDate: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' },
    reason: { type: DataTypes.TEXT }
  }, { tableName: 'leaves' });
  return Leave;
};
