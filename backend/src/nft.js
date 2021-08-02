const { getTokenURI } = require('./middleware/web3');
const db = require('./db');
exports.getNFT = async (req, res) => {
  const address = req.params.address;
  let { provider, tokenID } = req.body;
  const data = await db.getTokenByContract(address, tokenID);
  if (data) {
    console.log('asda');
    return res.status(200).send({
      status: 200,
      data: data,
    });
  }
  provider = provider ? provider : 'https://cloudflare-eth.com';
  if (tokenID < 0) {
    return res.status(400).send({
      status: 400,
      message: 'Error: negative tokenID',
    });
  }
  return await getTokenURI({ address, tokenID, provider })
    .then((response) => {
      db.insertToken(address, tokenID, response.data);
      return res.status(response.status).send({
        status: response.status,
        data: response.data,
      });
    })
    .catch((err) => {
      return res.status(err.status | 400).send({
        status: err.status | 400,
        message: err.message,
      });
    });
};
