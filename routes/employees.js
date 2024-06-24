const express = require('express');
const { Employee } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const employee = await Employee.create({
      // p_no: ,
      name: req.body.name,
      salary: req.body.salary,
      dept_no: req.body.dept_no,
    });
    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:p_no')
  .patch(async (req, res, next) => {
    try {
      const result = await Employee.update({
        name: req.body.name,
      }, {
        where: { p_no: req.params.p_no },
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Employee.destroy({ where: { p_no: req.params.p_no } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
