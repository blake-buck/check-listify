import request from '../utils/request';
import {getBaseUrl} from '../utils/getBaseUrl';

async function login(username, password){
    return request.post(
        `${getBaseUrl()}/api/login`,
        {
            username,
            password
        }
    )
}

async function retrieveChecklists(){
    return request.get(`${getBaseUrl()}/api/user/checklist`, true);
}

async function addChecklist(title){
    return request.post(`${getBaseUrl()}/api/user/checklist`, {title}, true);
}

async function deleteChecklist(id){
    return request.delete(`${getBaseUrl()}/api/user/checklist/${id}`, true);
}

export {
    login,
    retrieveChecklists,
    addChecklist,
    deleteChecklist
}