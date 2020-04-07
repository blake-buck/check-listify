module.exports = {
    mutations:{
        SET_CHECKLISTS:'SET_CHECKLISTS',
        M_ADD_CHECKLIST:'M_ADD_CHECKLIST',
        
        setChecklists(state, checklists){
            state.checklists = [...checklists];
        },
        addChecklist(state, checklist){
            state.checklists = [...state.checklists, checklist];
        }
    }
}