import pg from "pg";
const { Pool } = pg;

import dotenv from 'dotenv';

dotenv.config();
console.log("dss",process.env.DATABASE_URL);
  
const pool = new Pool({
  
  connectionString: process.env.DATABASE_URL,
});

export default pool;
// Try `npm i --save-dev @types/pg` if it exists or add a new declaration (.d.ts) file containing `declare module 'pg';`ts(7016)
