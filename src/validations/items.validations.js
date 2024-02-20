const { query, param } = require('express-validator');

const getItemValidator = [
  param('id').not().isEmpty().withMessage('id is required'),
];

const listItemsValidator = [
  query('q').not().isEmpty().withMessage('q is required'),
];

module.exports = {
  getItemValidator,
  listItemsValidator,
};
