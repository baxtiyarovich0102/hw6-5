import pg from "pg";
import env from "dotenv";
env.config();

let pool = new pg.Pool({
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
});

export default pool;
