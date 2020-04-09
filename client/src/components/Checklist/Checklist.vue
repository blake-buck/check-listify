<template>
    <div v-if='checklist'>
        <h1>{{checklist.Title}}</h1>
        <ChecklistItem v-for='item in items' :key='item.Id' v-bind:item='item'></ChecklistItem>
        <input v-if='addingNewItem' v-on:blur='blurInput' v-on:keyup='keyupInput' placeholder='New Checklist Item' />
        <button v-if='!addingNewItem' v-on:click='toggleAddingNewItem()'>Add Item</button>
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
        
    },

    created(){
        // todo: move to route guard
        this.$store.dispatch(RETRIEVE_CHECKLISTS);
        this.$store.dispatch(RETRIEVE_CHECKLIST_ITEMS);
    }
}
</script>