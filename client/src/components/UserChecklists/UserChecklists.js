const {constants} = require('../../store/actions');
const {ADD_CHECKLIST} = constants;
const {navigateTo} = require('../../utils/router');
const {blurHelper} = require('../../utils/blurHelper');
const {keyupHelper} = require('../../utils/keyupHelper');
const {scrollToBottom} = require('../../utils/scrollToBottom')

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
        },

        isSyncingWithDb(){
            return this.$store.getters.getDatabaseSyncing
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
            blurHelper(
                e.target.value,
                () => this.addChecklist(e.target.value),
                () => this.hideChecklistTemplate()
            )
        },

        keyupChecklist(e){
            keyupHelper(
                e,
                () => this.blurChecklist(e)
            )
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