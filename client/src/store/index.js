import Vue from 'vue';
import Vuex from 'vuex';

import {state} from './state';
import {getters} from './getters';
import {mutations} from './mutations';
import {plugins} from './plugins';
import actions , {constants} from './actions';
import storageService from './storageService';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations, 
    actions,
    plugins
});

function syncWithDatabase(){
    // When syncing with the database

    // retrieve new checklists and items from database

    // retrieve Local constants
    const localConstants = storageService.retrieveConstants();


    // take "deletedChecklists" from localStorage and send delete requests for each of them
    let deletedChecklists = localConstants.deletedChecklists ? [...localConstants.deletedChecklists] : [];
    deletedChecklists.forEach(id => {
        store.dispatch(constants.DELETE_CHECKLIST, id);
    })

    // take "updatedChecklists" from localStorage and send put requests for each of them
    let updatedChecklists = localConstants.updatedChecklists ? [...localConstants.updatedChecklists] : [];
    updatedChecklists.forEach(checklist => {
        store.dispatch(constants.UPDATE_CHECKLIST, checklist);
    })

    // take "createdChecklists" from localStorage and dispatch ADD_CHECKLIST for each of them
    let createdChecklists = localConstants.createdChecklists ? [...localConstants.createdChecklists] : [];
    createdChecklists.forEach(checklist => {
        store.dispatch(constants.ADD_CHECKLIST, checklist.Title);
        store.dispatch(constants.DELETE_CHECKLIST, checklist.Id)
    })

    // take "deletedChecklistsItems" from localStorage and send delete requests for each of them
    // take "updatedChecklistsItems" from localStorage and send put requests for each of them
    // take "createdChecklistsItems" from localStorage and send post requests for each of them

    // take accountConfig from stored state and send put request for it -- local account settings always beat out stored account settings

    storageService.clearConstants();
}

window.addEventListener('load', () => {
    if(navigator.onLine){
        syncWithDatabase();
    }
})

window.addEventListener('online', () => {
    syncWithDatabase();
})

export default store