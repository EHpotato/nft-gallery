const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.createUser = async (userinfo) => {
  const insert = `INSERT INTO users (userinfo) VALUES($1)`;
  const query = {
    text: insert,
    params: [userinfo],
  };
  const { rowCount } = await pool.query(query);
  return rowCount > 0;
};

exports.selectUserByEmail = async (email) => {
  const select = `SELECT userid, userinfo FROM users where userinfo->>'email' ~* $1`;
  const query = {
    text: select,
    values: [email],
  };
  const { rows } = await pool.query(query);

  return rows.length > 0 ? { id: rows[0].userid, ...rows[0].userinfo } : null;
};
