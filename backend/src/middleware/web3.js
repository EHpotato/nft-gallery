const axios = require('axios');
const abi = require('../abi/ERC721.json');
const Contract = require('web3-eth-contract');
const web3 = require('web3');

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
        request.request({}, (err, resp) => {
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
  Contract.setProvider(provider);
  const contract = new Contract(abi, address);

  const offset = page * 9 + 1;
  let requests = [];
  for (let i = offset; i < offset + 9; i++) {
    let request = contract.methods.tokenByIndex(i).call;
    requests.push(request);
  }
  let responses = await batchRequests({ requests, provider });

  requests = responses.map((value) => {
    if (value === -1) return;
    return contract.methods.tokenURI(value).call;
  });

  responses = await batchRequests({ requests, provider });

  console.log(responses);
  return responses;
};
