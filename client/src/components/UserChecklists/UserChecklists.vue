<template>
    <div>
        <h1>User Checklists</h1>
        <div>
            <p v-for='checklist in checklists' :key='checklist.Id'>
                <span>{{checklist.Title}}</span>
                <button v-on:click='deleteChecklist(checklist.Id)'>Delete Item</button>
            </p>
            <input v-if='displayChecklistTemplate' v-on:blur='blurChecklist' v-on:keyup='keyupChecklist' placeholder='Checklist title' />
        </div>
        <button v-on:click='toggleChecklistTemplate'>Add Checklist</button>
    </div>
</template>

<script src='./UserChecklists.js'></script>