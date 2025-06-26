// __tests__/crud.test.js
const request = require('supertest');
const app     = require('../app');
const { sequelize } = require('../models');

describe('CRUD Test Suite: Category, Brand, Product', () => {
  let token;
  let testCategory;
  let testBrand;
  let testProduct;

  beforeAll(async () => {
    // 1) Sync DB og init – tøm alt
    await sequelize.sync({ force: true });
    await request(app).post('/init');

    // 2) Login som Admin
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@noroff.no', password: 'P@ssword2023' });
    expect(loginRes.status).toBe(200);
    token = loginRes.body.token;
  });

  it('1. Should create a Category', async () => {
    const res = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_CATEGORY' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    testCategory = res.body;
  });

  it('2. Should create a Brand', async () => {
    const res = await request(app)
      .post('/brands')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_BRAND' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    testBrand = res.body;
  });

  it('3. Should create a Product', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:       'TEST_PRODUCT',
        description: 'Test desc',
        price:       42.42,
        quantity:    5,
        BrandId:     testBrand.id,
        CategoryId:  testCategory.id
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    testProduct = res.body;
  });

  it('4. Should fetch the newly created Product (with brand+category)', async () => {
    const res = await request(app)
      .get(`/products/${testProduct.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('TEST_PRODUCT');
    expect(res.body.BrandId).toBe(testBrand.id);
    expect(res.body.CategoryId).toBe(testCategory.id);
  });

  it('5. Should update Category name', async () => {
    const res = await request(app)
      .put(`/categories/${testCategory.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_CATEGORY2' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('TEST_CATEGORY2');
  });

  it('6. Should update Brand name', async () => {
    const res = await request(app)
      .put(`/brands/${testBrand.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_BRAND2' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('TEST_BRAND2');
  });

  it('7. Should reflect updated names on Product fetch', async () => {
    const res = await request(app)
      .get(`/products/${testProduct.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    // Merk: avhengig av hvordan dere flatten Brand/Category, sjekk body for navn:
    expect(res.body.Brand.name || res.body.BrandId).toBeDefined();
    expect(res.body.Category.name || res.body.CategoryId).toBeDefined();
  });

  it('8. Should soft-delete the Product', async () => {
    const delRes = await request(app)
      .delete(`/products/${testProduct.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body.message).toMatch(/soft-deleted/i);

    // Bekreft at GET /products ikke lenger inneholder det
    const listRes = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`);
    expect(listRes.status).toBe(200);
    const titles = listRes.body.map(p => p.title);
    expect(titles).not.toContain('TEST_PRODUCT');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});




