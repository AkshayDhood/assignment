import request from 'supertest';
import { app, initMiddlewares } from '../src/app';
import { initializeDatabase, closeDatabase } from './setup';

describe(`User API's`, () => {
  beforeAll(async () => {
    await initMiddlewares();
    await initializeDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('POST /users - creates a user', async () => {
    const payload = { name: 'John Done' };

    const res = await request(app).post('/api/users').send(payload).expect(201);
    expect(res.body.data).toHaveProperty('id');
  });
});
