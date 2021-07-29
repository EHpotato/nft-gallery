const axios = require('axios');
const Web3 = require('web3');
const abi = require('./abi/ERC721.json');

exports.getTokenURI = async ({ address, tokenID, provider }) => {
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, address);
    const tokenURI = await contract.methods.tokenURI(tokenID).call()
        .catch((err) => {
            return Promise.reject({
                status: 400,
                message: "Invalid contract address/tokenID"
            });
        });
    return await axios.get(tokenURI)
        .then((response) => {
            return Promise.resolve({
                status: 200,
                data: response.data
            });
        })
        .catch((err) => {
            return Promise.reject({
                status: err.response.status,
                message: err.response.statusText
            })
        })
}