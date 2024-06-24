const Sequelize = require('sequelize');
const Dept = require('./dept');
const Employee = require('./employee');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Dept = Dept;
db.Employee = Employee;

Dept.initiate(sequelize);
Employee.initiate(sequelize);

Dept.associate(db);
Employee.associate(db);

module.exports = db;
