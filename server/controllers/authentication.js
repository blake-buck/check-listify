require('dotenv').config();
const aws = require('aws-sdk');
const crypto = require('crypto')

const {
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID,
    AWS_REGION,
    AWS_COGNITO_SECRET_HASH,
    AWS_CLIENT_ID,
    AWS_USER_POOL_ID,
    SERVER_NAME
} = process.env;

const cognito = new aws.CognitoIdentityServiceProvider({
    secretAccessKey:    AWS_SECRET_ACCESS_KEY, 
    accessKeyId:        AWS_ACCESS_KEY_ID, 
    region:             AWS_REGION
});

function createSecrectHash(username){
    return crypto.createHmac('sha256', AWS_COGNITO_SECRET_HASH).update(username + AWS_CLIENT_ID).digest('base64')
}

function formatHeaders(headers){
    let newHeaders = [];

    for(const headerName in headers){
        newHeaders.push({
            headerName,
            headerValue: headers[headerName]
        });
    }

    return newHeaders;
}

async function register(req, res){

    const {username, password} = req.body;

    const params = {
        ClientId: AWS_CLIENT_ID,
        Username: username,
        Password: password,
        SecretHash: createSecrectHash(username)
    }

    const callback = (err, data) => {
        if(err){
            res.status(400).send(err.message);
        }
        if(data){
            res.status(200).send('Check your email for a registration message.');
        }
    }

    cognito.signUp(params, callback);
}

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

    const callback = (err, data) => {
        if(err){
            res.status(400).send(err.message);
        }
        if(data){
            let jwt = data.AuthenticationResult.AccessToken;
            res.status(200).send(jwt);
        }
    }

    cognito.adminInitiateAuth(params, callback);

}

async function deleteAccount(req, res){

    const params = {
        AccessToken:req.headers.jwt
    }

    const callback = (err, data) => {
        if(err){
            res.status(400).send(err.message);
        }
        if(data){
            res.status(200).send('Account is deleted.');
        }
    }

    cognito.deleteUser(params, callback);

}

module.exports = {
    register,
    login,
    deleteAccount
}