const { getTokenURI, batchFeed } = require('./middleware/web3');
exports.getNFT = async (req, res) => {
  const address = req.params.address;
  let { provider, tokenID } = req.query;
  provider = provider ? provider : 'https://cloudflare-eth.com';
  if (!tokenID || tokenID < 0) {
    return res.status(400).send({
      status: 'rejected',
      raeson: 'Error: invalid/missing tokenID',
    });
  }
  return await getTokenURI({ address, tokenID, provider })
    .then((response) => {
      return res.status(response.status).send({
        status: 'fulfilled',
        value: {
          tokenID: tokenID,
          data: response.data,
        },
      });
    })
    .catch((err) => {
      return res.status(err.status | 400).send({
        status: 'rejected',
        reason: err.message,
      });
    });
};

exports.getFeed = async (req, resp) => {
  const { address, page } = req.params;
  // const data = await getBatch(address, page, 'https://cloudflare-eth.com');
  return await batchFeed(address, page, 'https://cloudflare-eth.com')
    .then((data) => {
      return resp.status(200).json(data);
    })
    .catch((err) => {
      return resp.status(400).json({
        status: 'rejected',
        reason: err,
      });
    });
};
