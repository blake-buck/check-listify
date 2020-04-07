const {queryToPromise} = require('./util');

async function getUserChecklists(userId){
    return queryToPromise(
        'SELECT * FROM checklists WHERE UserId = ?;',
        [userId]
    )
}

async function createChecklistForUser(userId, title){
    // Create new checklist item and then immediately return it
    return queryToPromise(
        'INSERT INTO checklists(UserId, Title, Pinned) VALUES (?, ?, 0); SELECT * FROM checklists WHERE UserId = ? ORDER BY ID DESC LIMIT 1; ',
        [userId, title, userId]
    )
}

async function updateChecklistForUser(userId, checklistId, title, pinned){
    return queryToPromise(
        'UPDATE checklists SET Title = ?, Pinned =? WHERE UserId = ? AND Id = ?',
        [title, pinned, userId, checklistId]
    )
}

async function deleteChecklistForUser(userId, checklistId){
    return queryToPromise(
        'DELETE FROM checklists WHERE UserId = ? AND Id = ?',
        [userId, checklistId]
    )
}



async function getUserChecklistItems(userId){
    return queryToPromise(
        'SELECT * FROM checklist_items WHERE UserId = ?',
        [userId]
    )
}

async function createChecklistItem(userId, checklistId, name){
    return queryToPromise(
        'INSERT INTO checklist_items(UserId, ChecklistId, Name, Checked) VALUES (?, ?, ?, 0)',
        [userId, checklistId, name]
    )
}

async function updateChecklistItem(userId, itemId, name, checked){
    return queryToPromise(
        'UPDATE checklist_items SET Name = ?, Checked = ? WHERE UserId =? AND Id = ?',
        [name, checked, userId, itemId]
    )
}

async function deleteChecklistItem(userId, itemId){
    return queryToPromise(
        'DELETE FROM checklist_items WHERE UserId = ? AND Id = ?',
        [userId, itemId]
    )
}

module.exports = {
    getUserChecklists,
    createChecklistForUser,
    updateChecklistForUser,
    deleteChecklistForUser,

    getUserChecklistItems,
    createChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,
}