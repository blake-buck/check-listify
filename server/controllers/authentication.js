require('dotenv').config();
const aws = require('aws-sdk');

const {authModel} = require('../models/models');
const {createSecrectHash, formatHeaders, cognitoCallback} = require('./util');

// Environment Variables
const {
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID,
    AWS_REGION,
    AWS_CLIENT_ID,
    AWS_USER_POOL_ID,
    SERVER_NAME
} = process.env;

// Initialize AWS Cognito provider
const cognito = new aws.CognitoIdentityServiceProvider({
    secretAccessKey:    AWS_SECRET_ACCESS_KEY, 
    accessKeyId:        AWS_ACCESS_KEY_ID, 
    region:             AWS_REGION
});


// Register a new user in the User Pool
async function register(req, res){
    const {username, password} = req.body;

    const params = {
        ClientId: AWS_CLIENT_ID,
        Username: username,
        Password: password,
        SecretHash: createSecrectHash(username)
    }

    const successHandler = async (data) => {
        try{
            // Add the user to User Table, tell them to check their email for a registration message
            await authModel.addUserToTable(data.UserSub)
            res.status(200).send({status:200, message:'Check your email for a registration message'})
        }
        catch(e){
            // If error occurs while adding user to table, delete the user from the user pool and tell them to try again
            cognito.adminDeleteUser({
                UserPoolId:AWS_USER_POOL_ID,
                Username:data.UserSub
            })
            res.status(500).send({status:500, message:'An internal error occured. Please try registering again'})
        }
        
    }

    cognito.signUp(params, cognitoCallback(successHandler, res));
}

// Log a user in using username and passwsord, returning a JWT
async function login(req, res){
    const {username, password} = req.body;

    const params = {
        AuthFlow:   'ADMIN_USER_PASSWORD_AUTH',
        UserPoolId: AWS_USER_POOL_ID,
        ClientId:   AWS_CLIENT_ID,
        
        AuthParameters:{
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: createSecrectHash(username)
        },

        ContextData:{
            IpAddress:   req.ip,
            ServerName:  SERVER_NAME,
            ServerPath:  '/api/login',
            HttpHeaders: formatHeaders(req.headers)
        }
    }

    let successHandler = (data) => {
        let jwt = data.AuthenticationResult.AccessToken;
        res.status(200).send({jwt, status:200});
    }

    cognito.adminInitiateAuth(params, cognitoCallback(successHandler, res));
}

// delete the user account
async function deleteAccount(req, res){
    const params = {
        AccessToken:req.headers.jwt
    }

    cognito.deleteUser(params, cognitoCallback('Account is deleted.', res));
}

// if user is signed in, they can change their password
async function changePassword(req, res){
    const {previousPassword, proposedPassword} = req.body;
    const params = {
        AccessToken:      req.headers.jwt,
        PreviousPassword: previousPassword,
        ProposedPassword: proposedPassword
    }

    // If password is successfully changed, invalidate every jwt in circulation
    const successHandler = (data) => {
        cognito.globalSignOut({AccessToken: req.headers.jwt}, cognitoCallback('Password is changed.', res))
    }

    cognito.changePassword(params, cognitoCallback(successHandler, res))
}

// send confirmation code to a user's email address
async function forgotPassword(req, res){
    const {username} = req.body;

    const params = {
        ClientId: AWS_CLIENT_ID,
        Username: username,
        SecretHash: createSecrectHash(username)
    }

    cognito.forgotPassword(params, cognitoCallback('Check your email for a code.', res))
}

// use confirmation code from email to change password
async function confirmForgotPassword(req, res){
    const {confirmationCode, username, password} = req.body;

    const params = {
        ClientId: AWS_CLIENT_ID,
        ConfirmationCode: confirmationCode,
        Username:username,
        Password:password,
        SecretHash: createSecrectHash(username)
    }

    cognito.confirmForgotPassword(params, cognitoCallback('Your password has been reset.', res))
}

module.exports = {
    register,
    login,
    deleteAccount,
    changePassword,
    forgotPassword,
    confirmForgotPassword
}