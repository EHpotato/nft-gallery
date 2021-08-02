const axios = require('axios');
const abi = require('../abi/ERC721.json');
const Contract = require('web3-eth-contract');

exports.getTokenURI = async ({address, tokenID, provider}) => {
  Contract.setProvider(provider);
  const contract = new Contract(abi, address);
  const tokenURI = await contract.methods.tokenURI(tokenID).call()
      .catch((err) => {
        return Promise.reject({
          status: 400,
          message: 'Invalid contract address/tokenID',
        });
      });
  return await axios.get(tokenURI)
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
