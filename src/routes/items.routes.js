const express = require('express');
const {
  listItemsController,
  getItemController,
} = require('../controllers/items.controller');
const {
  getItemValidator,
  listItemsValidator,
} = require('../validations/items.validations');

const router = express.Router();

router.get('/', listItemsValidator, listItemsController);
router.get('/:id', getItemValidator, getItemController);

module.exports = router;
