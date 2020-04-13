const {constants} = require('../../../store/actions');
const {UPDATE_CHECKLIST, DELETE_CHECKLIST} = constants;
const {navigateTo} = require('../../../utils/router');
export default {
    name:'ListItem',
    props:[
        'checklist'
    ],
    data(){
        return{
            editingTitle:false,

            touchStartX:0,
            touchStartY:0,

            displayActionButtons:false
        }
    },

    computed:{
        accountConfig(){
            return this.$store.getters.getAccountConfig
        }
    },

    methods:{
        update(){
            this.editTitle();
            this.hideActionButtons();
        },

        // These functions are used instead of a toggleFunction -> for whatever reason when enter is pressed
        // while chrome is emulating mobile, the event is fired twice, making a toggle go from true => false => true

        // set editing title to true
        editTitle(){
            this.editingTitle = true;
        },
        
        // set editing title to false
        finishEditingTitle(){
            this.editingTitle = false;
        },

        showActionButtons(){
            this.displayActionButtons = true;
        },
        hideActionButtons(){
            this.displayActionButtons = false;
        },

        navigateToChecklist(id){
            navigateTo(`/user/checklist/${id}`);
        },

        keyupInput(e){
            if(e.key === 'Enter'){
                this.blurInput(e);
            }
        },

        blurInput(e){
            if(e.target.value !== ''){
                this.$store.dispatch(UPDATE_CHECKLIST, {...this.checklist, Title:e.target.value});
            }
            this.finishEditingTitle();
        },

        toggleListIsPinned(){
            this.$store.dispatch(UPDATE_CHECKLIST, {...this.checklist, Pinned:!this.checklist.Pinned});
            this.hideActionButtons();
        },

        deleteChecklist(id){
            this.$store.dispatch(DELETE_CHECKLIST, id);
        },

        handleTouchStart(e){
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        },
        handleTouchEnd(e){
            // if the users Y scroll moves more than 50px, they are likely scrolling the page and not trying to show/hide action buttons
            if(this.touchStartX > e.changedTouches[0].clientX && Math.abs(this.touchStartY - e.changedTouches[0].clientY) <= 50){
                this.showActionButtons();
            }

            if(this.touchStartX < e.changedTouches[0].clientX && Math.abs(this.touchStartY - e.changedTouches[0].clientY) <= 50){
                this.hideActionButtons();
            }
        }
    }
}