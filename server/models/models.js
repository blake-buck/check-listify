const authModel = require('./authentication');
const accountModel = require('./account');
const checklistModel = require('./checklist');

// This file exists so all the db models get exported from the same place
module.exports = {
    authModel,
    accountModel,
    checklistModel
}