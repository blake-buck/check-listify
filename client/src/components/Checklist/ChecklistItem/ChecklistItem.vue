<template>
    <div class='ChecklistItem' v-on:click='toggleComplete' v-on:touchstart='handleTouchStart' v-on:touchend='handleTouchEnd'>

        <div class='display-elements' v-bind:class='{complete:item.Checked}'>

            <block-list-item v-if='!displayInput' :displayText='item.Name'></block-list-item>
            <block-input v-if='displayInput' :value='item.Name' :shouldAutofocus='true' :keyupHandler="($event) => keyupInput($event)" :blurHandler="($event) => blurInput($event)" placeholder='Checklist Item'></block-input>
            
            <div class='action-buttons'  v-bind:class='{displayActionButtons}'>
                <block-button :clickHandler='showInput' displayText='Edit'></block-button>
                <block-button :clickHandler='() => deleteItem(item.Id)' displayText='Delete'></block-button>
            </div>
        </div>
        
    </div>
</template>

<style scoped src='./ChecklistItem.css'></style>

<script src='./ChecklistItem.js'></script>