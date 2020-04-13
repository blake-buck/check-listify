import {
    M_ADD_CHECKLIST, SET_CHECKLISTS, M_UPDATE_CHECKLIST, M_DELETE_CHECKLIST, SET_CHECKLIST_ITEMS, 
    M_ADD_CHECKLIST_ITEM, M_UPDATE_CHECKLIST_ITEM, M_DELETE_CHECKLIST_ITEM, SET_ACCOUNT_CONFIG, 
    M_UPDATE_ACCOUNT_CONFIG
} from './mutations';

const appService = require('./service');

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
export default {
    
    
    async [constants.RETRIEVE_CHECKLISTS](context){
        const response = await appService.retrieveChecklists();
        if(response.status === 200){
            context.commit(SET_CHECKLISTS, response.results);
        }

        if(response.status === 400){
            console.log('ERROR', response);
        }
        
    },
    async [constants.ADD_CHECKLIST](context, title){
        const response = await appService.addChecklist(title);
        
        // if checklist is successfully added to database, push the added item to checklists in store
        if(response.status === 200){
            // message returns an array of responses, the first from inserting the checklist, the second an array of checklists from SELECT
            // response.message[1][0] takes the first element out of the second array
            context.commit(M_ADD_CHECKLIST, response.message[1][0]);
        }
        
        // if checklist isn't successfully added to database e.g. user is offline
        if(response.status === 400){
            // get userId from stored JWT
            // assign a negative Id to checklist, pinned: false
            // push checklist to localStorage array that will be synced with database once they go back online
            // push checklist to store
        }

    },

    async [constants.UPDATE_CHECKLIST](context, item){
        const response = await appService.updateChecklist(item);

        if(response.status === 400){
            // get userId from stored JWT
            // push checklist to localStorage array that will be synced with database once they go back online
            // push checklist to store
        }

        context.commit(M_UPDATE_CHECKLIST, item);
    },

    async [constants.DELETE_CHECKLIST](context, id){
        const response = await appService.deleteChecklist(id);
        
        // if checklist isn't successfully deleted e.g. user is offline
        if(response.status === 400){
            // push checklist id into a localStorage array that will by synced with database once user is back online
        }

        // remove checklist form store
        context.commit(M_DELETE_CHECKLIST, id);
    },

    async [constants.RETRIEVE_CHECKLIST_ITEMS](context){
        const response = await appService.retrieveChecklistItems();

        if(response.status === 200){
            context.commit(SET_CHECKLIST_ITEMS, response.items)
        }
    },

    async [constants.ADD_CHECKLIST_ITEM](context, {name, checklistId}){
        const response = await appService.addChecklistItem(name, checklistId);

        if(response.status === 200){
            console.log(response);
            context.commit(M_ADD_CHECKLIST_ITEM, response.message[1][0]);
        }

        if(response.status === 400){
            console.log(response);
        }
    },

    async [constants.UPDATE_CHECKLIST_ITEM](context, item){
        const response = await appService.updateChecklistItem(item.Id, {name:item.Name, checked:item.Checked});

        if(response.status !== 200){
            console.log(response);
        }

        context.commit(M_UPDATE_CHECKLIST_ITEM, item);

    },

    async [constants.DELETE_CHECKLIST_ITEM](context, itemId){
        const response = await appService.deleteChecklistItem(itemId);

        if(response.status === 200){
            context.commit(M_DELETE_CHECKLIST_ITEM, itemId);
        }

        if(response.status === 400){
            console.log(response);
        }
    },

    async [constants.RETRIEVE_ACCOUNT_CONFIG](context){
        const response = await appService.retrieveAccountConfig();
        if(response.status === 200){
            context.commit(SET_ACCOUNT_CONFIG, response.accountConfig[0])
        }
        else{
            console.log(response);
        }
    },

    async [constants.UPDATE_ACCOUNT_CONFIG](context, config){
        const response = await appService.updateAccountConfig(accountConfigToNumber(config));
        context.commit(M_UPDATE_ACCOUNT_CONFIG, config);
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