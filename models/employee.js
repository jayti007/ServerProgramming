const Sequelize = require('sequelize');

class Employee extends Sequelize.Model {
  static initiate(sequelize) {
    Employee.init({
      p_no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dept_no: {
        type: Sequelize.CHAR(4),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Employee',
      tableName: 'employees',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });

    return this;
  }

  static associate(db) {
    db.Employee.belongsTo(db.Dept, { foreignKey: 'dept_no', targetKey: 'dept_no', onDelete: 'CASCADE' });
  }
}

module.exports = Employee;