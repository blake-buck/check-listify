module.exports = {
    getters:{
        getChecklists: state => state.checklists,
        getChecklistById: (state) => (id) => state.checklists.find(checklist => checklist.Id === id),

        getItemsForChecklist: (state) => (checklistId) => state.items.filter(item => item.ChecklistId === checklistId),

        getAccountConfig:state => state.accountConfig
    }
    
}