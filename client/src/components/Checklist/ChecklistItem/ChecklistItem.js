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

        showInput(){
            this.displayInput = true;
            this.hideActionButtons();
        },
        hideInput(){
            this.displayInput = false;
            this.hideActionButtons();
        },

        deleteItem(id){
            this.$store.dispatch(DELETE_CHECKLIST_ITEM, id);
        },

        editItem(updatedItem){
            if(this.displayInput){
                this.$store.dispatch(UPDATE_CHECKLIST_ITEM, {...this.item, ...updatedItem});
            }
        },

        blurInput(e){
             // if the user hasn't typed anything in the input field prevent the item from updating
            if(e.target.value !== ''){
                this.editItem({Name:e.target.value});
            }

            this.hideInput();
        },
        keyupInput(e){
            if(e.key === 'Enter'){
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