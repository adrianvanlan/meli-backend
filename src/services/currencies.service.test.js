const axios = require('axios');
const currenciesService = require('../services/currencies.service');

const MOCK_CURRENCIES = [
  {
    id: 'ARS',
    symbol: '$',
    description: 'Peso argentino',
    decimal_places: 2,
  },
  {
    id: 'USD',
    symbol: 'U$S',
    description: 'Dólar',
    decimal_places: 2,
  },
];

jest.mock('axios');

describe('Get currencies', () => {
  it('should return currencies', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: MOCK_CURRENCIES }),
    );

    const currencies = await currenciesService.getCurrencies();

    expect(currencies).toStrictEqual([
      {
        id: 'ARS',
        symbol: '$',
      },
      {
        id: 'USD',
        symbol: 'U$S',
      },
    ]);
  });

  it('should return an error', async () => {
    axios.get.mockImplementation(() => Promise.reject({ message: 'error' }));
    try {
      await currenciesService.getCurrencies();
    } catch (error) {
      expect(error.message).toBe('error');
    }
  });
});
