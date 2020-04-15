<template>
    <div class='block-list-item' v-on:click='clickHandler'>
        <span>{{displayText}}</span>
    </div>
</template>

<style scoped>
    .block-list-item{
        width:100%;
        display:flex;
        justify-content:center;
        cursor:default;
    }
    
    span{
        width:90%;
        font-size:18px;
        padding:10px;
        margin:5px;
    }
</style>
<style scoped src='./themes.css'></style>

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