const {accountModel} = require('../models/models');
const {decodeToken} = require('./util');

async function getAccountConfig(req, res){
    // get JWT off req.headers
    const {jwt} = req.headers;

    try{
        // get userId from JWT
        const userId = decodeToken(jwt)['username'];

        // get accountConfig from database
        const accountConfig = await accountModel.getAccountConfig(userId)

        // send results to user
        res.status(200).send(accountConfig);
    }
    catch(e){
        res.status(400).send(JSON.stringify(e));
    }
    
}

async function updateAccountConfig(req, res){
    // get JWT off req.headers
    const {jwt} = req.headers;

    // get accountConfig off request body
    const {accountConfig} = req.body;

    try{
        // get userId from JWT
        const userId = decodeToken(jwt)['username'];

        // replace existing accountConfig with new accountConfig
        const message = await accountModel.updateAccountConfig(userId, accountConfig);
        res.status(200).send(message);
    }
    catch(e){
        res.status(400).send(JSON.stringify(e));
    }

}

module.exports = {
    getAccountConfig,
    updateAccountConfig
}