require('dotenv').config();
const aws = require('aws-sdk');
const crypto = require('crypto')


// Environment Variables
const {
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID,
    AWS_REGION,
    AWS_COGNITO_SECRET_HASH,
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

    cognito.signUp(params, callback('Check your email for a registration message', res));
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
        res.status(200).send(jwt);
    }

    cognito.adminInitiateAuth(params, callback(successHandler, res));
}

// delete the user account
async function deleteAccount(req, res){
    const params = {
        AccessToken:req.headers.jwt
    }

    cognito.deleteUser(params, callback('Account is deleted.', res));
}

module.exports = {
    register,
    login,
    deleteAccount
}


// certain Cognito functions require a "Secret Hash", which is an HMAC consisting of the Secret hash for the App Client,
// the username of the user, and the Id of the App Client
function createSecrectHash(username){
    return crypto.createHmac('sha256', AWS_COGNITO_SECRET_HASH).update(username + AWS_CLIENT_ID).digest('base64')
}

// Request headers need to be formatted in a specific way for use with certain Cognito functions
function formatHeaders(headers){
    let newHeaders = [];

    // for every key in headers object, split them into an object consisting of headerName and headerValue, then push them
    // into a new array
    for(const headerName in headers){
        newHeaders.push({
            headerName,
            headerValue: headers[headerName]
        });
    }

    return newHeaders;
}

// Standardized callback function pattern
// successHandler can be a string or a function, if a string then it is used as a message. If it is a function the function
// is executed
function callback(successHandler, res){
    return function(err, data){
        if(err){
            res.status(400).send(err.message);
        }
        if(data){
            if(typeof successHandler === 'function'){
                successHandler(data);
            }
            else{
                res.status(200).send(successHandler);
            }
            
        }
    }
}