import Vue from 'vue';
import Vuex from 'vuex';

import {state} from './state';
import {getters} from './getters';
import {mutations, SET_DATABASE_SYNCING, SET_IS_DATABASE_SYNCED} from './mutations';
import {plugins} from './plugins';
import actions , {constants} from './actions';
import storageService from './storageService';

const {navigateTo} = require('../utils/router');

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations, 
    actions,
    plugins
});

export async function syncWithDatabase(store){
    // When syncing with the database
    store.commit(SET_DATABASE_SYNCING, true);

    // retrieve Local constants
    console.log(storageService.retrieveConstants())
    const localConstants = storageService.retrieveConstants();
    console.log('LOCAL CONSTANTS ', localConstants);

    let createdChecklists = localConstants.createdChecklists;
    let createdChecklistItems = localConstants.createdChecklistItems;

    createdChecklists.forEach(async checklist => {
        const items = createdChecklistItems.filter(item => item.ChecklistId === checklist.Id);
        await store.dispatch(constants.SYNC_CHECKLIST_WITH_ITEMS, {checklist, items});
        await store.dispatch(constants.DELETE_CHECKLIST, checklist.Id);
    })

    createdChecklistItems.filter(item => item.ChecklistId > 0).forEach(item => {
        store.dispatch(constants.ADD_CHECKLIST_ITEM, {name:item.Name, checklistId:item.ChecklistId});
    })



    // take "deletedChecklists" from localStorage and send delete requests for each of them
    let deletedChecklists = localConstants.deletedChecklists ? [...localConstants.deletedChecklists] : [];
    deletedChecklists.forEach(async id => {
        await store.dispatch(constants.DELETE_CHECKLIST, id);
    });



    // take "updatedChecklists" from localStorage and send put requests for each of them
    let updatedChecklists = localConstants.updatedChecklists ? [...localConstants.updatedChecklists] : [];
    updatedChecklists.forEach(async checklist => {
        await store.dispatch(constants.UPDATE_CHECKLIST, checklist);
    });

    

    // take "deletedChecklistItems" from localStorage and send delete requests for each of them
    let deletedChecklistItems = localConstants.deletedChecklistItems ? [...localConstants.deletedChecklistItems] : [];
    deletedChecklistItems.forEach(id => {
        store.dispatch(constants.DELETE_CHECKLIST_ITEM, id);
    });



    // take "updatedChecklistItems" from localStorage and send put requests for each of them
    let updatedChecklistItems = localConstants.updatedChecklistItems ? [...localConstants.updatedChecklistItems] : [];
    updatedChecklistItems.forEach(async item => {
        await store.dispatch(constants.UPDATE_CHECKLIST_ITEM, item);
    });



    // take accountConfig from stored state and send put request for it -- local account settings always beat out stored account settings
    const localAccountConfig = storageService.retrieveAccountConfig();
    if(localAccountConfig && localAccountConfig.themeName){
        await store.dispatch(constants.UPDATE_ACCOUNT_CONFIG, localAccountConfig);
    }
    


    // retrieve new checklists and items from database
    await store.dispatch(constants.RETRIEVE_CHECKLISTS);
    await store.dispatch(constants.RETRIEVE_CHECKLIST_ITEMS);
    await store.dispatch(constants.RETRIEVE_ACCOUNT_CONFIG);



    storageService.clearConstants();
    console.log(storageService.retrieveConstants());
    store.commit(SET_IS_DATABASE_SYNCED, true);
    setTimeout(() => {
        store.commit(SET_DATABASE_SYNCING, false);
    }, 2500);
}

export function initializeSyncListeners(vm){

    window.addEventListener('offline', () => {
        store.commit(SET_IS_DATABASE_SYNCED, false);
    })

    // if user is in a checklist that was created offline, boot them to the checklists screen whenever
    // database is syncing
    window.addEventListener('online', () => {
        vm.$store.commit(SET_IS_DATABASE_SYNCED, true);

        const id = +window.location.pathname.split('/').pop();

        if(id && id < 0){
            navigateTo('/user');
        }

        syncWithDatabase(vm.$store);
    })

    window.addEventListener('load', () => {
        const id = +window.location.pathname.split('/').pop();

        if(navigator.onLine && id && id < 0){
            navigateTo('/user');
        }

    })
}


export default store