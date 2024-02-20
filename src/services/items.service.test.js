const axios = require('axios');
const itemsService = require('./items.service');

const MOCK_ITEMS = {
  paging: {
    total: 9229,
  },
  results: [
    {
      id: 'MLA1397418693',
      title: 'Apple iPhone SE Se',
      condition: 'new',
      category_id: 'MLA1055',
      thumbnail:
        'http://http2.mlstatic.com/D_696564-MLA52130732644_102022-I.jpg',
      currency_id: 'ARS',
      price: 633598.8,
      shipping: {},
    },
  ],
  filters: [
    {
      id: 'category',
      values: [
        {
          path_from_root: [
            {
              id: 'MLA1051',
              name: 'Celulares y Teléfonos',
            },
            {
              id: 'MLA1055',
              name: 'Celulares y Smartphones',
            },
          ],
        },
      ],
    },
  ],
};

const MOCK_CURRENCIES = [
  {
    id: 'ARS',
    symbol: '$',
  },
  {
    id: 'USD',
    symbol: 'U$S',
  },
];

jest.mock('axios');

describe('Items List Services', () => {
  it('getItems for list items must contain keys "items" & "categories"', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: MOCK_ITEMS }));
    const items = await itemsService.getItems('iphone', MOCK_CURRENCIES);

    expect(items.categories).toStrictEqual([
      'Celulares y Teléfonos',
      'Celulares y Smartphones',
    ]);
    expect(items.items).toStrictEqual([
      {
        id: MOCK_ITEMS.results[0].id,
        title: MOCK_ITEMS.results[0].title,
        picture: MOCK_ITEMS.results[0].thumbnail,
        condition: MOCK_ITEMS.results[0].condition,
        free_shipping: false,
        price: {
          currency: '$',
          amount: 633598,
          decimals: 80,
        },
      },
    ]);
  });

  it('getItems for list items must return an error', async () => {
    try {
      await itemsService.getItems('iphone', MOCK_CURRENCIES);
    } catch (error) {
      expect(error).toBe('error');
    }
  });
});
