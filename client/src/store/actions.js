import request from '../utils/request';
import {getBaseUrl} from '../utils/getBaseUrl';
import {M_ADD_CHECKLIST, SET_CHECKLISTS} from './mutations';

export const constants = {
    RETRIEVE_CHECKLISTS:'retrieveChecklists',
    ADD_CHECKLIST:'addChecklist',
}
export default {
    
    
    async retrieveChecklists(context){
        const response = await request.get(`${getBaseUrl()}/api/user/checklist`, true);
        context.commit(SET_CHECKLISTS, response);
    },
    async addChecklist(context, title){
        const response = await request.post(`${getBaseUrl()}/api/user/checklist`, {title}, true);
        
        // if checklist is successfully added to database, push the added item to checklists in store
        if(response.status === 200){
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