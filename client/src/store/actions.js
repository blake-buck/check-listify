import {
    M_ADD_CHECKLIST, SET_CHECKLISTS, M_UPDATE_CHECKLIST, M_DELETE_CHECKLIST, SET_CHECKLIST_ITEMS, 
    M_ADD_CHECKLIST_ITEM, M_UPDATE_CHECKLIST_ITEM, M_DELETE_CHECKLIST_ITEM, SET_ACCOUNT_CONFIG, 
    M_UPDATE_ACCOUNT_CONFIG
} from './mutations';

const appService = require('./service');
const {navigateTo} = require('../utils/router');

export const constants = {
    RETRIEVE_CHECKLISTS:'retrieveChecklists',
    ADD_CHECKLIST:'addChecklist',
    UPDATE_CHECKLIST:'UPDATE_CHECKLIST',
    DELETE_CHECKLIST:'deleteChecklist',
    
    RETRIEVE_CHECKLIST_ITEMS:'RETRIEVE_CHECKLIST_ITEMS',
    ADD_CHECKLIST_ITEM:'ADD_CHECKLIST_ITEM',
    UPDATE_CHECKLIST_ITEM:'UPDATE_CHECKLIST_ITEM',
    DELETE_CHECKLIST_ITEM:'DELETE_CHECKLIST_ITEM',

    RETRIEVE_ACCOUNT_CONFIG:'RETRIEVE_ACCOUNT_CONFIG',
    UPDATE_ACCOUNT_CONFIG:'UPDATE_ACCOUNT_CONFIG',
}

function actionCreator(response, goodRequest, badRequest){
    if(response.status === 200){
        goodRequest(response);
    }
    else if(response.status === 401){
        localStorage.clear('jwt');
        navigateTo('/');
    }
    else{
        if(badRequest){
            badRequest(response);
        }
    }
}
export default {
    
    
    async [constants.RETRIEVE_CHECKLISTS](context){
        actionCreator(
            await appService.retrieveChecklists(),
            (response) => context.commit(SET_CHECKLISTS, response.results),
            (response) => console.log('ERROR ', response)
        )
    },
    async [constants.ADD_CHECKLIST](context, title){
        // if checklist is successfully added to database, push the added item to checklists in store
            // message returns an array of responses, the first from inserting the checklist, the second an array of checklists from SELECT
            // response.message[1][0] takes the first element out of the second array
        
        // if checklist isn't successfully added to database e.g. user is offline
            // get userId from stored JWT
            // assign a negative Id to checklist, pinned: false
            // push checklist to localStorage array that will be synced with database once they go back online
            // push checklist to store
        actionCreator(
            await appService.addChecklist(title),
            (response) => context.commit(M_ADD_CHECKLIST, response.message[1][0]),
            (response) => console.log('ERROR ', response)
        )
        
    },

    async [constants.UPDATE_CHECKLIST](context, item){
        actionCreator(
            await appService.updateChecklist(item),
            (response) => context.commit(M_UPDATE_CHECKLIST, item)
        )
    },

    async [constants.DELETE_CHECKLIST](context, id){
        actionCreator(
            await appService.deleteChecklist(id),
            (response) => context.commit(M_DELETE_CHECKLIST, id)
        )
    },

    async [constants.RETRIEVE_CHECKLIST_ITEMS](context){
        actionCreator(
            await appService.retrieveChecklistItems(),
            (response) => context.commit(SET_CHECKLIST_ITEMS, response.items)
        )
    },

    async [constants.ADD_CHECKLIST_ITEM](context, {name, checklistId}){
        actionCreator(
            await appService.addChecklistItem(name, checklistId),
            (response) => context.commit(M_ADD_CHECKLIST_ITEM, response.message[1][0])
        )
    },

    async [constants.UPDATE_CHECKLIST_ITEM](context, item){
        actionCreator(
            await appService.updateChecklistItem(item.Id, {name:item.Name, checked:item.Checked}),
            (response) => context.commit(M_UPDATE_CHECKLIST_ITEM, item)
        )
    },

    async [constants.DELETE_CHECKLIST_ITEM](context, itemId){
        actionCreator(
            await appService.deleteChecklistItem(itemId),
            (response) => context.commit(M_DELETE_CHECKLIST_ITEM, itemId)
        )
    },

    async [constants.RETRIEVE_ACCOUNT_CONFIG](context){
        actionCreator(
            await appService.retrieveAccountConfig(),
            (response) => context.commit(SET_ACCOUNT_CONFIG, response.accountConfig[0])
        )
    },

    async [constants.UPDATE_ACCOUNT_CONFIG](context, config){
        actionCreator(
            await appService.updateAccountConfig(accountConfigToNumber(config)),
            (response) => context.commit(M_UPDATE_ACCOUNT_CONFIG, config)
        )
    }

}

function accountConfigToNumber(config){
    let newConfig = {};
    for(let key in config){
        newConfig[key] = config[key];
        if(key !== 'ThemeId' && key !=='themeName'){
            newConfig[key] = config[key] ? 1 : 0;
        }
    }
    return newConfig;
}