const axios = require('axios');
const variables = require('../common/variables');
const {
  parseItem,
  parseItems,
  getCategories,
} = require('./items.service.utils');

const getItems = async (query, limit = variables.MAX_RESULTS_LIST_ITEMS) => {
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
        items: parseItems(items),
      };
    })
    .catch((error) => {
      throw error;
    });
};

const getItem = async (id) => {
  return axios
    .get(`${variables.SERVICE_URL_BASE}/items/${id}`)
    .then(async (response) => {
      const item = parseItem(response.data);
      const description = await getItemDescription(id);
      const categories = await getItemCategories(response.data.category_id);

      return {
        item: {
          ...item,
          description,
          categories,
        },
      };
    })
    .catch((error) => {
      throw error;
    });
};

const getItemDescription = async (id) => {
  return axios
    .get(`${variables.SERVICE_URL_BASE}/items/${id}/description`)
    .then((response) => {
      return response.data.plain_text || '';
    })
    .catch((error) => {
      throw error;
    });
};

const getItemCategories = async (id) => {
  return axios
    .get(`${variables.SERVICE_URL_BASE}/categories/${id}`)
    .then((response) => {
      if (!response.data.path_from_root) {
        return [];
      }
      return response.data.path_from_root.map((category) => category.name);
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getItem,
  getItemDescription,
  getItems,
};
