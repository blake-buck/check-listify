const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');
const { AWS_COGNITO_SECRET_HASH, AWS_CLIENT_ID } = process.env;

// this decodes a JWT without verifying its signature. 
// Should only be used when the jwt being decoded has been previously verified in the call, e.g. by using
// hasValidJwt middleware
function decodeToken(jwt){
    const decodedToken = jsonwebtoken.decode(jwt);
    return decodedToken
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

// Standardized cognitoCallback function pattern
// successHandler can be a string or a function, if a string then it is used as a message. If it is a function the function
// is executed
function cognitoCallback(successHandler, res){
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

module.exports = {
    decodeToken,
    createSecrectHash,
    formatHeaders,
    cognitoCallback
}