const jsonwebtoken = require('jsonwebtoken');

// this decodes a JWT without verifying its signature. 
// Should only be used when the jwt being decoded has been previously verified in the call, e.g. by using
// hasValidJwt middleware
function decodeToken(jwt){
    const decodedToken = jsonwebtoken.decode(jwt);
    return decodedToken.jwt
}

module.exports = {
    decodeToken
}