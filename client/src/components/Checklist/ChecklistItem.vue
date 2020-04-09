<template>
    <div>
        <span v-if='!displayInput'>{{item.Name}}</span>
        <input v-if='displayInput' :value='item.Name' v-on:blur='blurInput' v-on:keyup='keyupInput' placeholder='Checklist title' />
        <button v-if='!displayInput' v-on:click='toggleInput'>Edit Checklist</button>
        <button v-on:click='deleteItem(item.Id)'>Delete</button>
    </div>
</template>

<script>
const {constants} = require('../../store/actions');
const {DELETE_CHECKLIST_ITEM, UPDATE_CHECKLIST_ITEM} = constants;
export default {
    name:'ChecklistItem',
    props:[
        'item'
    ],
    data(){
        return{
            displayInput:false,
        }
    },
    methods:{
        deleteItem(id){
            this.$store.dispatch(DELETE_CHECKLIST_ITEM, id);
        },

        editItem(updatedItem){
            this.$store.dispatch(UPDATE_CHECKLIST_ITEM, {...this.item, ...updatedItem});
        },

        toggleInput(){
            this.displayInput = !this.displayInput;
        },
        blurInput(e){
             // if the user hasn't typed anything in the input field prevent the input from blurring
            if(e.target.value === ''){
                e.preventDefault();
            }
            else{
                this.editItem({Name:e.target.value});
                this.toggleInput();
            }
        },
        keyupInput(e){
            if(e.key === 'Enter' && e.target.value !== ''){
                this.blurInput(e);
            }
        },
    }
}
</script>