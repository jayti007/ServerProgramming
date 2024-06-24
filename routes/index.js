const express = require('express');
const Dept = require('../models/dept');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const depts = await Dept.findAll();
    res.render('sequelize', { depts });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
