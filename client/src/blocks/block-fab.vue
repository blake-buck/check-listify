<template>
    <div>
        <button class='block-fab light' v-on:click='clickHandler'>{{displayText}}</button>
    </div>
</template>

<style scoped>
    div{
        width:100%;

        position:fixed;
        bottom:15px;

        display:flex;
        justify-content: center;
    }
    button{
        width:80%;
        max-width:500px;
        
        font-weight:bold;
        font-size:24px;

        min-height:50px;
        text-transform:uppercase;
    }

    .light{
        color:white;
        background:rgba(0,0,0, 1);
        border:none;
    }

    .light:active{
        background:rgba(0,0,0, 0.6);
    }
</style>

<script>
export default {
    name:'block-fab',
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