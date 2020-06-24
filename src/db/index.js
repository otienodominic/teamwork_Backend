import { Pool } from 'pg';
import config from '../config';

const connectionString = config.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

export default { pool };
