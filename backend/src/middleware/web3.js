const axios = require('axios');
const abi = require('../abi/ERC721.json');
const Contract = require('web3-eth-contract');
const web3 = require('web3');
const db = require('../db');

const getTokenByIndex = async (contract, index) => {
  return await contract.methods
    .tokenByIndex(index)
    .call()
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err.message);
      return new Error('Token By Index Error: ' + err.message);
    });
};

exports.getTokenURI = async ({ address, tokenID, provider }) => {
  Contract.setProvider(provider);
  const contract = new Contract(abi, address);
  const tokenByIndex = await getTokenByIndex(contract, tokenID).catch((err) => {
    return Promise.reject({
      status: 400,
      message: err.message,
    });
  });
  const tokenURI = await contract.methods
    .tokenURI(tokenByIndex)
    .call()
    .catch((err) => {
      console.log(err.message);
      return Promise.reject({
        status: 400,
        message: 'Invalid contract address/tokenID',
      });
    });
  return await axios
    .get(tokenURI)
    .then((response) => {
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

const batchRequests = async ({ requests, provider }) => {
  const batch = new new web3(provider).BatchRequest();
  let promises = [];
  requests.map((request) => {
    let r = new Promise((resolve, reject) => {
      batch.add(
        request.func.request({}, (err, resp) => {
          if (err) return reject(-1);
          resolve(resp);
        })
      );
    });
    promises.push(r);
  });
  await batch.execute();
  return await Promise.all(promises);
};

exports.getBatch = async (address, page, provider) => {
  let response = [];
  Contract.setProvider(provider);
  const contract = new Contract(abi, address);
  const offset = page * 9 + 1;

  let requests = [];
  for (let i = offset; i < offset + 9; i++) {
    let request = contract.methods.tokenByIndex(i).call;
    requests.push({ func: request });
  }
  const tokenIDs = await batchRequests({ requests, provider });

  requests = [];
  for (const ID of tokenIDs) {
    if (!ID) continue;
    let data = await db.getTokenByContract(address, ID);
    if (data) {
      response.push({ tokenID: ID, tokenURI: data.image });
    } else {
      requests.push({ func: contract.methods.tokenURI(ID).call, id: ID });
    }
  }

  const tokenURIs = await batchRequests({ requests, provider });

  tokenURIs.forEach((value, index) => {
    if (!tokenIDs[index]) return;
    response.push({ tokenID: requests[index].id, tokenURI: value });
  });
  return response;
};
