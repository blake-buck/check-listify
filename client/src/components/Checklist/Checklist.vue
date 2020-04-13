<template>
    <div class='Checklist' v-if='checklist' v-bind:class='accountConfig.themeName'>
        <header>
            <block-icon-button :clickHandler='toChecklists' icon='keyboard_backspace'></block-icon-button>
            <h1>{{checklist.Title}}</h1>
        </header>
        
        <transition-group name='list'>
            <ChecklistItem v-for='item in items' :key='item.Id' v-bind:item='item'></ChecklistItem>
        </transition-group>

        <transition name='fade'>
            <block-input v-if='addingNewItem' :shouldAutofocus='true' :keyupHandler="($event) => keyupInput($event)" :blurHandler="($event) => blurInput($event)" placeholder='New Checklist Item'></block-input>
        </transition>

        <transition name='fade'>
            <block-fab displayType='primary' v-if='!addingNewItem' :clickHandler='displayInput' displayText='Add Item'></block-fab>
        </transition>
        
    </div>
</template>

<style scoped src='./Checklist.css'></style>

<script src='./Checklist.js'></script>