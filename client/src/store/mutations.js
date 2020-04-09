const SET_CHECKLISTS = 'SET_CHECKLISTS';
const M_ADD_CHECKLIST = 'M_ADD_CHECKLIST';
const M_UPDATE_CHECKLIST = 'M_UPDATE_CHECKLIST';
const M_DELETE_CHECKLIST = 'M_DELETE_CHECKLIST';

const SET_CHECKLIST_ITEMS = 'SET_CHECKLIST_ITEMS';
const M_ADD_CHECKLIST_ITEM = 'M_ADD_CHECKLIST_ITEM';
const M_DELETE_CHECKLIST_ITEM = 'M_DELETE_CHECKLIST_ITEM';

module.exports = {
    SET_CHECKLISTS,
    M_ADD_CHECKLIST,
    M_UPDATE_CHECKLIST,
    M_DELETE_CHECKLIST,

    SET_CHECKLIST_ITEMS,
    M_ADD_CHECKLIST_ITEM,
    M_DELETE_CHECKLIST_ITEM,

    mutations:{
        [SET_CHECKLISTS](state, checklists){
            state.checklists = [...checklists];
        },
        [M_ADD_CHECKLIST](state, checklist){
            state.checklists = [...state.checklists, checklist];
        },
        [M_UPDATE_CHECKLIST](state, updatedList){
            state.checklists = state.checklists.map(checklist => {
                if(checklist.Id === updatedList.Id){
                    return updatedList;
                }
                return checklist;
            })
        },
        [M_DELETE_CHECKLIST](state, id){
            state.checklists = [...state.checklists.filter(checklist => checklist.Id !== id)];
        },



        [SET_CHECKLIST_ITEMS](state, items){
            state.items = [...items];
        },
        [M_ADD_CHECKLIST_ITEM](state, item){
            state.items = [...state.items, item];
        },
        [M_DELETE_CHECKLIST_ITEM](state, id){
            state.items = state.items.filter(item => item.Id !== id);
        }
    }
}