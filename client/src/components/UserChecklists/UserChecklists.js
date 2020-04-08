const {constants} = require('../../store/actions');
const {RETRIEVE_CHECKLISTS, ADD_CHECKLIST} = constants;
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
        toggleChecklistTemplate(){
            this.displayChecklistTemplate = !this.displayChecklistTemplate;
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
            this.$store.dispatch(ADD_CHECKLIST, title);
            this.toggleChecklistTemplate();
        }
    },

    // when component is created retrieveChecklists from store
    created(){
        // todo: move to route guard
        this.$store.dispatch(RETRIEVE_CHECKLISTS);
    }
}