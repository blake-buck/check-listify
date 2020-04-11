const {constants} = require('../../store/actions');
const {ADD_CHECKLIST} = constants;
const {navigateTo} = require('../../utils/router');

import ListItem  from './ListItem.vue';

export default {
    name:'UserChecklists',
    components:{
        ListItem
    },
    computed:{
        checklists(){
            return this.$store.getters.getChecklists.filter(list => !list.Pinned)
        },
        pinnedChecklists(){
            return this.$store.getters.getChecklists.filter(list => list.Pinned)
        }
    },
    data(){
        return {
            displayChecklistTemplate:false
        }
    },
    methods:{

        showChecklistTemplate(){
            this.displayChecklistTemplate = true;
        },
        hideChecklistTemplate(){
            this.displayChecklistTemplate = false;
        },
        blurChecklist(e){
             // if the user hasn't typed anything in the input field prevent the input from blurring
            if(e.target.value === ''){
                e.preventDefault();
            }
            else{
                this.addChecklist(e.target.value)
            }
        },
        keyupChecklist(e){
            if(e.key === 'Enter' && e.target.value !== ''){
                this.blurChecklist(e);
            }
        },
        addChecklist(title){
            // for whatever reason when enter is pressed, while chrome is emulating mobile, the event is fired twice
            //  this check prevents a duplicate action from being fired
            if(this.displayChecklistTemplate){
                this.$store.dispatch(ADD_CHECKLIST, title);
                this.hideChecklistTemplate();
            }
        },
        toAccountPage(){
            navigateTo('/user/account')
        }
    }

}