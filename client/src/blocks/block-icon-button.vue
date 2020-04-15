<template>
    <i v-on:click='clickHandler' v-bind:class='displayType' class="material-icons block-icon-button">{{icon}}</i>
</template>

<style scoped>
    .block-icon-button{
        cursor:pointer;
        font-size:48px;
        margin:5px;
    }
</style>
<style scoped src='./themes.css'></style>

<script>
export default {
    name:'block-icon-button',
    props:{
        clickHandler:{
            type:Function,
            default: () => {}
        },
        icon:{
            type:String
        },
        displayType:{
            type:String,
            default:'',
            validator:function(value){
                return ['primary', 'secondary', 'warn', 'attention', ''].indexOf(value) !== -1
            }, 
        }
    }
}
</script>