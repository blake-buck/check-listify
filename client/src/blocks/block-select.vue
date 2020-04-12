<template>
    <div class='block-select'>
        <span class='label'>{{label}}</span>
        <span class='select-box' v-on:click='toggleDisplayItems'>
            <span>{{selectedItem ? items.find(val => val.id === selectedItem).name : placeholder}}</span>
            <i class='material-icons'>keyboard_arrow_down</i>

            <div v-if='displayItems' class='select-items-backdrop'>
                
            </div>

            <transition name='fade'>
                <div v-if='displayItems' class='select-items'>
                    <block-select-item v-for='item in items' :key='item.id' :item='item' :selectItem='selectItem'></block-select-item>
                </div>
            </transition>

        </span>

    </div>
</template>

<style scoped>
    .block-select{
        display:flex;
        flex-direction: column;
        padding:10px;
        margin:5px;
    }
    .label{
        font-size:0.8em;
        font-weight:bold;
        margin-bottom: 5px;
    }
    .select-box{
        border:1px solid rgba(0,0,0, 0.8);
        color: rgba(0,0,0, 0.7);
        font-size:1.5em;
        padding:5px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        position:relative;
    }
    .select-box i{
        font-size:1.4em;
    }

    .select-items-backdrop{
        position: fixed;
        top:0px;
        left:0px;
        width:100vw;
        height:100vh;
        /* background:red; */
    }
    .select-items{
        background:white;
        width:100%;
        border:1px solid gray;

        position:absolute;
        top:-1px;
        left:-1px;
    }


    .fade-enter-active, .fade-leave-active{
        transition: opacity .25s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }

</style>

<script>
export default {
    name:'block-select',
    data(){
        return {
            displayItems:false
        }
    },
    methods:{
        toggleDisplayItems(){
            this.displayItems = !this.displayItems;
        }
    },
    props:{
        label:{
            type:String,
            required:false
        },
        placeholder:{
            type:String,
            required:true
        },
        items:{
            type:Array,
            defaultValue:[]
        },
        selectedItem:{
            type:Number,
            required:false
        },

        selectItem:{
            type:Function,
            default:() => null
        }
    }
}
</script>