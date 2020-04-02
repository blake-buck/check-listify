const authController = require('../controllers/authentication');

function useAuthenticationRoutes(app){
    // username, password  --> fields on req.body
    app.post('/api/register', async (req, res) =>  await authController.register(req, res));
    app.post('/api/login',    async (req, res) => await authController.login(req, res));

    // previousPassword, proposedPassword --> fields on req.body
    app.post('/api/change-password', async (req, res) => await authController.changePassword(req, res))

    // username --> fields on req.body
    app.post('/api/forgot-password', async (req, res) => await authController.forgotPassword(req, res))

    // username, password, confirmation code --> fields on req.body
    app.post('/api/forgot-password/confirm', async (req, res) => await authController.confirmForgotPassword(req, res))

    app.delete('/api/delete-account', async (req, res) => await authController.deleteAccount(req, res));
}

module.exports = {
    useAuthenticationRoutes
}