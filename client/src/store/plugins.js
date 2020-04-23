const storageService = require('./storageService');
const {M_ADD_CHECKLIST, M_ADD_CHECKLIST_ITEM, SET_ACCOUNT_CONFIG, M_UPDATE_ACCOUNT_CONFIG} = require('./mutations');
const {scrollToBottom} = require('../utils/scrollToBottom');

// store state locally after every mutation
const storeStateInLocalStorage = (store) => {

    store.subscribe((mutation, state) => {
        // if the user is offline and the set actions are being called, dont overwrite local state
        // localStorage: checklists:[2items], items:[3items]
        // SET_CHECKLISTS
        // localStorage: checklists:[2items], items:[]
        if(mutation.type.includes('SET_') && !navigator.onLine){
            // do nothing -- this empty if statement should get replaced eventually
        }
        else{
            storageService.storeStateLocally(JSON.stringify(state));
        }

        
    })
}

const scrollAfterAddingListItem = store => {
    store.subscribe((mutation) => {
        switch(mutation.type){
            case M_ADD_CHECKLIST:
            case M_ADD_CHECKLIST_ITEM:

                // scrollToBottom();
                setTimeout(() => scrollToBottom(), 250);
                break;
            default:
                break;
        }
    })
}

const applyClassToPageBody = store => {
    store.subscribe((mutation) => {

        switch(mutation.type){

            case M_UPDATE_ACCOUNT_CONFIG:
            case SET_ACCOUNT_CONFIG:
                document.body.className = mutation.payload.themeName;
                break;
                
            default:
                break;
        }

    })
}

module.exports = {
    plugins:[
        storeStateInLocalStorage,
        scrollAfterAddingListItem,
        applyClassToPageBody
    ]
}