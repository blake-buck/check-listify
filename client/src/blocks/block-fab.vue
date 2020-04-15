<template>
    <div>
        <button class='block-fab' v-bind:class='displayType' v-on:click='clickHandler'>{{displayText}}</button>
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
    .block-fab{
        cursor:pointer;
        width:80%;
        max-width:400px;
        
        font-weight:bold;
        font-size:24px;

        min-height:50px;
        text-transform:uppercase;
        border:none;
    }
</style>

<style scoped src='./themes.css'></style>

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