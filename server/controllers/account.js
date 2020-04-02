const {accountModel} = require('../models/models');
const jsonwebtoken = require('jsonwebtoken');

async function getAccountConfig(req, res){
    const {jwt} = req.headers;

    try{
        // using decode instead of verify, because hasValidJwt middleware has already taken care of determining if this is valid
        const decodedToken = jsonwebtoken.decode(jwt);
        const userId = decodedToken['username']

        const accountConfig = await accountModel.getAccountConfig(userId)
        res.status(200).send(accountConfig);
    }
    catch(e){
        console.log(e);
        res.status(400).send(JSON.stringify(e));
    }
    
}

async function updateAccountConfig(req, res){
    const {jwt} = req.headers;
    const {accountConfig} = req.body;

    try{
        // using decode instead of verify, because hasValidJwt middleware has already taken care of determining if this is valid
        const decodedToken = jsonwebtoken.decode(jwt);
        const userId = decodedToken['username'];

        const message = await accountModel.updateAccountConfig(userId, accountConfig);
        res.status(200).send(message);
    }
    catch(e){
        console.log(e);
        res.status(400).send(JSON.stringify(e));
    }

}

module.exports = {
    getAccountConfig,
    updateAccountConfig
}