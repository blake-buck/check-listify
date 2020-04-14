const {constants} = require('../../store/actions');
const {ADD_CHECKLIST} = constants;
const {navigateTo} = require('../../utils/router');

import ListItem  from './ListItem/ListItem.vue';

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
        },
        accountConfig(){
            return this.$store.getters.getAccountConfig
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
            if(e.target.value !== ''){
                this.addChecklist(e.target.value)
            }
            this.hideChecklistTemplate();
        },
        keyupChecklist(e){
            if(e.key === 'Enter'){
                e.preventDefault();
                this.blurChecklist(e);
            }
        },
        addChecklist(title){
            // for whatever reason when enter is pressed, while chrome is emulating mobile, the event is fired twice
            // this check prevents a duplicate action from being fired
            if(this.displayChecklistTemplate){
                this.$store.dispatch(ADD_CHECKLIST, title);
            }
        },
        toAccountPage(){
            navigateTo('/user/account')
        }
    }

}