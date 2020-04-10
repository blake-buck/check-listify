<template>
    <input :placeholder='placeholder' :value='value' v-on:blur='blurHandler' v-on:keyup='keyupHandler' :type='type' />
</template>

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
        }
    }
}
</script>