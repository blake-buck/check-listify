<template>
    <button class='block-button light' v-on:click='clickHandler'>{{displayText}}</button>
</template>

<style scoped>

    button{
        font-size:16px;
        font-weight:bold;
        
        height:100%;
    }

    .light{
        background:rgba(0,0,0, 1);
        color:white;
        border:none;
    }
    .light:active{
        background:rgba(0,0,0, 0.6);
    }
</style>

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
        }
    }
}
</script>