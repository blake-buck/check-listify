const {constants} = require('../../../store/actions');
const {DELETE_CHECKLIST_ITEM, UPDATE_CHECKLIST_ITEM} = constants;
const {blurHelper} = require('../../../utils/blurHelper');
const {keyupHelper} = require('../../../utils/keyupHelper');
const {touchEndHelper} = require('../../../utils/touchEndHelper');
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
            touchStartY:0,

            canToggleComplete:true
        }
    },

    computed:{
        accountConfig(){
            return this.$store.getters.getAccountConfig
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
            // if a user clicks on the edit item button, they are also click on the item itself
            // without this check, everytime a user edits something they would also be marking it complete/uncomplete
            if(this.canToggleComplete){
                this.$store.dispatch(UPDATE_CHECKLIST_ITEM, {...this.item, Checked:!this.item.Checked});
            }
        },

        showInput(){
            this.canToggleComplete = false;

            this.displayInput = true;
            this.hideActionButtons();

            setTimeout(() => this.canToggleComplete = true, 0);
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
            blurHelper(
                e.target.value,
                () => this.editItem({Name:e.target.value}),
                () => this.hideInput()
            )
        },
        keyupInput(e){
            keyupHelper(
                e,
                () => this.blurInput(e)
            )
        },


        handleTouchStart(e){
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        },
        handleTouchEnd(e){
            const {touchStartX, touchStartY} = this;
            touchEndHelper(
                e,
                {touchStartX, touchStartY},
                () => this.showActionButtons(),
                () => this.hideActionButtons()
            )
        }
    }
}