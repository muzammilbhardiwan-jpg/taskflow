const request = require('supertest');
const app = require('../app');

test('health endpoint returns ok', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});

test('can create a task', async () => {
  const res = await request(app).post('/api/tasks').send({ title: 'learn k8s' });
  expect(res.status).toBe(201);
  expect(res.body.title).toBe('learn k8s');
});

test('create task without title returns 400', async () => {
  const res = await request(app).post('/api/tasks').send({});
  expect(res.status).toBe(400);
});