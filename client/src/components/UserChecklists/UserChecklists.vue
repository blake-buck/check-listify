<template>
    <div class='UserChecklists'>
        <header class='light'>
            <block-icon-button :clickHandler='toAccountPage' icon='settings'></block-icon-button>
            <h1>Checklists</h1>
        </header>
        
        <div class='list-items'>
            <ListItem v-for='checklist in pinnedChecklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
            <ListItem v-for='checklist in checklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
            <block-input :shouldAutofocus='true' v-if='displayChecklistTemplate' :blurHandler='blurChecklist' :keyupHandler='keyupChecklist' placeholder='Checklist title'></block-input>
        </div>
        <block-fab v-if='!displayChecklistTemplate' :clickHandler='showChecklistTemplate' displayText='Add Checklist'></block-fab>
    </div>
</template>

<style scoped>
    .UserChecklists{
        /* this gives extra breathing room so the fab doesn't obscure list items */
        padding-bottom:80px;
    }
    .list-items .ListItem:first-of-type{
        border-top:1px solid gray;
    }

    header{
        display:flex;
        
        align-items: center;
    }

    header h1{
        font-size:2.5em;
        padding:5px;
        margin:5px;
    }

    header.light{
        background:lightgray;
    }

</style>

<script src='./UserChecklists.js'></script>