<template>
    <div v-if='checklist'>
        <h1>{{checklist.Title}}</h1>
        <ChecklistItem v-for='item in items' :key='item.Id' v-bind:item='item'></ChecklistItem>
        <block-input v-if='addingNewItem' :keyupHandler="($event) => keyupInput($event)" :blurHandler="($event) => blurInput($event)" placeholder='New Checklist Item'></block-input>
        <block-fab v-if='!addingNewItem' :clickHandler='toggleAddingNewItem' displayText='Add Item'></block-fab>
    </div>
</template>

<script>
const {constants} = require('../../store/actions');
const {RETRIEVE_CHECKLISTS, RETRIEVE_CHECKLIST_ITEMS, ADD_CHECKLIST_ITEM, DELETE_CHECKLIST_ITEM} = constants;
import ChecklistItem from './ChecklistItem';
export default {
    name:'Checklist',
    
    components:{
        ChecklistItem
    },

    data(){
        return {
            addingNewItem:false
        }
    },

    computed:{
        checklistId(){
            return +window.location.pathname.split('/').pop();
        },
        checklist(){ 
            return this.$store.getters.getChecklistById(this.checklistId); 
        },
        items(){
            return this.$store.getters.getItemsForChecklist(this.checklistId);     
        }
    },

    methods:{
        toggleAddingNewItem(){
            this.addingNewItem = !this.addingNewItem;
        },
        blurInput(e){
             // if the user hasn't typed anything in the input field prevent the input from blurring
            if(e.target.value === ''){
                e.preventDefault();
            }
            else{
                this.addItem(e.target.value)
            }
        },
        keyupInput(e){
            if(e.key === 'Enter' && e.target.value !== ''){
                this.blurInput(e);
            }
        },

        addItem(name){
            this.$store.dispatch(ADD_CHECKLIST_ITEM, {name, checklistId: this.checklistId});
            this.toggleAddingNewItem();
        },
        
    }
}
</script>