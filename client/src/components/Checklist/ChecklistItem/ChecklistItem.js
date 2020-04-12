const {constants} = require('../../../store/actions');
const {DELETE_CHECKLIST_ITEM, UPDATE_CHECKLIST_ITEM} = constants;
export default {
    name:'ChecklistItem',
    props:[
        'item'
    ],
    data(){
        return{
            displayInput:false,
            displayActionButtons:false,
            
            touchStartX:0,
            touchStartY:0
        }
    },
    methods:{

        showActionButtons(){
            this.displayActionButtons = true;
        },
        hideActionButtons(){
            this.displayActionButtons = false;
        },

        toggleComplete(){
            this.$store.dispatch(UPDATE_CHECKLIST_ITEM, {...this.item, Checked:!this.item.Checked});
        },

        deleteItem(id){
            this.$store.dispatch(DELETE_CHECKLIST_ITEM, id);
            this.hideActionButtons();
        },

        editItem(updatedItem){
            if(this.displayInput){
                this.$store.dispatch(UPDATE_CHECKLIST_ITEM, {...this.item, ...updatedItem});
                this.toggleInput();
            }
        },

        toggleInput(){
            this.displayInput = !this.displayInput;
            this.hideActionButtons();
        },
        blurInput(e){
             // if the user hasn't typed anything in the input field prevent the input from blurring
            if(e.target.value === ''){
                e.preventDefault();
            }
            else{
                this.editItem({Name:e.target.value});
                
            }
        },
        keyupInput(e){
            if(e.key === 'Enter' && e.target.value !== ''){
                this.blurInput(e);
            }
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