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

module.exports = {
    login,
    retrieveChecklists,
    addChecklist
}