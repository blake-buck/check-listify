const authController = require('./authentication');
const accountController = require('./account');
const checklistController = require('./checklist');

// this file exists so all controller are exported from the same place
module.exports = {
    authController,
    accountController,
    checklistController
}