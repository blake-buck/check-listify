export default {
    name:'UserChecklists',
    computed:{
        checklists(){
            return this.$store.getters.getChecklists;
        }
    },
    data(){
        return {
            isCreatingChecklist:false
        }
    },
    methods:{
        toggleChecklistTemplate(){
            this.isCreatingChecklist = !this.isCreatingChecklist;
        },
        addChecklist(e){
            if(e.target.value === ''){
                e.preventDefault();
            }
            else{
                this.$store.dispatch('addChecklist', {Id:-1, Title:e.target.value, Pinned:false})
                this.toggleChecklistTemplate();
            }
        }
    },
    created(){
        // todo: move to route guard
        this.$store.dispatch('retrieveChecklists');
    }
}