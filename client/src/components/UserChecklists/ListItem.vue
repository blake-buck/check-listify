<template>
    <div>
        
        <div class='display-elements' v-on:touchstart='handleTouchStart' v-on:touchend='handleTouchEnd'>
            <span v-if='checklist.Pinned'>---->  </span>
            <block-list-item v-if='!editingTitle' :clickHandler='() => navigateToChecklist(checklist.Id)' :displayText='checklist.Title'></block-list-item>
            <block-input :shouldAutofocus='true' v-if='editingTitle' :blurHandler='blurInput' :keyupHandler='keyupInput' :value='checklist.Title'></block-input>
            
            <div class='action-buttons' v-bind:class='{displayActionButtons}'>
                <block-button :clickHandler='toggleListIsPinned' displayText='Pin'></block-button>
                <block-button :clickHandler='update' displayText='Update'></block-button>
                <block-button :clickHandler='() => deleteChecklist(checklist.Id)' displayText='Delete'></block-button>
            </div>
        </div>
           
    </div>
</template>

<style scoped>
    .display-elements{
        position:relative;
        display:flex;
        min-height:50px;

        overflow:hidden;
    }

    .action-buttons{
        border:1px solid black;
        position:absolute;

        display:flex;

        min-height:50px;
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
        width:100%;
    }
    .action-buttons button:last-of-type{
        background:red;
    }
    .action-buttons button:first-of-type{
        background:green;
    }
    .action-buttons button:nth-last-of-type(2){
        background:goldenrod;
    }
</style>

<script>
const {constants} = require('../../store/actions');
const {UPDATE_CHECKLIST, DELETE_CHECKLIST} = constants;
const {navigateTo} = require('../../utils/router');
export default {
    name:'ListItem',
    props:[
        'checklist'
    ],
    data(){
        return{
            editingTitle:false,

            touchStart:0,
            displayActionButtons:false
        }
    },
    methods:{
        update(){
            this.editTitle();
            this.hideActionButtons();
        },

        // These functions are used instead of a toggleFunction -> for whatever reason when enter is pressed
        // while chrome is emulating mobile, the event is fired twice, making a toggle go from true => false => true

        // set editing title to true
        editTitle(){
            this.editingTitle = true;
        },
        
        // set editing title to false
        finishEditingTitle(){
            this.editingTitle = false;
        },

        showActionButtons(){
            this.displayActionButtons = true;
        },
        hideActionButtons(){
            this.displayActionButtons = false;
        },

        navigateToChecklist(id){
            navigateTo(`/user/checklist/${id}`);
        },

        keyupInput(e){
            if(e.key === 'Enter'){
                this.blurInput(e);
            }
        },

        blurInput(e){
            if(e.target.value !== ''){
                this.$store.dispatch(UPDATE_CHECKLIST, {...this.checklist, Title:e.target.value});
                this.finishEditingTitle();
            }
        },

        toggleListIsPinned(){
            this.$store.dispatch(UPDATE_CHECKLIST, {...this.checklist, Pinned:!this.checklist.Pinned});
        },

        deleteChecklist(id){
            this.$store.dispatch(DELETE_CHECKLIST, id);
        },

        handleTouchStart(e){
            this.touchStart = e.touches[0].clientX;
        },
        handleTouchEnd(e){
            if(this.touchStart > e.changedTouches[0].clientX){
                this.showActionButtons();
            }

            if(this.touchStart < e.changedTouches[0].clientX){
                this.hideActionButtons();
            }
        }
    }
}
</script>