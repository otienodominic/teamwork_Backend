import bcrypt from 'bcrypt';
/**
 * Hash the  password
 */

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export default { hashPassword, isValidEmail };
