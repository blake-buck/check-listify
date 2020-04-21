const {accountModel} = require('../models/models');
const {logError} = require('../models/util');
const {getUserIdFromToken} = require('./util');

async function getAccountConfig(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);
    try{
        // get accountConfig from database
        const accountConfig = await accountModel.getAccountConfig(userId)

        // send results to user
        res.status(200).send({accountConfig, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
    }
    
}

async function updateAccountConfig(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);

    // get accountConfig off request body
    const accountConfig = req.body;

    try{
        // replace existing accountConfig with new accountConfig
        const message = await accountModel.updateAccountConfig(userId, accountConfig);
        res.status(200).send({message, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
    }

}

module.exports = {
    getAccountConfig,
    updateAccountConfig
}