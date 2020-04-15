<template>
    <button class='block-button' v-bind:class='displayType' v-on:click='clickHandler'>{{displayText}}</button>
</template>

<style scoped>
    .block-button{
        cursor:pointer;
        font-size:16px;
        font-weight:bold;
        height:100%;
        border:none;
    }
</style>
<style scoped src='./themes.css'></style>

<script>
export default {
    name:'block-button',
    props:{
        clickHandler:{
            type:Function,
            default: () => {}
        },
        displayText:{
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