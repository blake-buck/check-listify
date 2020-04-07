import {M_ADD_CHECKLIST, SET_CHECKLISTS} from './mutations';

import appService from './service';

export const constants = {
    RETRIEVE_CHECKLISTS:'retrieveChecklists',
    ADD_CHECKLIST:'addChecklist',
}
export default {
    
    
    async retrieveChecklists(context){
        const response = await appService.retrieveChecklists();
        context.commit(SET_CHECKLISTS, response);
    },
    async addChecklist(context, title){
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

    }
}