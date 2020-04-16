const storageService = require('./storageService');

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
            console.log('STORING STATE')
            storageService.storeStateLocally(JSON.stringify(state));
        }

        
    })
}

module.exports = {
    plugins:[
        storeStateInLocalStorage
    ]
}