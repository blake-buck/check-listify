const {checklistModel} = require('../models/models')
const {decodeToken} = require('./util')

async function getUserChecklists(req, res){
    const {jwt} = req.headers;
    const userId = decodeToken(jwt)['username']

}

async function createChecklistForUser(req, res){
    const {jwt}   = req.headers;

    const userId = decodeToken(jwt)['username'];
    const {title} = req.body;

    try{
        const message = await checklistModel.createChecklistForUser(userId, title)
        res.status(200).send(message);
    }
    catch(e){
        res.status(400).send(e)
    }
}

module.exports = {
    getUserChecklists,
    createChecklistForUser,
}