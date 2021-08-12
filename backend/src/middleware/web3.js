const axios = require('axios');
const abi = require('../abi/ERC721.json');
const Contract = require('web3-eth-contract');
const db = require('../db');

exports.getTokenURI = async ({ address, tokenID, provider }) => {
  const data = await db.getTokenByID(address, tokenID);
  if (data) {
    return Promise.resolve({
      status: 200,
      data: data,
    });
  }
  Contract.setProvider(provider);
  const contract = new Contract(abi, address);
  const tokenURI = await contract.methods
    .tokenURI(tokenID)
    .call()
    .catch((err) => {
      console.log(err.message);
      return Promise.reject({
        status: 400,
        message: 'Invalid contract address or tokenID',
      });
    });
  return await axios
    .get(tokenURI)
    .then((response) => {
      db.insertByTokenID(address, tokenID, response.data);
      return Promise.resolve({
        status: 200,
        data: response.data,
      });
    })
    .catch((err) => {
      return Promise.reject({
        status: err.response.status,
        message: err.response.statusText,
      });
    });
};

const getData = async (index, address, callback) => {
  // TODO Implement DB get by index
  const contract = new Contract(abi, address);
  const existing = await db.getByIndex(address, index);
  if (existing) {
    // TODO: FIX THIS
    callback({ tokenID: existing.tokenid, data: existing.tokenuri.data }, null);
    return;
  }
  console.log(index);
  const tokenID = await contract.methods
    .tokenByIndex(index)
    .call()
    .catch(() => {
      console.log('tokenID error');
      return -1;
    });
  if (tokenID == -1) {
    return callback(null, 'Invalid Token ID');
  }
  const data = await db.getTokenByID(address, tokenID);
  if (data) {
    // TODO UPDATE TOKEN INDEX
    await db.updateIndex(address, tokenID, index);
    callback({ tokenID, data }, null);
    return;
  }
  const tokenURI = await contract.methods
    .tokenURI(tokenID)
    .call()
    .catch(() => {
      console.log('tokenURI error');
      return callback(null, 'Error getting tokenURI');
    });
  return await axios
    .get(tokenURI)
    .then((resp) => {
      db.insertToken(address, tokenID, index, resp.data);
      return callback({ tokenID: tokenID, data: resp.data }, null);
    })
    .catch((err) => {
      console.log(err.message);
      return callback(null, 'error axios');
    });
};

exports.batchFeed = async (address, page, provider) => {
  Contract.setProvider(provider);
  const indexes = [];
  const promises = [];
  const offset = page * 9 + 1;
  for (let i = offset; i < offset + 9; i++) {
    indexes.push(i);
  }
  indexes.map((index) => {
    promises.push(
      new Promise((resolve, reject) => {
        getData(index, address, (resp, err) => {
          if (err) return reject(err);
          resolve(resp);
        });
      })
    );
  });
  return Promise.allSettled(promises);
  // return await Promise.all(promises);
};
