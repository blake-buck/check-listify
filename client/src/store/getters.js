module.exports = {
    getters:{
        getChecklists: state => state.checklists,
        getChecklistsLoaded: state => state.checklistsLoaded,
        getChecklistById: (state) => (id) => state.checklists.find(checklist => checklist.Id === id),

        getItems: state => state.items,
        getItemsLoaded: state => state.itemsLoaded,
        getItemsForChecklist: (state) => (checklistId) => state.items.filter(item => item.ChecklistId === checklistId),

        getAccountConfig:state => state.accountConfig,
        getAccountConfigLoaded: state => state.accountConfigLoaded,
        
        getDatabaseSyncing: state => state.databaseSyncing
    }
    
}