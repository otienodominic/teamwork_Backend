import { Pool } from 'pg';

const connectionString =
  'postgres://hrvjyfvc:Mb6j-y0zWFPEhSxHUsWuIVfBaa4S13s0@rogue.db.elephantsql.com:5432/hrvjyfvc';
const pool = new Pool({ connectionString });

export default pool;
