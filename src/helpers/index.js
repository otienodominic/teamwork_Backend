import bcrypt from 'bcrypt';
// import { next } from 'sucrase/dist/parser/tokenizer';

// helper to hash password
const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

// Helper to compare password
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
export default { hashPassword, comparePassword };
