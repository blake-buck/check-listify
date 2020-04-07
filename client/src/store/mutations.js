module.exports = {
    mutations:{
        setChecklists(state, checklists){
            state.checklists = [...checklists];
        },
        addChecklist(state, checklist){
            state.checklists = [...state.checklists, checklist];
        }
    }
}