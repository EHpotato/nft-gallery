const { getTokenURI } = require('./middleware/web3');
const DEFAULT_PROVIDER = ""
exports.getNFT = async (req, res) => {
    // 1. grab provider
    const address = req.params.address;
    let { provider, tokenID } = req.body;
    provider = provider ? provider : "https://cloudflare-eth.com";
    if (tokenID < 0) {
        return res.status(400).send({
            status: 400,
            message: "Error: negative tokenID"
        });
    }
    return await getTokenURI({ address, tokenID, provider })
        .then((response) => {
            return res.status(response.status).send({
                status: response.status,
                data: response.data
            });
        })
        .catch((err) => {
            return res.status(err.status | 400).send({
                status: err.status | 400,
                message: err.message
            });
        })
}