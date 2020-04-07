import request from '../utils/request';
import {getBaseUrl} from '../utils/getBaseUrl';

export default {
    async retrieveChecklists(context){
        const response = await request.get(`${getBaseUrl()}/api/user/checklist`, true);
        context.commit('setChecklists', response);
    },
    async addChecklist(context, checklist){
        // eventually this response will be used to determine error handling, but not for now
        await request.post(`${getBaseUrl()}/api/user/checklist`, {title:checklist.Title}, true);
        context.commit('addChecklist', checklist);
    }
}