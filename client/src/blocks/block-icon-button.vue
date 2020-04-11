<template>
    <i v-on:click='clickHandler' class="material-icons">{{icon}}</i>
</template>

<style scoped>
    i{
        font-size:48px;
        margin:5px;
    }
    .light{
        color:black;
    }
    .light:active{
        color:rgba(0,0,0, 0.6);
    }
</style>

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
        }
    }
}
</script>