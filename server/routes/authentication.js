const {authController} = require('../controllers/controllers');
const {rateLimiter}    = require('./middleware/rateLimiter');
const {slowdown}       = require('./middleware/slowdown');
const {hasValidJwt}    = require('./middleware/hasValidJwt')

const limitThreeAttempts = rateLimiter(3, 60);

function useAuthenticationRoutes(app){

    // username, password  --> fields on req.body
    app.post('/api/register', limitThreeAttempts, authController.register);
    app.post('/api/login', rateLimiter(10, 60), slowdown(3, 6000, 1),  authController.login);

    // previousPassword, proposedPassword --> fields on req.body
    app.post('/api/change-password', limitThreeAttempts, authController.changePassword)

    // username --> fields on req.body
    app.post('/api/forgot-password', limitThreeAttempts, authController.forgotPassword)

    // username, password, confirmation code --> fields on req.body
    app.post('/api/forgot-password/confirm', limitThreeAttempts, authController.confirmForgotPassword)

    // Cognito probably already checks for valid JWTs, but it pays to be careful
    app.delete('/api/delete-account', hasValidJwt, authController.deleteAccount);
}

module.exports = {
    useAuthenticationRoutes
}