const express = require('express');
const Dept = require('../models/dept');
const Employee = require('../models/employee');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const depts = await Dept.findAll();
      res.json(depts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const depts = await Dept.create({
        dept_no: req.body.dept_no,
        dept_name: req.body.dept_name,
        phone: req.body.phone,
        check: req.body.check,
      });
      console.log(depts);
      res.status(201).json(depts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.route('/:dept_no')
  .delete(async (req, res, next) => {
    try {
      const result = await Dept.destroy({ where: { dept_no: req.params.dept_no } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  
router.get('/:dept_no/employees', async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      include: {
        model: Dept,
        where: { dept_no: req.params.dept_no },
      },
    });
    console.log(employees);
    res.json(employees);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
