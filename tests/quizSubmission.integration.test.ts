import request from 'supertest';
import { app, initMiddlewares } from '../src/app';
import { initializeDatabase, closeDatabase } from './setup';

describe(`Quiz Submission API's`, () => {
  beforeAll(async () => {
    await initMiddlewares();
    await initializeDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('POST /quiz - submit answer', async () => {
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

    const res = await request(app)
      .post('/api/quiz-submission/submit')
      .send(submitQuizQuestionAnswer)
      .expect(200);

    expect(res.body.data).toHaveProperty('message');
  });
});
