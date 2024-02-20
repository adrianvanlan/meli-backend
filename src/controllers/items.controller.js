const itemsService = require('../services/items.service');
const variables = require('../common/variables');
const currenciesService = require('../services/currencies.service');
const { validationResult } = require('express-validator');

const listItemsController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { q } = req.query;

  const currencies = await currenciesService.getCurrencies();

  await itemsService
    .getItems(q, currencies)
    .then((data) => {
      res.status(200).json({
        author: variables.AUTHOR,
        ...data,
      });
    })
    .catch(() => res.status(500).json({ message: 'Internal Server Error' }));
};

module.exports = {
  listItemsController,
};
