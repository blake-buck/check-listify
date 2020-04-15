const {queryToPromise} = require('./util');

// Takes in a userId, adds to table, sets ThemeId equal to 1, LineThrough & Opacity equal to true
async function addUserToTable(userId){
    return queryToPromise(
        'INSERT INTO users(Id, ThemeId, LineThrough, Opacity, themeName) VALUES(?, 1, 1, 1, "light")',
        [userId]
    )
}

module.exports = {
    addUserToTable
}