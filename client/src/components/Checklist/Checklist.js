const {constants} = require('../../store/actions');
const {ADD_CHECKLIST_ITEM} = constants;
const {navigateTo} = require('../../utils/router');
const {blurHelper} = require('../../utils/blurHelper');
const {keyupHelper} = require('../../utils/keyupHelper');

import ChecklistItem from './ChecklistItem/ChecklistItem.vue';

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
        },

        accountConfig(){
            return this.$store.getters.getAccountConfig
        }
    },

    methods:{
        displayInput(){
            this.addingNewItem = true;
        },
        hideInput(){
            this.addingNewItem = false;
        },

        blurInput(e){
            blurHelper(
                e.target.value,
                () => this.addItem(e.target.value),
                () => this.hideInput()
            )
        },
        keyupInput(e){
            keyupHelper(
                e,
                () => this.blurInput(e)
            )
        },

        addItem(name){
            if(this.addingNewItem){
                this.$store.dispatch(ADD_CHECKLIST_ITEM, {name, checklistId: this.checklistId});
            }
        },

        toChecklists(){
            navigateTo('/user');
        }
        
    }
}