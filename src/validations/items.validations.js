const { query } = require('express-validator');

const listItemsValidator = [
  query('q').not().isEmpty().withMessage('q is required'),
];

module.exports = {
  listItemsValidator,
};
