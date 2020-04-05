const {accountController} = require('../controllers/controllers')
const {hasValidJwt} = require('./middleware/hasValidJwt')


function useAccountRoutes(app){
    // get user account configuration
    app.get('/api/user/account', hasValidJwt, accountController.getAccountConfig);

    // accountConfig:{opacity, lineThrough, themeId}    ---> req.body
    app.put('/api/user/account', hasValidJwt, accountController.updateAccountConfig);
}

module.exports = {
    useAccountRoutes
}