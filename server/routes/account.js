const accountController = require('../controllers/account')
const {hasValidJwt} = require('./middleware/hasValidJwt')


function useAccountRoutes(app){
    // get user account configuration
    app.get('/api/user/account', hasValidJwt,  async (req, res) => await accountController.getAccountConfig(req, res))

    // accountConfig:{opacity, lineThrough, themeId}    ---> req.body
    app.put('/api/user/account', hasValidJwt, async (req, res) => await accountController.updateAccountConfig(req, res))
}

module.exports = {
    useAccountRoutes
}