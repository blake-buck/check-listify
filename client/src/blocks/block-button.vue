<template>
    <button class='block-button' v-bind:class='displayType' v-on:click='clickHandler'>{{displayText}}</button>
</template>

<style scoped>

    button{
        font-size:16px;
        font-weight:bold;
        height:100%;
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
    name:'block-button',
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