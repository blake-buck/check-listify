<template>
    <div v-on:click='clickHandler'>
        <span>{{displayText}}</span>
    </div>
</template>

<style scoped>
    div{
        width:100%;
        display:flex;
        justify-content:center;
    }
    
    span{
        width:90%;
        font-size:18px;
        padding:10px;
        margin:5px;
    }
</style>

<script>
export default {
    name:'block-list-item',
    props:{
        displayText:{
            type:String,
            required:false
        },
        clickHandler:{
            type:Function,
            required:false,
            default:() => null
        }
    }
}
</script>