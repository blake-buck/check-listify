const defaultLocalStorageConstants = {
    currentChecklistId: -1,
    currentChecklistItemId: -1
}
const localStorageConstants = retrieveConstants();


function storeConstants(){
    localStorage.setItem('constants', JSON.stringify(localStorageConstants));
}
function retrieveConstants(){
    const constants = JSON.parse(localStorage.getItem('constants'));
    return constants ? constants : defaultLocalStorageConstants;
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
    localStorageConstants.currentChecklistId--;
    storeConstants();
    return {Title, Id:localStorageConstants.currentChecklistId, Pinned:false};
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
    localStorageConstants.currentChecklistItemId--;
    storeConstants();
    return {Name, Id:localStorageConstants.currentChecklistItemId, ChecklistId, Checked:false};
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