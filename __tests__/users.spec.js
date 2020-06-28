// "coverage": "nyc report --reporter=text-lcov | coveralls",
import supertest from 'supertest';
// import { response } from 'express';
import app from '../src/app';

const request = supertest(app);

// const demoUser = {
//   firstname: 'James',
//   lastname: 'Onyango',
//   username: 'onyi',
//   password: '$2b$10',
//   email: 'cjenyi@gmail.com',
//   gender: 'Male',
//   jobrole: 'Accountant',
//   department: 'Finance',
//   address: 'Migori',
// };
test('should log in a valid user', async () => {
  await request
    .get('/api/v1/login')
    .send({
      email: 'otieno@gmail.com',
      password: '1234',
    })
    .expect(201);
});

test('should not log in invalid user', async () => {
  await request
    .get('/api/v1/login')
    .send({
      email: 'nyash@com',
      password: '1235',
    })
    .expect(400);
});
