import request from 'supertest';
import { app, initMiddlewares } from '../src/app';
import { initializeDatabase, closeDatabase } from './setup';

describe(`Quiz API's`, () => {
  beforeAll(async () => {
    await initMiddlewares();
    await initializeDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('POST /quiz - creates a quiz', async () => {
    const payload = {
      title: 'Test Quiz',
      questions: [
        {
          text: 'Test Question',
          options: Array(4)
            .fill(0)
            .map((_, index) => ({ option: `Option ${index + 1}`, correctOption: true })),
        },
      ],
    };

    const res = await request(app).post('/api/quiz').send(payload).expect(201);
    expect(res.body.data).toHaveProperty('id');
  });

  it('GET /quiz/:id - get a quiz', async () => {
    const res = await request(app).get(`/api/quiz/1`).expect(200);
    expect(res.body.data).toHaveProperty('id');
  });
});
