<template>
    <div>
        <button v-on:click='toAccountPage'>Account</button>
        <h1>User Checklists</h1>
        <div class='list-items'>
            <ListItem v-for='checklist in pinnedChecklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
            <ListItem v-for='checklist in checklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
            <block-input :shouldAutofocus='true' v-if='displayChecklistTemplate' :blurHandler='blurChecklist' :keyupHandler='keyupChecklist' placeholder='Checklist title'></block-input>
        </div>
        <block-fab :clickHandler='toggleChecklistTemplate' displayText='Add Checklist'></block-fab>
    </div>
</template>

<style scoped>
    .list-items .ListItem:first-of-type{
        border-top:1px solid gray;
    }
</style>

<script src='./UserChecklists.js'></script>