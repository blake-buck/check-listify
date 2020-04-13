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
        cursor:pointer;
        width:80%;
        max-width:400px;
        
        font-weight:bold;
        font-size:24px;

        min-height:50px;
        text-transform:uppercase;
        border:none;
    }
    button:active{
        opacity:0.7;
    }
    button:hover{
        opacity:0.9;
    }

    .light button{
        color:white;
        background:rgba(0,0,0, 1);
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