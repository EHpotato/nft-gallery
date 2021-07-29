const express = require('express');
const cors = require('cors');
const nft = require('./nft');
const auth = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Your routes go here
app.post('/auth', auth.authenticate);
app.get('/:address', nft.getNFT);


app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
