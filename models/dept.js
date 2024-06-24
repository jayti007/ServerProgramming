const Sequelize = require('sequelize');

class Dept extends Sequelize.Model {
  static initiate(sequelize) {
    Dept.init({
      dept_no: {
        type: Sequelize.CHAR(4),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      dept_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      check: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Dept',
      tableName: 'depts',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Dept.hasMany(db.Employee, { foreignKey: 'dept_no', sourceKey: 'dept_no' });
  }
};

module.exports = Dept;