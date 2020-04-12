<template>
    <div class='ListItem'>
        
        <div class='display-elements' v-on:touchstart='handleTouchStart' v-on:touchend='handleTouchEnd'>
            <div class='pinned-icon' v-if='checklist.Pinned'><i class='material-icons'>label</i></div>
            <block-list-item v-if='!editingTitle' :clickHandler='() => navigateToChecklist(checklist.Id)' :displayText='checklist.Title'></block-list-item>
            <block-input :shouldAutofocus='true' v-if='editingTitle' :blurHandler='blurInput' :keyupHandler='keyupInput' :value='checklist.Title'></block-input>
            
            <div class='action-buttons' v-bind:class='{displayActionButtons}'>
                <block-button displayType='secondary' :clickHandler='toggleListIsPinned' :displayText='checklist.Pinned ? "Unpin" : "Pin"'></block-button>
                <block-button displayType='warn' :clickHandler='update' displayText='Update'></block-button>
                <block-button displayType='attention' :clickHandler='() => deleteChecklist(checklist.Id)' displayText='Delete'></block-button>
            </div>
        </div>
           
    </div>
</template>

<style scoped src='./ListItem.css'></style>

<script src='./ListItem.js'></script>