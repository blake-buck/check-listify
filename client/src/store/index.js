import Vue from 'vue'
import Vuex from 'vuex';

import request from '../utils/request';
import {getBaseUrl} from '../utils/getBaseUrl';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        checklists:[

        ]
    },
    getters:{
        getChecklists: state => state.checklists
    },
    mutations:{
        setChecklists(state, checklists){
            state.checklists = [...checklists];
        },
        addChecklist(state, checklist){
            state.checklists = [...state.checklists, checklist];
        }
    }, 
    actions:{
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
})

export default store