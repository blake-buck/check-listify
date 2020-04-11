<template>
    <div class='Checklist' v-if='checklist'>
        <header class='light'>
            <block-icon-button :clickHandler='toChecklists' icon='keyboard_backspace'></block-icon-button>
            <h1>{{checklist.Title}}</h1>
        </header>
        
        <transition-group name='list'>
            <ChecklistItem v-for='item in items' :key='item.Id' v-bind:item='item'></ChecklistItem>
        </transition-group>

        <transition name='fade'>
            <block-input v-if='addingNewItem' :shouldAutofocus='true' :keyupHandler="($event) => keyupInput($event)" :blurHandler="($event) => blurInput($event)" placeholder='New Checklist Item'></block-input>
        </transition>

        <transition name='fade'>
            <block-fab v-if='!addingNewItem' :clickHandler='toggleAddingNewItem' displayText='Add Item'></block-fab>
        </transition>
        
    </div>
</template>

<style scoped>

    .list-enter-active {
        transition: opacity 0.5s;
    }
    .list-leave-active{
        transition:all 0.5s;
        transform:translateX(60px);
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .fade-enter-active{
        transition: opacity .2s;
    }
    .fade-enter{
        opacity: 0;
    }

    @keyframes fadeIn{
        from {opacity: 0.4;}
        to   {opacity: 1;}
    }
    .Checklist{
        /* this gives extra breathing room so the fab doesn't obscure list items */
        padding-bottom:80px;
        animation:fadeIn 0.5s;
    }

    .ChecklistItem:first-of-type{
        border-top:1px solid gray;
    }

    header{
        display:flex;
        
        align-items: center;
    }

    header h1{
        font-size:1.5em;
        padding:5px;
        margin:5px;
    }

    header.light{
        background:lightgray;
    }
</style>

<script>
const {constants} = require('../../store/actions');
const {RETRIEVE_CHECKLISTS, RETRIEVE_CHECKLIST_ITEMS, ADD_CHECKLIST_ITEM, DELETE_CHECKLIST_ITEM} = constants;
const {navigateTo} = require('../../utils/router');
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
            if(this.addingNewItem){
                this.$store.dispatch(ADD_CHECKLIST_ITEM, {name, checklistId: this.checklistId});
                this.toggleAddingNewItem();
            }
        },

        toChecklists(){
            navigateTo('/user');
        }
        
    }
}
</script>