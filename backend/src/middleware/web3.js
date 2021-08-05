const axios = require('axios');
const abi = require('../abi/ERC721.json');
const Contract = require('web3-eth-contract');

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
