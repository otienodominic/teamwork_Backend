import { Pool } from 'pg';
import config from '../config';
import helpers from '../helpers';

const { hashPassword, comparePassword, isValidEmail, generateToken } = helpers;

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
  } = req.body;
  const hashedPassword = await hashPassword(password);
  // const userExists = await hashPassword.userExists(email);
  const validEmail = await isValidEmail(email.trim());
  // const userAlreadyExists = await userExists(email.trim());
  const checkFields =
    firstname &&
    lastname &&
    username &&
    email &&
    password &&
    gender &&
    jobrole &&
    department &&
    address;

  if (validEmail !== email.trim()) {
    res.status(400).json({
      status: 'error',
      Error: 'Please provide a valid email',
    });
  } else if (!checkFields) {
    res.status(400).json({
      status: 'error',
      Error: 'All fields are required',
    });
  } else {
    const insertUserQuery = `INSERT INTO users (firstName, lastName, username, hashedpassword, email, gender, jobrole, department, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [
      firstname,
      lastname,
      username,
      hashedPassword,
      validEmail,
      gender,
      jobrole,
      department,
      address,
    ];
    await pool.query(insertUserQuery, values);
    try {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'User created successfully',
          firstName: `${firstname}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

// User can sign in

async function signIn(req, res) {
  const { email, password } = req.body;
  const checkField = email && password;
  if (!checkField) {
    res.status(400).json({
      status: 'error',
      Error: 'Email or password cannot be blank!',
    });
  } else {
    try {
      const cleanEmail = [email.trim()];
      const findUser = `SELECT * FROM users where email = $1`;
      const user = await pool.query(findUser, cleanEmail);
      if (user.rowCount < 1) {
        res.status(400).json({
          status: 'error',
          Error:
            'User not found make sure to enter correct email and password!',
        });
      } else {
        // const comparePass = comparePassword(password, user.fields.values())
        const User = user.rows[0];
        const comparePass = await comparePassword(
          password,
          User.hashedpassword,
        );
        if (comparePass === false) {
          res.status(400).json({
            status: 'error',
            Error: 'Incorrect Password!',
          });
        } else {
          // const role = isAdmin ? 'Admin' : 'Employee';
          const tokenValue = generateToken(User);
          res.status(201).json({
            status: 'success',
            data: {
              token: tokenValue,
              user: User.id,
              role: User.jobrole,
            },
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

// Get all users

export default {
  createUser,
  signIn,
};
