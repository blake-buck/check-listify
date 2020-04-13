<template>
    <i v-on:click='clickHandler' v-bind:class='displayType' class="material-icons">{{icon}}</i>
</template>

<style scoped>
    i{
        cursor:pointer;
        font-size:48px;
        margin:5px;
    }
    i:active{
        opacity:0.3;
    }
    i:hover{
        opacity:0.6;
    }

    .light i{
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

    .dark i{
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