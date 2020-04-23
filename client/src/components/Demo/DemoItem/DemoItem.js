const {touchEndHelper} = require('../../../utils/touchEndHelper');

export default {
    name:'DemoItem',
    props:[
        'itemProp',
        'demoDelete'
    ],
    data(){
        return{
            displayInput:false,
            displayActionButtons:false,
            
            touchStartX:0,
            touchStartY:0,

            canToggleComplete:true,

            item:{...this.itemProp}
            
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
            if(this.canToggleComplete){
                this.item.Checked = !this.item.Checked;
            }
        },

        showInput(){
            this.canToggleComplete = false;
            this.displayInput = true;
            this.hideActionButtons();
        },
        hideInput(){
            this.canToggleComplete = false;
            this.displayInput = false;
            this.hideActionButtons();
        },

        deleteItem(id){
            this.demoDelete(id);
        },

        editItem(updatedItem){
            if(this.displayInput){
                this.item = {...this.item, ...updatedItem};
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
                e.preventDefault();
                this.blurInput(e);
            }
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