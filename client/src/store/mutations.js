const SET_CHECKLISTS = 'SET_CHECKLISTS';
const M_ADD_CHECKLIST = 'M_ADD_CHECKLIST';
const M_UPDATE_CHECKLIST = 'M_UPDATE_CHECKLIST';
const M_DELETE_CHECKLIST = 'M_DELETE_CHECKLIST';

module.exports = {
    SET_CHECKLISTS,
    M_ADD_CHECKLIST,
    M_UPDATE_CHECKLIST,
    M_DELETE_CHECKLIST,

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
        }
    }
}