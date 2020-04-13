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
    button{
        width:80%;
        max-width:500px;
        
        font-weight:bold;
        font-size:24px;

        min-height:50px;
        text-transform:uppercase;
    }

    .light button{
        color:white;
        background:rgba(0,0,0, 1);
        border:none;
    }

    .light .primary{
        background:#1FD15D;
    }

    .light .secondary{
        background: #39A1D1;
    }

    .light .warn{
        background: #FFCC00;
    }

    .light .attention{
        background:#E50000;
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