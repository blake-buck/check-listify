<template>
    <div class='UserChecklists' v-bind:class='accountConfig.ThemeName'>

        <header>
            <h1>Checklists</h1>
            <block-icon-button :clickHandler='toAccountPage' icon='settings'></block-icon-button>
        </header>
        
        <div class='list-items'>

            <transition-group name='list'>
                <ListItem v-for='checklist in pinnedChecklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
                <ListItem v-for='checklist in checklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
            </transition-group>
            
            <transition name='fade'>
                <block-input :shouldAutofocus='true' v-if='displayChecklistTemplate' :blurHandler='blurChecklist' :keyupHandler='keyupChecklist' placeholder='Checklist title'></block-input>
            </transition>

        </div>

        <transition name='fade'>
            <block-fab v-if='!displayChecklistTemplate' displayType='primary' :clickHandler='showChecklistTemplate' displayText='Add Checklist'></block-fab>
        </transition>
        
    </div>
</template>

<style scoped src='./UserChecklists.css'></style>

<script src='./UserChecklists.js'></script>