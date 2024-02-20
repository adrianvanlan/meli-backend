const express = require('express');
const { listItemsController } = require('../controllers/items.controller');
const { listItemsValidator } = require('../validations/items.validations');

const router = express.Router();

router.get('', listItemsValidator, listItemsController);

module.exports = router;
