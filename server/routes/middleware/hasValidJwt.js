const jsonwebtoken = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const jwk = require('../../jwks.json');

// this verifyJWT flow follows the one layed out in the documentation
// reads a Json Web Key from jwks.json in root, and verifies it agains the token passed in
function verifyJWT(token){
    const pem = jwkToPem(jwk);
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
            if(err){
                reject(err);
            }
            if(decodedToken){
                resolve(decodedToken)
            }
        })
    })
}

// the actual middleware used
async function hasValidJwt(req, res, next){
    const { jwt } = req.headers;

    // if no json web token is in request header, send a response
    if(!jwt){
        res.status(400).send('No JSON Web Token in request header');
    }

    try{
        // if json web token is valid, continue
        await verifyJWT(jwt);
        next();
    }
    catch(e){
        // if json web token is invalid, send a response
        res.status(400).send('JSON Web Token is not valid.')
    }
    

}

module.exports = {hasValidJwt}