import createAdmin from '../controllers/admin';
// import hashPassword from '../helpers/validations';

describe('Create and Admin', () => {
  const newAdmin = {
    firstName: 'Thomas',
    lastName: 'Ngalo',
    username: 'cjenyi',
    password: '123465',
    email: 'cjenyi@gmail.com',
    gender: 'Male',
    jobRole: 'Accountant',
    department: 'Finance',
    address: 'Migori',
    isAdmin: true,
  };

  it('should create an Admin user', () => {
    // @ts-ignore
    expect(createAdmin(newAdmin)).toBeTruthy();
  });
});
