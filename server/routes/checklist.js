const {checklistController} = require('../controllers/controllers')
const {hasValidJwt} = require('./middleware/hasValidJwt');

function useChecklistRoutes(app){

    // get all checklists for a user
    app.get(
        '/api/user/checklist', 
        hasValidJwt, 
        async (req, res) => await checklistController.getUserChecklists(req, res)
    )

    // get all checklist items for a user
    app.get(
        '/api/user/checklist/item', 
        hasValidJwt, 
        async (req, res) => await checklistController.getUserChecklistItems(req, res)
    )

    // create a checklist for a user
    app.post(
        '/api/user/checklist', 
        hasValidJwt, 
        async (req, res) => await checklistController.createChecklistForUser(req, res)
    )

    // create a checklist item for a specific checklist and user
    app.post(
        '/api/user/checklist/:checklistId/item', 
        hasValidJwt,
        async (req, res) => await checklistController.createChecklistItem(req, res)
    )

    // update a checklist for a user
    app.put(
        '/api/user/checklist/:checklistId', 
        hasValidJwt,
        async (req, res) => await checklistController.updateChecklistForUser(req, res)
    )

    // update a checklist item for a user
    app.put(
        '/api/user/checklist/item/:itemId', 
        hasValidJwt, 
        async (req, res) => await checklistController.updateChecklistItem(req, res)
    )

    // delete a checklist for a user
    app.delete(
        '/api/user/checklist/:checklistId',
        hasValidJwt,
        async (req, res) => await checklistController.deleteChecklistForUser(req, res)
    )

    // delete a checklist item for a user
    app.delete(
        '/api/user/checklist/item/:itemId',
        hasValidJwt,
        async (req, res) => await checklistController.deleteChecklistItem(req, res)
    )
}

module.exports = {
    useChecklistRoutes
}