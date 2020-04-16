const localStorageConstants = {
    currentChecklistId: -1,
    currentChecklistItemId: -1
}

function storeStateLocally(state){
    localStorage.setItem('state', state);
}
function retrieveState(){
    const state = localStorage.getItem('state');
    console.log(JSON.parse(state));
    return state ? JSON.parse(state) : null;
}

function retrieveChecklists(){
    const state = retrieveState();
    return state ? state.checklists : null;
}

function addChecklist(Title){
    return {Title, Id:currentChecklistId--, Pinned:false};
}

module.exports = {
    storeStateLocally,
    retrieveState,
    retrieveChecklists,
    addChecklist,
    retrieveChecklistItems,
    addChecklistItem,
    retrieveAccountConfig
}

// function updateChecklist(item){

// }

// function deleteChecklist(id){

// }



function retrieveChecklistItems(){
    const state = retrieveState();
    return state ? state.items : null;
}

function addChecklistItem(Name, ChecklistId){
    return {Name, Id:currentChecklistItemId--, ChecklistId, Checked:false};
}

// function updateChecklistItem(itemId, body){

// }

// function deleteChecklistItem(itemId){

// }

function retrieveAccountConfig(){
    const state = retrieveState();
    return state ? state.accountConfig : null;
}

// function updateAccountConfig(config){

// }