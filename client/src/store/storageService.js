const localStorageConstants = {
    currentChecklistId: -1
}

function storeStateLocally(state){
    localStorage.setItem('state', state);
}
function retrieveState(){
    const state = localStorage.getItem('state');
    return state ? JSON.parse(state) : null;
}

function retrieveChecklists(){
    const state = retrieveState();
    console.log('lcoal retrieve')
    return state ? state.checklists : null;
}

function addChecklist(Title){
    return {Title, Id:currentChecklistId--, Pinned:false};
}

module.exports = {
    storeStateLocally,
    retrieveState,
    retrieveChecklists,
    addChecklist
}

// function updateChecklist(item){

// }

// function deleteChecklist(id){

// }



function retrieveChecklistItems(){

}

function addChecklistItem(name, checklistId){

}

// function updateChecklistItem(itemId, body){

// }

// function deleteChecklistItem(itemId){

// }

// function retrieveAccountConfig(){

// }

// function updateAccountConfig(config){

// }