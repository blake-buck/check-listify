const {queryToPromise} = require('./util');

async function createChecklistForUser(userId, title){
    return queryToPromise(
        'INSERT INTO checklists(UserId, Title, Pinned) VALUES (?, ?, 0)',
        [userId, title]
    )
}

module.exports = {
    createChecklistForUser
}