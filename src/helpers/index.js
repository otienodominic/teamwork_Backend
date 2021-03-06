// import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

const { secret } = config;

// helper to hash password
const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

// Helper to compare password
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const isValidEmail = (email) => {
  const testEmail = /\S+@\S+\.\S+/.test(email);
  if (!testEmail) {
    return 'Invalid Email';
  }
  return email;
};

const generateToken = (User) => {
  const token = jwt.sign(User, secret, { expiresIn: '7d' });
  return token;
};

export default { hashPassword, comparePassword, isValidEmail, generateToken };
