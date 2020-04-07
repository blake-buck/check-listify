const {RETRIEVE_CHECKLISTS, ADD_CHECKLIST} = require('../../store/actions');
export default {
    name:'UserChecklists',
    computed:{
        checklists(){
            return this.$store.getters.getChecklists;
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
        addChecklist(e){
            // if the user hasn't typed anything in the input field prevent the input from blurring
            if(e.target.value === ''){
                e.preventDefault();
            }
            else{
                this.$store.dispatch(ADD_CHECKLIST, {Id:-1, Title:e.target.value, Pinned:false});
                this.toggleChecklistTemplate();
            }
        }
    },

    // when component is created retrieveChecklists from store
    created(){
        // todo: move to route guard
        this.$store.dispatch(RETRIEVE_CHECKLISTS);
    }
}