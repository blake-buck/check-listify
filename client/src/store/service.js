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

async function register(username, password){
    return request.post(
        `${getBaseUrl()}/api/register`,
        {username, password}
    )
}

async function forgotPassword(username){
    return request.post(
        `${getBaseUrl()}/api/forgot-password`,
        {username}
    )
}

async function confirmForgotPassword(username, confirmationCode, password){
    return request.post(
        `${getBaseUrl()}/api/forgot-password/confirm`,
        {username, confirmationCode, password}
    )
}

async function changePassword(previousPassword, proposedPassword){
    return request.post(`${getBaseUrl()}/api/change-password`, {previousPassword, proposedPassword}, true);
}

async function deleteAccount(){
    return request.delete(`${getBaseUrl()}/api/delete-account`, true);
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

async function updateChecklistItem(itemId, body){
    return request.put(`${getBaseUrl()}/api/user/checklist/item/${itemId}`, body, true);
}

async function deleteChecklistItem(itemId){
    return request.delete(`${getBaseUrl()}/api/user/checklist/item/${itemId}`, true);
}

async function retrieveAccountConfig(){
    return request.get(`${getBaseUrl()}/api/user/account`, true);
}

async function updateAccountConfig(config){
    return request.put(`${getBaseUrl()}/api/user/account`, config, true);
}

export {
    login,
    register,
    changePassword,
    deleteAccount,

    forgotPassword,
    confirmForgotPassword,

    retrieveChecklists,
    addChecklist,
    updateChecklist,
    deleteChecklist,

    retrieveChecklistItems,
    addChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,

    retrieveAccountConfig,
    updateAccountConfig
}