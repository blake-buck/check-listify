module.exports = {
    getters:{
        getChecklists: state => state.checklists,
        getChecklistById: (state) => (id) => state.checklists.find(checklist => checklist.Id === id)
    }
    
}