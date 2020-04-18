let defaultLocalStorageConstants = {
    currentChecklistId: -1,
    currentChecklistItemId: -1,

    createdChecklistItems:[],
    updatedChecklistItems:[],
    deletedChecklistItems:[],

    createdChecklists:[],
    updatedChecklists:[],
    deletedChecklists:[],
}
let localStorageConstants = retrieveConstants();


function storeConstants(){
    localStorage.setItem('constants', JSON.stringify(localStorageConstants));
}
function retrieveConstants(){
    const constants = JSON.parse(localStorage.getItem('constants'));
    return constants ? constants : {
        currentChecklistId: -1,
        currentChecklistItemId: -1,
    
        createdChecklistItems:[],
        updatedChecklistItems:[],
        deletedChecklistItems:[],
    
        createdChecklists:[],
        updatedChecklists:[],
        deletedChecklists:[]
    };
}

function clearConstants(){
    localStorage.removeItem('constants');
    localStorage.setItem('constants', JSON.stringify({
        currentChecklistId: -1,
        currentChecklistItemId: -1,
    
        createdChecklistItems:[],
        updatedChecklistItems:[],
        deletedChecklistItems:[],
    
        createdChecklists:[],
        updatedChecklists:[],
        deletedChecklists:[]
    }))
    localStorageConstants = retrieveConstants();
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
    return state ? state.checklists : null;
}

function addChecklist(Title){
    localStorageConstants.currentChecklistId--;
    const checklist = {Title, Id:localStorageConstants.currentChecklistId, Pinned:false};
    localStorageConstants.createdChecklists= [...localStorageConstants.createdChecklists, checklist];
    storeConstants();
    
    return checklist;
}

function updateChecklist(checklist){
    if(checklist.Id > 0){
        localStorageConstants.updatedChecklists = [...localStorageConstants.updatedChecklists, checklist];
    }
    else{
        localStorageConstants.createdChecklists = localStorageConstants.createdChecklists.map(val => {
            if(val.Id === checklist.Id){
                return {...checklist}
            }
            return val
        })
    }
    storeConstants();
}

function deleteChecklist(id){
    if(id > 0){
        localStorageConstants.deletedChecklists = [...localStorageConstants.deletedChecklists, id];
    }
    else{
        localStorageConstants.createdChecklists.filter(val => val.Id !== id);
    }
    storeConstants();
}



function retrieveChecklistItems(){
    const state = retrieveState();
    return state ? state.items : null;
}

function addChecklistItem(Name, ChecklistId){
    localStorageConstants.currentChecklistItemId--;
    const item = {Name, Id:localStorageConstants.currentChecklistItemId, ChecklistId, Checked:false};
    localStorageConstants.createdChecklistItems= [...localStorageConstants.createdChecklistItems, item];
    storeConstants();
    return item;
}

function updateChecklistItem(item){
    if(item.Id > 0){
        localStorageConstants.updatedChecklistItems = [...localStorageConstants.updatedChecklistItems, item];
    }
    else{
        localStorageConstants.createdChecklists = localStorageConstants.createdChecklists.map(val => {
            if(val.Id === item.Id){
                return {...item}
            }
            return val
        })
    }
    storeConstants();
}

function deleteChecklistItem(id){
    if(id > 0){
        localStorageConstants.deletedChecklistItems = [...localStorageConstants.deletedChecklistItems, id];
    }
    else{
        localStorageConstants.createdCheckListItems.filter(val => val.Id !== id);
    }
    storeConstants();
}


function retrieveAccountConfig(){
    const state = retrieveState();
    return state ? state.accountConfig : null;
}

module.exports = {
    storeStateLocally,
    retrieveState,
    retrieveChecklists,

    addChecklist,
    updateChecklist,
    deleteChecklist,


    retrieveChecklistItems,
    addChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,

    retrieveAccountConfig,

    retrieveConstants,
    storeConstants,
    clearConstants
}

