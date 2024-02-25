const formatNumber = require('../common/formatNumber');

const getCategories = (filters) => {
  const categoryFilter = filters.find((filter) => filter.id === 'category');

  if (!categoryFilter) {
    return [];
  }

  const categories = categoryFilter.values[0].path_from_root;
  return categories.map((category) => category.name) || [];
};

const parseItem = (item) => {
  const picture =
    item.pictures && item.pictures.length > 0
      ? item.pictures[0].secure_url
      : item.thumbnail || '';

  return {
    id: item.id,
    title: item.title,
    condition: item.condition,
    free_shipping:
      item.shipping && item.shipping.free_shipping
        ? item.shipping.free_shipping
        : false,
    price: {
      currency: item.currency_id,
      amount: formatNumber.extractInteger(item.price),
      decimals: formatNumber.extractDecimal(item.price),
    },
    sold_quantity: item.sold_quantity || 0,
    picture,
  };
};

const parseItems = (items) => {
  return items.map((item) => parseItem(item));
};

module.exports = {
  parseItem,
  parseItems,
  getCategories,
};
