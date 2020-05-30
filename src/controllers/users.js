import { Pool } from 'pg';
import config from '../config';
import hashPassword from '../helpers';

// create a database connection from environment variables
const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

// Admin can create a user

async function createUser(req, res) {
  const {
    firstname,
    lastname,
    username,
    password,
    email,
    gender,
    jobrole,
    department,
    address,
    isadmin,
  } = req.body;
  const hashedPassword = hashPassword.hashPassword(password);
  const insertUserQuery = `INSERT INTO users (firstName, lastName, username, password, email, gender, jobrole, department, address, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
  const values = [
    firstname,
    lastname,
    username,
    hashedPassword,
    email,
    gender,
    jobrole,
    department,
    address,
    isadmin,
  ];
  await pool.query(insertUserQuery, values);
  try {
    res.status(201).send(`User added with first_name: ${firstname}`);
  } catch (err) {
    console.log(err);
  }
}

export default {
  createUser,
};
