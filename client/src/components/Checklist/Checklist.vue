<template>
    <div v-if='checklist'>
        <h1>{{checklist.Title}}</h1>
        <h3>Checklist {{checklist.Id}}</h3>
        <p v-for='item in items' :key='item.Id'>{{item.Name}}</p>
    </div>
</template>

<script>
const {constants} = require('../../store/actions');
const {RETRIEVE_CHECKLISTS} = constants;
export default {
    name:'Checklist',
    computed:{
        checklistId(){
            return +window.location.pathname.split('/').pop();
        },
        checklist(){
            if(this.$store.getters.getChecklists){
                return this.$store.getters.getChecklistById(this.checklistId);
            } 
        },
        items(){
            if(this.$store.getters.getItemsForChecklist(this.checklistId)){
                return this.$store.getters.getItemsForChecklist(this.checklistId);
            }
        }
    },
    created(){
        // todo: move to route guard
        this.$store.dispatch(RETRIEVE_CHECKLISTS);
    }
}
</script>