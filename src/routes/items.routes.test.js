const request = require('supertest');
const app = require('../app');

describe('Items Endpoints', () => {
  it('should get item by id', async () => {
    const id = 'MLA901420817';
    const response = await request(app).get(`/api/items/${id}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('item');
  });

  it('should search items by query', async () => {
    const searchQuery = 'Iphone';
    const response = await request(app).get(`/api/items?q=${searchQuery}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('items');
    expect(response.body.items.length).toBeGreaterThanOrEqual(1);
  });

  it("shouldn't search items by query", async () => {
    const q = '';
    const response = await request(app).get(`/api/items?q=${q}`);
    expect(response.statusCode).toEqual(400);
  });
});
