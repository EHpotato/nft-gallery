const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// TODO: IMPLEMENT USERS and USER AUTHENTICATION
// exports.createUser = async (userinfo) => {
//   const insert = `INSERT INTO users (userinfo) VALUES($1)`;
//   const query = {
//     text: insert,
//     params: [userinfo],
//   };
//   const { rowCount } = await pool.query(query);
//   return rowCount > 0;
// };

// exports.selectUserByEmail = async (email) => {
//   const select = `SELECT userid, userinfo FROM users where userinfo->>'email' ~* $1`;
//   const query = {
//     text: select,
//     values: [email],
//   };
//   const { rows } = await pool.query(query);

//   return rows.length > 0 ? { id: rows[0].userid, ...rows[0].userinfo } : null;
// };

exports.getTokenByID = async (address, tokenID) => {
  const select = `SELECT tokenURI FROM contracts WHERE address = $1 
        AND tokenID = $2`;
  const query = {
    text: select,
    values: [address, tokenID],
  };
  const { rows } = await pool.query(query);
  return rows.length > 0 ? rows[0].tokenuri.data : null;
};

exports.getByIndex = async (address, index) => {
  const select = `SELECT * FROM contracts WHERE address = $1
  AND tokenIndex = $2`;
  const query = {
    text: select,
    values: [address, index],
  };
  const { rows } = await pool.query(query);
  return rows.length > 0 ? rows[0] : null;
};
exports.insertByTokenID = async (address, tokenID, data) => {
  const table = {
    tokenID: tokenID,
    data: data,
  };
  const insert = `INSERT INTO contracts(address, tokenID, tokenURI) 
    VALUES($1, $2, $3)
    ON CONFLICT (address, tokenID) DO NOTHING;`;
  const query = {
    text: insert,
    values: [address, tokenID, table],
  };
  await pool.query(query);
};

exports.insertToken = async (address, tokenID, index, data) => {
  const table = {
    tokenID: tokenID,
    data: data,
  };
  const update = `INSERT INTO contracts(address, tokenID, tokenIndex, tokenURI) 
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (address, tokenID) DO UPDATE 
    SET tokenIndex = excluded.tokenIndex;`;
  const query = {
    text: update,
    values: [address, tokenID, index, table],
  };
  await pool.query(query);
};

exports.updateIndex = async (address, tokenID, index) => {
  const update = `UPDATE contracts
    SET tokenIndex = $1
    WHERE address = $2 AND tokenID = $3`;
  const query = {
    text: update,
    values: [index, address, tokenID],
  };
  await pool.query(query);
};
