<template>
    <div>
        <h1>User Checklists</h1>
        <div>
            <p v-for='checklist in checklists' :key='checklist.Id'>{{checklist.Title}}</p>
            <input v-if='displayChecklistTemplate' v-on:blur='addChecklist' placeholder='Checklist title' />
        </div>
        <button v-on:click='toggleChecklistTemplate'>Add Checklist</button>
    </div>
</template>

<script src='./UserChecklists.js'></script>