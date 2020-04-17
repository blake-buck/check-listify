const {checklistController} = require('../controllers/controllers')
const {hasValidJwt} = require('./middleware/hasValidJwt');

function useChecklistRoutes(app){

    // CHECKLIST ENDPOINTS
    // get all checklists for a user
    app.get(
        '/api/user/checklist', 
        hasValidJwt, 
        checklistController.getUserChecklists
    )

    // create a checklist for a user
    app.post(
        '/api/user/checklist', 
        hasValidJwt, 
        checklistController.createChecklistForUser
    )

    // update a checklist for a user
    app.put(
        '/api/user/checklist/:checklistId', 
        hasValidJwt,
        checklistController.updateChecklistForUser
    )

    // delete a checklist for a user
    app.delete(
        '/api/user/checklist/:checklistId',
        hasValidJwt,
        checklistController.deleteChecklistForUser
    )

    
    // CHECKLIST-ITEM ENDPOINTS
    // get all checklist items for a user
    app.get(
        '/api/user/checklist/item', 
        hasValidJwt, 
        checklistController.getUserChecklistItems
    )

    // create a checklist item for a specific checklist and user
    app.post(
        '/api/user/checklist/:checklistId/item', 
        hasValidJwt,
        checklistController.createChecklistItem
    )

    // update a checklist item for a user
    app.put(
        '/api/user/checklist/item/:itemId', 
        hasValidJwt, 
        checklistController.updateChecklistItem
    )

    // delete a checklist item for a user
    app.delete(
        '/api/user/checklist/item/:itemId',
        hasValidJwt,
        checklistController.deleteChecklistItem
    )


    // OFFLINE/SYNCING ENDPOINTS

    // create a checklist along with its checklist items
    app.post(
        '/api/user/checklist/sync',
        hasValidJwt,
        checklistController.syncChecklistWithItems
    )

}

module.exports = {
    useChecklistRoutes
}