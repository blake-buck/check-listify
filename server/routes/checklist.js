const {checklistController} = require('../controllers/controllers')
const {hasValidJwt} = require('./middleware/hasValidJwt');

function useChecklistRoutes(app){

    // get all checklists for a user
    app.get('/api/user/checklist', hasValidJwt, )

    // get all checklist items for a user
    app.get('/api/user/checklist/item', hasValidJwt, )

    // create a checklist for a user
    app.post(
        '/api/user/checklist', 
        hasValidJwt, 
        async (req, res) => await checklistController.createChecklistForUser(req, res)
    )

    // create a checklist item for a specific checklist and user
    app.post('/api/user/checklist/:checklist-id/item', hasValidJwt, )

    // update a checklist for a user
    app.put('/api/user/checklist/:checklist-id', hasValidJwt, )

    // update a checklist item for a user
    app.put('/api/user/checklist/item/:item-id', hasValidJwt, )

    // delete a checklist for a user
    app.delete('/api/user/checklist/:checklist-id', hasValidJwt, )

    // delete a checklist item for a user
    app.delete('/api/user/checklist/item/:item-id', hasValidJwt, )
}

module.exports = {
    useChecklistRoutes
}