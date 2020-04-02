const jsonwebtoken = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const jwk = require('../../jwks.json');

function verifyJWT(token){
    const pem = jwkToPem(jwk);
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
            if(err){
                console.log(err)
                reject(err);
            }
            if(decodedToken){
                console.log(decodedToken)
                resolve(decodedToken)
            }
        })
    })
}

async function hasValidJwt(req, res, next){
    const { jwt } = req.headers;

    if(!jwt){
        res.status(400).send('No JSON Web Token in request header');
    }

    try{
        await verifyJWT(jwt);
        next();
    }
    catch(e){
        console.log(e);
        res.status(400).send('JSON Web Token is not valid.')
    }
    

}

module.exports = {hasValidJwt}