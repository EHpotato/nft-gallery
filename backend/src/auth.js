const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');

const secret = require('../sql/secret.json');

// exports.getPasswordHash = async () => {
//     const hash = await bcrypt.hash('password', 1);
//     const selectUser = await db.selectUserByEmail('bob@gmail.com');
//     if (!selectUser) {
//         const userInfo = {
//             name: "Bob",
//             email: "bob@gmail.com",
//             password: hash,
//         }
//         await db.createUser(userInfo);
//     }
// };

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await db.selectUserByEmail(email);
  const user =
    existingUser && bcrypt.compareSync(password, existingUser.password)
      ? existingUser
      : null;
  if (user) {
    const accessToken = jwt.sign(
      { email: user.email, id: user.id, name: user.name },
      secret.accessToken,
      { expiresIn: '60m', algorithm: 'HS256' }
    );
    res.json({
      name: user.name,
      accessToken: accessToken,
      url: user.url,
      email: user.email,
    });
  } else {
    res.status(401).send('Incorrect username or password');
  }
};
