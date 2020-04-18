import Vue from 'vue';
import Vuex from 'vuex';

import {state} from './state';
import {getters} from './getters';
import {mutations, SET_DATABASE_SYNCING, SET_IS_DATABASE_SYNCED} from './mutations';
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

export async function syncWithDatabase(){
    // When syncing with the database
    store.commit(SET_DATABASE_SYNCING, true);

    // retrieve Local constants
    const localConstants = storageService.retrieveConstants();

    let createdChecklists = localConstants.createdChecklists ? [...localConstants.createdChecklists] : [];
    let createdChecklistItems = localConstants.createdChecklistItems ? [...localConstants.createdChecklistItems] : [];

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
        console.log(localAccountConfig)
        await store.dispatch(constants.UPDATE_ACCOUNT_CONFIG, localAccountConfig);
    }
    

    // retrieve new checklists and items from database
    await store.dispatch(constants.RETRIEVE_CHECKLISTS);
    await store.dispatch(constants.RETRIEVE_CHECKLIST_ITEMS);
    await store.dispatch(constants.RETRIEVE_ACCOUNT_CONFIG);


    storageService.clearConstants();
    store.commit(SET_IS_DATABASE_SYNCED, true);
    setTimeout(() => {
        store.commit(SET_DATABASE_SYNCING, false);
    }, 2500);
}


export default store