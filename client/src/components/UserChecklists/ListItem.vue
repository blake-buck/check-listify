<template>
    <div>
        <span v-if='!editingTitle'>{{checklist.Title}}</span>
        <input v-if='editingTitle' v-on:blur='blurInput' v-on:keyup='keyupInput' :value='checklist.Title'/>
        <button v-on:click='toggleEditingTitle'>Update</button>
        <button v-on:click='deleteChecklist(checklist.Id)'>Delete</button>
    </div>
</template>

<script>
const {constants} = require('../../store/actions');
const {UPDATE_CHECKLIST, DELETE_CHECKLIST} = constants;
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

        deleteChecklist(id){
            this.$store.dispatch(DELETE_CHECKLIST, id)
        }
    }
}
</script>