const {checklistModel} = require('../models/models')
const {decodeToken} = require('./util')

async function getUserChecklists(req, res){
    const {jwt} = req.headers;

    const userId = decodeToken(jwt)['username']

    try{
        const results = await checklistModel.getUserChecklists(userId);
        res.status(200).send(results);
    }
    catch(e){
        res.status(400).send(e);
    }
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
        res.status(400).send(e);
    }
}

async function updateChecklistForUser(req, res){
    const {jwt} = req.headers;

    const userId = decodeToken(jwt)['username'];
    const {checklistId} = req.params;
    const {title, pinned} = req.body;

    try{
        const message = await checklistModel.updateChecklistForUser(userId, checklistId, title, pinned);
        res.status(200).send(message);
    }
    catch(e){
        res.status(400).send(e);
    }
}

async function deleteChecklistForUser(req, res){
    const {jwt} = req.headers;

    const userId = decodeToken(jwt)['username'];
    const {checklistId} = req.params;

    try{
        const message = await checklistModel.deleteChecklistForUser(userId, checklistId);
        res.status(200).send(message);
    }
    catch(e){
        res.status(400).send(e);
    }
}


async function getUserChecklistItems(req, res){
    const {jwt} = req.headers;

    const userId = decodeToken(jwt)['username']

    try{
        const results = await checklistModel.getUserChecklistItems(userId);
        res.status(200).send(results);
    }
    catch(e){
        res.status(400).send(e);
    }
}

async function createChecklistItem(req, res){
    const {jwt} = req.headers;

    const userId = decodeToken(jwt)['username'];
    const {checklistId} = req.params;
    const {name} = req.body;

    try{
        const message = await checklistModel.createChecklistItem(userId, checklistId, name);
        res.status(200).send(message);
    }
    catch(e){
        res.status(400).send(e);
    }
}

async function updateChecklistItem(req, res){
    const {jwt} = req.headers;

    const userId = decodeToken(jwt)['username'];
    const {itemId} = req.params;
    const {name, checked} = req.body;

    try{
        const message = await checklistModel.updateChecklistItem(userId, itemId, name, checked);
        res.status(200).send(message);
    }
    catch(e){
        res.status(400).send(e);
    }
}

async function deleteChecklistItem(req, res){
    const {jwt} = req.headers;

    const userId = decodeToken(jwt)['username'];
    const {itemId} = req.params;

    try{
        const message = await checklistModel.deleteChecklistItem(userId, itemId);
        res.status(200).send(message);
    }
    catch(e){
        res.status(400).send(e);
    }
}

module.exports = {
    getUserChecklists,
    createChecklistForUser,
    updateChecklistForUser,
    deleteChecklistForUser,

    getUserChecklistItems,
    createChecklistItem,
    updateChecklistItem,
    deleteChecklistItem
}