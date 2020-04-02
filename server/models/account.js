const {queryToPromise} = require('./util');

// takes in a userId and returns their accountConfig settings
async function getAccountConfig(userId){
    return queryToPromise(
        'SELECT ThemeId, LineThrough, Opacity FROM users WHERE Id = ?',
        [userId]
    )
}

// takes in a userId + an object representing their accountConfig settings, and sets the field in table
// equal to given settings
async function updateAccountConfig(userId, {themeId, lineThrough, opacity}){
    return queryToPromise(
        'UPDATE users SET ThemeId = ?, LineThrough = ?, Opacity = ? WHERE Id = ?',
        [themeId, lineThrough, opacity, userId]
    )
}

module.exports = {
    getAccountConfig,
    updateAccountConfig
}