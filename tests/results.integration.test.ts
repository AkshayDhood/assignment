import request from 'supertest';
import { app, initMiddlewares } from '../src/app';
import { initializeDatabase, closeDatabase } from './setup';

describe(`Results API's`, () => {
  beforeAll(async () => {
    await initMiddlewares();
    await initializeDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('GET /results/:userId - get a user result', async () => {
    const createQuizPayload = {
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

    const quizBody = (await request(app).post('/api/quiz').send(createQuizPayload)).body;
    const userBody = (await request(app).post('/api/users').send({ name: 'John Doe' })).body;

    const submitQuizQuestionAnswer = {
      userId: userBody.data.id,
      quizId: quizBody.data.id,
      questionId: quizBody.data.questions[0].id,
      optionId: quizBody.data.questions[0].options[0].id,
    };

    await request(app).post('/api/quiz-submission/submit').send(submitQuizQuestionAnswer);

    const res = await request(app)
      .get(`/api/results/${userBody.data.id}/${quizBody.data.id}`)
      .expect(200);

    expect(res.body.data).toHaveProperty('id');
  });
});
