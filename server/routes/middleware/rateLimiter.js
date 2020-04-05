const _rateLimiter = require('express-rate-limit');

// requestLimit is the number of requests to cut off at
// requestWindow is number of minutes to block further incoming requests
function rateLimiter(requestLimit, requestWindow){
    return _rateLimiter({
        windowMs: 1000 * 1000 * requestWindow,
        max:      requestLimit,
        message: 'Too many requests from this IP. Please try again later.'
    })
}

module.exports = {
    rateLimiter
}