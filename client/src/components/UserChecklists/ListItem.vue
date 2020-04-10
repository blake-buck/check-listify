<template>
    <div>
        <span v-if='checklist.Pinned'>---->  </span>
        <span v-if='!editingTitle' v-on:click='navigateToChecklist(checklist.Id)'>{{checklist.Title}}</span>
        <block-input v-if='editingTitle' :blurHandler='blurInput' :keyupHandler='keyupInput' :value='checklist.Title'></block-input>
        <block-button :clickHandler='toggleEditingTitle' displayText='Update'></block-button>
        <block-button :clickHandler='toggleListIsPinned' displayText='Pin List'></block-button>
        <block-button :clickHandler='() => deleteChecklist(checklist.Id)' displayText='Delete'></block-button>
    </div>
</template>

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
            editingTitle:false
        }
    },
    methods:{
        toggleEditingTitle(){
            this.editingTitle = !this.editingTitle;
        },

        navigateToChecklist(id){
            navigateTo(`/user/checklist/${id}`, this.$emit);
        },

        keyupInput(e){
            if(e.key === 'Enter'){
                this.blurInput(e);
            }
        },

        blurInput(e){
            if(e.target.value !== ''){
                this.toggleEditingTitle();
                this.$store.dispatch(UPDATE_CHECKLIST, {...this.checklist, Title:e.target.value});
            }
        },

        toggleListIsPinned(){
            this.$store.dispatch(UPDATE_CHECKLIST, {...this.checklist, Pinned:!this.checklist.Pinned});
        },

        deleteChecklist(id){
            this.$store.dispatch(DELETE_CHECKLIST, id);
        }
    }
}
</script>