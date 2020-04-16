import {
    M_ADD_CHECKLIST, SET_CHECKLISTS, M_UPDATE_CHECKLIST, M_DELETE_CHECKLIST, SET_CHECKLIST_ITEMS, 
    M_ADD_CHECKLIST_ITEM, M_UPDATE_CHECKLIST_ITEM, M_DELETE_CHECKLIST_ITEM, SET_ACCOUNT_CONFIG, 
    M_UPDATE_ACCOUNT_CONFIG
} from './mutations';

const appService = require('./service');
const storageService = require('./storageService');
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

async function actionCreator(onlineFunc, goodRequest, badRequest, offlineFunc){
    // If user is connected to a network they communicate with the server directly, no need to mess around with local storage
    if(navigator.onLine){
        const response = await onlineFunc();
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

    // // If user is offline, deal directly with localStorage
    if(!navigator.onLine){
        if(offlineFunc){
            offlineFunc();
        }
        else{
            goodRequest();
        }
    }
    
    
}
export default {
    
    
    async [constants.RETRIEVE_CHECKLISTS](context){
        actionCreator(
            () => appService.retrieveChecklists(),
            (response) => context.commit(SET_CHECKLISTS, response.results),
            (error) => console.log('ERROR ', error),
            
            () => {
                const response = storageService.retrieveChecklists();
                context.commit(SET_CHECKLISTS, response);
            }
        )
    },
    async [constants.ADD_CHECKLIST](context, title){
        actionCreator(
            () => appService.addChecklist(title),
            (response) => context.commit(M_ADD_CHECKLIST, response.message[1][0]),
            (error) => console.log('ERROR ', error),

            () => {
                const response = storageService.addChecklist(title);
                context.commit(M_ADD_CHECKLIST, response);
            }
        )
    },

    async [constants.UPDATE_CHECKLIST](context, item){
        actionCreator(
            () => appService.updateChecklist(item),
            () => context.commit(M_UPDATE_CHECKLIST, item),
            (error) => console.log('ERROR ', error),
            
            () => {
                storageService.updateChecklist(item);
                context.commit(M_UPDATE_CHECKLIST, item);
            }
        )
    },

    async [constants.DELETE_CHECKLIST](context, id){
        actionCreator(
            () => appService.deleteChecklist(id),
            () => context.commit(M_DELETE_CHECKLIST, id),
            (error) => console.log('ERROR ', error),

            () => {
                storageService.deleteChecklist(id);
                context.commit(M_DELETE_CHECKLIST, id)
            }
        )
    },

    async [constants.RETRIEVE_CHECKLIST_ITEMS](context){
        actionCreator(
            () => appService.retrieveChecklistItems(),
            (response) => context.commit(SET_CHECKLIST_ITEMS, response.items),
            (error) => console.log('ERROR ', error),

            () => {
                const response = storageService.retrieveChecklistItems();
                console.log("CHECKLIST ITEMS ", response);
                context.commit(SET_CHECKLIST_ITEMS, response);
            }
        )
    },

    async [constants.ADD_CHECKLIST_ITEM](context, {name, checklistId}){
        actionCreator(
            () => appService.addChecklistItem(name, checklistId),
            (response) => context.commit(M_ADD_CHECKLIST_ITEM, response.message[1][0]),
            (error) => console.log('ERROR ', error),

            () => {
                const response = storageService.addChecklistItem(name, checklistId);
                context.commit(M_ADD_CHECKLIST_ITEM, response);
            }
        )
    },

    async [constants.UPDATE_CHECKLIST_ITEM](context, item){
        actionCreator(
            () => appService.updateChecklistItem(item.Id, {name:item.Name, checked:item.Checked}),
            () => context.commit(M_UPDATE_CHECKLIST_ITEM, item),
            (error) => console.log('ERROR ', error),

            () => {
                storageService.updateChecklistItem(item);
                context.commit(M_UPDATE_CHECKLIST_ITEM, item);
            }
        )
    },

    async [constants.DELETE_CHECKLIST_ITEM](context, itemId){
        actionCreator(
            () => appService.deleteChecklistItem(itemId),
            () => context.commit(M_DELETE_CHECKLIST_ITEM, itemId),
            (error) => console.log('ERROR ', error),

            () => {
                storageService.deleteChecklistItem(itemId);
                context.commit(M_DELETE_CHECKLIST_ITEM, itemId);
            }
        )
    },

    async [constants.RETRIEVE_ACCOUNT_CONFIG](context){
        actionCreator(
            () => appService.retrieveAccountConfig(),
            (response) => context.commit(SET_ACCOUNT_CONFIG, response.accountConfig[0]),
            (error) => console.log('ERROR ', error),

            () => {
                const response = storageService.retrieveAccountConfig();
                context.commit(SET_ACCOUNT_CONFIG, response);
            }
        )
    },

    async [constants.UPDATE_ACCOUNT_CONFIG](context, config){
        actionCreator(
            () => appService.updateAccountConfig(accountConfigToNumber(config)),
            () => context.commit(M_UPDATE_ACCOUNT_CONFIG, config),
            (error) => console.log('ERROR ', error)
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