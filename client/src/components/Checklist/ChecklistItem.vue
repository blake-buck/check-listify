<template>
    <div class='ChecklistItem' v-on:click='toggleComplete' v-on:touchstart='handleTouchStart' v-on:touchend='handleTouchEnd'>

        <div class='display-elements' v-bind:class='{complete:item.Checked}'>

            <block-list-item v-if='!displayInput' :displayText='item.Name'></block-list-item>
            <block-input v-if='displayInput' :value='item.Name' :shouldAutofocus='true' :keyupHandler="($event) => keyupInput($event)" :blurHandler="($event) => blurInput($event)" placeholder='Checklist Item'></block-input>
            
            <div class='action-buttons'  v-bind:class='{displayActionButtons}'>
                <block-button v-if='!displayInput' :clickHandler='toggleInput' displayText='Edit'></block-button>
                <block-button :clickHandler='() => deleteItem(item.Id)' displayText='Delete'></block-button>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
    .ChecklistItem{
        border-bottom:1px solid gray;
    }
    .display-elements{
        position:relative;
        display:flex;
        align-items:center;
        min-height:50px;

        overflow:hidden;
    }

    .display-elements.complete{
        text-decoration: line-through;
        opacity:0.8;
    }

    .action-buttons{
        position:absolute;

        display:flex;

        min-height:50px;
        height:100%;
        width:200px;

        top:0px;
        right:-202px;
        transition:0.25s;
        
    } 
    .action-buttons.displayActionButtons{
        right:0px;
        transition:0.25s;
    } 
    .action-buttons button{
        min-height:50px;
        height:100%;
        width:100%;
        border:1px solid black;
    }
    .action-buttons button:first-of-type{
        background:goldenrod;
    }
    .action-buttons button:last-of-type{
        background:red;
    }
</style>

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
            displayActionButtons:false,
            
            touchStartX:0,
            touchStartY:0
        }
    },
    methods:{

        showActionButtons(){
            this.displayActionButtons = true;
        },
        hideActionButtons(){
            this.displayActionButtons = false;
        },

        toggleComplete(){
            this.$store.dispatch(UPDATE_CHECKLIST_ITEM, {...this.item, Checked:!this.item.Checked});
        },

        deleteItem(id){
            this.$store.dispatch(DELETE_CHECKLIST_ITEM, id);
            this.hideActionButtons();
        },

        editItem(updatedItem){
            if(this.displayInput){
                this.$store.dispatch(UPDATE_CHECKLIST_ITEM, {...this.item, ...updatedItem});
                this.toggleInput();
            }
        },

        toggleInput(){
            this.displayInput = !this.displayInput;
            this.hideActionButtons();
        },
        blurInput(e){
             // if the user hasn't typed anything in the input field prevent the input from blurring
            if(e.target.value === ''){
                e.preventDefault();
            }
            else{
                this.editItem({Name:e.target.value});
                
            }
        },
        keyupInput(e){
            if(e.key === 'Enter' && e.target.value !== ''){
                this.blurInput(e);
            }
        },


        handleTouchStart(e){
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        },
        handleTouchEnd(e){
            // if the users Y scroll moves more than 50px, they are likely scrolling the page and not trying to show/hide action buttons
            if(this.touchStartX > e.changedTouches[0].clientX && Math.abs(this.touchStartY - e.changedTouches[0].clientY) <= 50){
                this.showActionButtons();
            }

            if(this.touchStartX < e.changedTouches[0].clientX && Math.abs(this.touchStartY - e.changedTouches[0].clientY) <= 50){
                this.hideActionButtons();
            }
        }
    }
}
</script>