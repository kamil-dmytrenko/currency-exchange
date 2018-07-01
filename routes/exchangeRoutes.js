const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const controller = require("../controllers/exchangeController");
const validation = require('../spec/validation/validator');

router.route('/:from/:amount/:to',validate(validation.create))
  .post(controller.createOne);

router.route('/')
  .get(controller.getAll);

router.route('/:exchangeId')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;