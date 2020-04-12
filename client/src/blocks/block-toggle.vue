<template>
    <div class='block-toggle' v-on:click='toggle'>
        <block-icon-button v-if='!isTrue' icon='check_box_outline_blank'></block-icon-button>
        <block-icon-button v-if='isTrue' icon='check_box'></block-icon-button>
        <span>{{displayName}}</span>
    </div>
</template>

<style scoped>
    .block-toggle{
        margin:5px;
        display:flex;
        align-items: center;
    }
    .block-toggle span{
        font-size:1.5em;
    }
</style>

<script>
export default {
    name:'block-toggle',
    props:[
        'isTrue',
        'toggle',
        'displayName'
    ]
}
</script>