<template>
    <i v-on:click='clickHandler' v-bind:class='displayType' class="material-icons">{{icon}}</i>
</template>

<style scoped>
    i{
        font-size:48px;
        margin:5px;
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