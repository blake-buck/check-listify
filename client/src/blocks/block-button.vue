<template>
    <button class='block-button' v-on:click='clickHandler'>{{displayText}}</button>
</template>

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
        }
    }
}
</script>