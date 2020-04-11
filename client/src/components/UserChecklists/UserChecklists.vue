<template>
    <div>
        <button v-on:click='toAccountPage'>Account</button>
        <h1>User Checklists</h1>
        <div>
            <ListItem v-for='checklist in pinnedChecklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
            <ListItem v-for='checklist in checklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
            <block-input :shouldAutofocus='true' v-if='displayChecklistTemplate' :blurHandler='blurChecklist' :keyupHandler='keyupChecklist' placeholder='Checklist title'></block-input>
        </div>
        <block-fab :clickHandler='toggleChecklistTemplate' displayText='Add Checklist'></block-fab>
    </div>
</template>

<script src='./UserChecklists.js'></script>