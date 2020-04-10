<template>
    <button class='block-fab' v-on:click='clickHandler'>{{displayText}}</button>
</template>

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
        }
    }
}
</script>