<template>
    <div>
        <h1>User Checklists</h1>
        <div>
            <ListItem v-for='checklist in checklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
            <input v-if='displayChecklistTemplate' v-on:blur='blurChecklist' v-on:keyup='keyupChecklist' placeholder='Checklist title' />
        </div>
        <button v-on:click='toggleChecklistTemplate'>Add Checklist</button>
    </div>
</template>

<script src='./UserChecklists.js'></script>