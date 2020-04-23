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
    const localConstants = storageService.retrieveConstants();

    let createdChecklists = localConstants.createdChecklists;
    let createdChecklistItems = localConstants.createdChecklistItems;

    await Promise.all(
        createdChecklists.map(async checklist => {
            const items = createdChecklistItems.filter(item => item.ChecklistId === checklist.Id);
            return await Promise.all([
                store.dispatch(constants.SYNC_CHECKLIST_WITH_ITEMS, {checklist, items}),
                store.dispatch(constants.DELETE_CHECKLIST, checklist.Id)
            ]);
        })
    );

    await Promise.all(
        createdChecklistItems.filter(item => item.ChecklistId > 0).map(async item => await store.dispatch(constants.ADD_CHECKLIST_ITEM, {name:item.Name, checklistId:item.ChecklistId}))
    );


    // take "deletedChecklists" from localStorage and send delete requests for each of them
    let deletedChecklists = localConstants.deletedChecklists ? [...localConstants.deletedChecklists] : [];
    await Promise.all(
        deletedChecklists.map(async id => await store.dispatch(constants.DELETE_CHECKLIST, id))
    );


    // take "updatedChecklists" from localStorage and send put requests for each of them
    let updatedChecklists = localConstants.updatedChecklists ? [...localConstants.updatedChecklists] : [];
    await Promise.all(
        updatedChecklists.map(async checklist => await store.dispatch(constants.UPDATE_CHECKLIST, checklist))
    );
    

    // take "deletedChecklistItems" from localStorage and send delete requests for each of them
    let deletedChecklistItems = localConstants.deletedChecklistItems ? [...localConstants.deletedChecklistItems] : [];
    
    await Promise.all(
        deletedChecklistItems.map(async id => await store.dispatch(constants.DELETE_CHECKLIST_ITEM, id))
    );

    // take "updatedChecklistItems" from localStorage and send put requests for each of them
    let updatedChecklistItems = localConstants.updatedChecklistItems ? [...localConstants.updatedChecklistItems] : [];
    
    await Promise.all(
        updatedChecklistItems.map(item => store.dispatch(constants.UPDATE_CHECKLIST_ITEM, item))
    );

    // take accountConfig from stored state and send put request for it -- local account settings always beat out stored account settings
    const localAccountConfig = storageService.retrieveAccountConfig();
    if(localAccountConfig && localAccountConfig.themeName){
        await store.dispatch(constants.UPDATE_ACCOUNT_CONFIG, localAccountConfig);
    }
    


    // retrieve new checklists and items from database
    await Promise.all([
        store.dispatch(constants.RETRIEVE_CHECKLISTS),
        store.dispatch(constants.RETRIEVE_CHECKLIST_ITEMS),
        store.dispatch(constants.RETRIEVE_ACCOUNT_CONFIG)
    ]);

    let timeoutPeriod = 0;
    if(createdChecklistItems.length > 0 || createdChecklists.length > 0 || deletedChecklistItems.length > 0 || deletedChecklists.length > 0){
        timeoutPeriod = 1500;
    }

    storageService.clearConstants();
    store.commit(SET_IS_DATABASE_SYNCED, true);
    setTimeout(() => store.commit(SET_DATABASE_SYNCING, false), timeoutPeriod);
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