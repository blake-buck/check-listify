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

async function updateChecklist(item){
    const {Id, Pinned, Title} = item;
    return request.put(`${getBaseUrl()}/api/user/checklist/${Id}`, {pinned:Pinned, title:Title}, true);
}

async function deleteChecklist(id){
    return request.delete(`${getBaseUrl()}/api/user/checklist/${id}`, true);
}



async function retrieveChecklistItems(){
    return request.get(`${getBaseUrl()}/api/user/checklist/item`, true);
}

async function addChecklistItem(name, checklistId){
    return request.post(`${getBaseUrl()}/api/user/checklist/${checklistId}/item`, {name}, true);
}

async function deleteChecklistItem(itemId){
    return request.delete(`${getBaseUrl()}/api/user/checklist/item/${itemId}`)
}

export {
    login,

    retrieveChecklists,
    addChecklist,
    updateChecklist,
    deleteChecklist,

    retrieveChecklistItems,
    addChecklistItem,
    deleteChecklistItem
}