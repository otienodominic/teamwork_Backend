// @ts-nocheck
import pool from '../db';
import hashPassword from '../helpers/validations';
/**
 * Create A Admin
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
// eslint-disable-next-line consistent-return
const createAdmin = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    gender,
    jobRole,
    department,
    address,
    isAdmin,
  } = req.body;

  const hashedPassword = hashPassword(password);
  const createUserQuery = `INSERT INTO
      users(firstName, lastName, username, password, email, gender, jobRole, department, address, isAdmin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;

  const values = [
    firstName,
    lastName,
    username,
    hashedPassword,
    email,
    gender,
    jobRole,
    department,
    address,
    isAdmin,
  ];

  try {
    const { data } = await pool.query(createUserQuery, values);
    return res.status(200).send(data);
    // return res.rows;
  } catch (error) {
    console.log(error);
  }
};

export default createAdmin;
