<template>
    <i v-on:click='clickHandler' v-bind:class='displayType' class="material-icons light">{{icon}}</i>
</template>

<style scoped>
    i{
        font-size:48px;
        margin:5px;
    }
    i.light{
        color:black;
    }
    i.light:active{
        color:rgba(0,0,0, 0.6);
    }

    i.light.primary{
        color:#1FD15D;
    }

    i.light.secondary{
        color: #39A1D1;
    }

    i.light.warn{
        color: #FFCC00;
    }

    i.light.attention{
        color:#E50000;
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