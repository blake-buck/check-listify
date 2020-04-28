const {navigateTo} = require('../../utils/router');
const {scrollToBottom} = require('../../utils/scrollToBottom');

import DemoItem from './DemoItem/DemoItem.vue';

export default {
    name:'Demo',
    
    components:{
        DemoItem
    },

    data(){
        return {
            addingNewItem:false,
            items:[
                {Id:1, Name:'Click the "Add Item" button to add another item to the list', Checked:false},
                {Id:2, Name:'Tap/click on an item to toggle completion', Checked:true},
                {Id:3, Name:'If on mobile, slide from right to left on an item to edit/delete it', Checked:false},
                {Id:4, Name:'If on IOS, tap "share" then "Add to homescreen" to add Check-listify as an app to your homescreen', Checked:false}
            ],
            currentId:4
        }
    },

    methods:{
        displayInput(){
            this.addingNewItem = true;
        },
        hideInput(){
            this.addingNewItem = false;
        },

        blurInput(e){
             // if the user hasn't typed anything in the input field prevent the input from blurring
            if(e.target.value !== ''){
                this.addItem(e.target.value)
            }

            this.hideInput();

        },
        keyupInput(e){
            if(e.key === 'Enter'){
                e.preventDefault();
                this.blurInput(e);
            }
        },

        addItem(name){
            if(this.addingNewItem){
                this.items = [...this.items, {Id:++this.currentId, Name:name, Checked:false}];
                scrollToBottom();
            }
        },

        toChecklists(){
            navigateTo('/user');
        },

        deleteItem(id){
            this.items = this.items.filter(item => item.Id !== id);
        },



        navigateHome(){
            navigateTo('/');
        },
        navigateDemo(){
            navigateTo('/demo');
        },
        navigateLogin(){
            navigateTo('/login');
        }
        
    }
}