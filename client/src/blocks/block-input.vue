<template>
    <div class='block-input'>
        <input ref='inputToAutofocus' :placeholder='placeholder' :value='value' v-on:blur='blurHandler' v-on:keyup='keyupHandler' :type='type' />
    </div>
</template>

<style scoped>
    div{
        
        
        width:100%;
        display:flex;
        justify-content:center;
    }
    input{
        width:90%;
        font-size:18px;
        padding:10px;
        margin:5px;
    }

    .dark input{
        background:#2c2c2c;
        color:white;
    }

    
</style>

<script>
export default {
    name:'block-input',
    props:{
        placeholder:{
            type:String,
            required:false,
            default:''
        },
        blurHandler:{
            type:Function,
            required:false,
            default:()=>null
        },
        keyupHandler:{
            type:Function,
            required:false,
            default:() =>null
        },
        type:{
            type:String,
            required:false,
            default:''
        },
        value:{
            type:String,
            required:false,
            default:''
        },
        shouldAutofocus:{
            type:Boolean,
            required:false,
            default:false
        },
        name:{
            type:String,
            default:''
        }
    },
    mounted(){
        if(this.shouldAutofocus){
            this.$refs.inputToAutofocus.focus();
        }
    }
}
</script>