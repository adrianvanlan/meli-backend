const axios = require('axios');
const variables = require('../common/variables');
const formatNumber = require('../common/formatNumber');

const getCategories = (filters) => {
  const categoryFilter = filters.find((filter) => filter.id === 'category');

  if (!categoryFilter) {
    return [];
  }

  const categories = categoryFilter.values[0].path_from_root;
  return categories.map((category) => category.name) || [];
};

const parseItems = (items, currencies) => {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping:
      item.shipping && item.shipping.free_shipping
        ? item.shipping.free_shipping
        : false,
    price: {
      currency:
        currencies.find((currency) => currency.id === item.currency_id)
          .symbol || '$',
      amount: formatNumber.extractInteger(item.price),
      decimals: formatNumber.extractDecimal(item.price),
    },
  }));
};

const getItems = async (
  query,
  currencies,
  limit = variables.MAX_RESULTS_LIST_ITEMS,
) => {
  return axios
    .get(
      `${variables.SERVICE_URL_BASE}/sites/MLA/search?q=${query}&limit=${limit}`,
    )
    .then((response) => {
      const { data } = response;
      const quantity = data.paging.total;

      if (!quantity || quantity === 0) {
        return null;
      }

      const filters = data.filters || [];
      const items = data.results || [];

      return {
        categories: getCategories(filters),
        items: parseItems(items, currencies),
      };
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getItems,
};
