module.exports = {
    SET_CHECKLISTS:'setChecklists',
    M_ADD_CHECKLIST:'addChecklist',
    mutations:{
        setChecklists(state, checklists){
            state.checklists = [...checklists];
        },
        addChecklist(state, checklist){
            state.checklists = [...state.checklists, checklist];
        }
    }
}