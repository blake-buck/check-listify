import request from '../utils/request';
import {getBaseUrl} from '../utils/getBaseUrl';
import {M_ADD_CHECKLIST, SET_CHECKLISTS} from './mutations';

export default {
    RETRIEVE_CHECKLISTS:'RETRIEVE_CHECKLISTS',
    ADD_CHECKLIST:'ADD_CHECKLIST',
    
    async retrieveChecklists(context){
        const response = await request.get(`${getBaseUrl()}/api/user/checklist`, true);
        context.commit(SET_CHECKLISTS, response);
    },
    async addChecklist(context, checklist){
        // eventually this response will be used to determine error handling, but not for now
        await request.post(`${getBaseUrl()}/api/user/checklist`, {title:checklist.Title}, true);
        context.commit(M_ADD_CHECKLIST, checklist);
    }
}