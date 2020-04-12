<template>
    <div class='block-select-item' v-on:click='selectItem(item.id)'>
        <span>{{item.name}}</span>
    </div>
</template>

<style scoped>
    .block-select-item{
        padding:10px;
        border:1px solid gray;
    }
</style>

<script>
export default {
    name:'block-select-item',
    props:[
        'item',
        'selectItem'
    ]
}
</script>