import request from '../utils/request';
import {getBaseUrl} from '../utils/getBaseUrl';

export default {
    async retrieveChecklists(context){
        const response = await request.get(`${getBaseUrl()}/api/user/checklist`, true);
        let res = await response.json();
        console.log(res[0]);
        context.commit('setChecklists', res);
    },
    async addChecklist(context, checklist){
        // eventually this response will be used to determine error handling, but not for now
        const response = await request.post(`${getBaseUrl()}/api/user/checklist`, {title:checklist.title}, true);
        console.log(await response.text())
        context.commit('addChecklist', checklist);
    }
}