const {constants} = require('../../store/actions');
const {ADD_CHECKLIST_ITEM} = constants;
const {navigateTo} = require('../../utils/router');
import ChecklistItem from './ChecklistItem/ChecklistItem';
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