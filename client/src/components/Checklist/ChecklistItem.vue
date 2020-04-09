<template>
    <div>
        <span>{{item.Name}}</span>
        <button v-on:click='deleteItem(item.Id)'>Delete</button>
    </div>
</template>

<script>
export default {
    name:'ChecklistItem',
    props:[
        'item'
    ],
    methods:{
        deleteItem(id){
            this.$store.dispatch(DELETE_CHECKLIST_ITEM, id);
        }
    }
}
</script>