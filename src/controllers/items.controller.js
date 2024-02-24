const itemsService = require('../services/items.service');
const variables = require('../common/variables');
const { validationResult } = require('express-validator');

const listItemsController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { q } = req.query;

  await itemsService
    .getItems(q)
    .then((data) => {
      res.status(200).json({
        author: variables.AUTHOR,
        ...data,
      });
    })
    .catch(() =>
      res.status(500).json({ message: 'Error trying to get items' }),
    );
};

const getItemController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  const { id } = req.params;

  await itemsService
    .getItem(id)
    .then((data) => {
      res.status(200).json({
        author: variables.AUTHOR,
        ...data,
      });
    })
    .catch(() =>
      res.status(500).json({ message: 'Error trying to get a item' }),
    );
};

module.exports = {
  getItemController,
  listItemsController,
};
