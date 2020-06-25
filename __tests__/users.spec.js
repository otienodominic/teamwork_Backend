// "coverage": "nyc report --reporter=text-lcov | coveralls",
import controllers from '../src/controllers';

const { createUser, signIn } = controllers.users;

test('should insert new user', () => {
  const user = {
    firstname: 'James',
    lastname: 'Onyango',
    username: 'onyi',
    password: '$2b$10',
    email: 'cjenyi@gmail.com',
    gender: 'Male',
    jobrole: 'Accountant',
    department: 'Finance',
    address: 'Migori',
  };
});
