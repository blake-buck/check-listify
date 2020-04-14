<template>
    <i v-on:click='clickHandler' v-bind:class='displayType' class="material-icons block-icon-button">{{icon}}</i>
</template>

<style scoped>
    .block-icon-button{
        cursor:pointer;
        font-size:48px;
        margin:5px;
    }
    .block-icon-button:active{
        opacity:0.3;
    }
    .block-icon-button:hover{
        opacity:0.6;
    }

    .light .block-icon-button{
        color:black;
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

    .dark .block-icon-button{
        color:white;
    }

    .dark .primary{
        background:#62DE8D;
    }

    .dark .secondary{
        background: #9CD0E8;
    }

    .dark .warn{
        background: #FFE066;
    }

    .dark .attention{
        background:#FF3333;
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