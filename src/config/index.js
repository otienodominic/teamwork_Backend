import dotenv from 'dotenv';
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
dotenv.config();

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  port: process.env.PORT,
  secret: process.env.SECRET,
};
