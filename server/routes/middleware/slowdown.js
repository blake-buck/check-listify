const _slowdown = require('express-slow-down');

// requestLimit is the number of requests to begin slowing down at
// requestWindow is number of minutes to continue slowing down at
// delay is the length of the slowdown in ms
function slowdown(requestLimit, requestWindow, delay){
    return _slowdown({
        windowMs:1000 * 1000 * requestWindow,
        delayAfter: requestLimit,
        delayMs: delay
    })
}

module.exports = {
    slowdown
}