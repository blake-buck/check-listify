const {checklistModel} = require('../models/models');
const {logError} = require('../models/util');
const {getUserIdFromToken} = require('./util');

async function getUserChecklists(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);

    try{
        const results = await checklistModel.getUserChecklists(userId);
        res.status(200).send({results, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
    }
}

async function createChecklistForUser(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);

    const {title} = req.body;

    try{
        const message = await checklistModel.createChecklistForUser(userId, title)
        res.status(200).send({message, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
    }
}

async function updateChecklistForUser(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);

    const {checklistId} = req.params;
    const {title, pinned} = req.body;

    try{
        const message = await checklistModel.updateChecklistForUser(userId, checklistId, title, pinned);
        res.status(200).send({message, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status: 400});
    }
}

async function deleteChecklistForUser(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);

    const {checklistId} = req.params;

    try{
        const message = await checklistModel.deleteChecklistForUser(userId, checklistId);
        res.status(200).send({message, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
    }
}


async function getUserChecklistItems(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);

    try{
        const items = await checklistModel.getUserChecklistItems(userId);
        res.status(200).send({items, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
    }
}

async function createChecklistItem(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);

    const {checklistId} = req.params;
    const {name} = req.body;

    try{
        const message = await checklistModel.createChecklistItem(userId, checklistId, name);
        res.status(200).send({message, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
    }
}

async function updateChecklistItem(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);

    const {itemId} = req.params;
    const {name, checked} = req.body;

    try{
        const message = await checklistModel.updateChecklistItem(userId, itemId, name, checked);
        res.status(200).send({message, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
    }
}

async function deleteChecklistItem(req, res){
    // get userId from JWT
    const userId = getUserIdFromToken(req.headers.jwt);

    const {itemId} = req.params;

    try{
        const message = await checklistModel.deleteChecklistItem(userId, itemId);
        res.status(200).send({message, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
    }
}

async function syncChecklistWithItems(req, res){
    const userId = getUserIdFromToken(req.headers.jwt);
    const {checklist, items} = req.body;

    try{
        const checklistResponse = await checklistModel.syncChecklistForUser(userId, checklist.Title, checklist.Pinned);
        const createdChecklist = checklistResponse[1][0];

        const itemsResponse = await checklistModel.syncChecklistItems(userId, items, createdChecklist.Id);
        const itemGroup = itemsResponse.map(response => response[1][0]);

        res.status(200).send({createdChecklist, itemGroup, status:200});
    }
    catch(error){
        logError(req.ip, error);
        res.status(400).send({error, status:400});
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
    deleteChecklistItem,

    syncChecklistWithItems
}