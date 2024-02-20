const variables = require('../common/variables');
const axios = require('axios');

// TODO: Add cache to this request
const getCurrencies = async () => {
  return axios
    .get(`${variables.SERVICE_URL_BASE}/currencies`)
    .then((response) => {
      const { data } = response;
      return data.map((currency) => {
        return {
          id: currency.id,
          symbol: currency.symbol,
        };
      });
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getCurrencies,
};
