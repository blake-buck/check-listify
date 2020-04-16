const storageService = require('./storageService');

// store state locally after every mutation
const storeStateInLocalStorage = (store) => {
    store.subscribe((mutation, state) => {
        storageService.storeStateLocally(state);
    })
}

module.exports = {
    plugins:[
        storeStateInLocalStorage
    ]
}