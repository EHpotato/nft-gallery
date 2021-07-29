const Web3 = require('web3');
const abi = require('./abi/ERC721.json');
const axios = require('axios');

exports.getNFT = async (req, res) => {
    // 1. grab provider
    const { provider, tokenID } = req.body;
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, req.params.address);
    await contract.methods.tokenURI(tokenID).call()
        .then(async (response) => {
            const data = await axios.get(response);
            res.status(200).send(data.data);
            return;
        })
        .catch((err) => {
            console.log(err.message);
            res.status(404).send(err.message);
            return;
        });
}