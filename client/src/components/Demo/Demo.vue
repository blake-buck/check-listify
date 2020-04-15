<template>
    <div class='Demo light'>

        <header class='light public'>
            <div class='links'>
                <span v-on:click='navigateHome'>Home</span>
                <span v-on:click='navigateDemo'>Demo</span>
            </div>

            <block-button :clickHandler='navigateLogin' displayText='Login' displayType='primary'></block-button>
        </header>

        <header>
            <h1>Demo Checklist</h1>
        </header>
        
        <transition-group name='list'>
            <DemoItem v-for='item in items' :key='item.Id' v-bind:itemProp='item' v-bind:demoDelete='deleteItem'></DemoItem>
        </transition-group>

        <transition name='fade'>
            <block-input v-if='addingNewItem' :shouldAutofocus='true' :keyupHandler="($event) => keyupInput($event)" :blurHandler="($event) => blurInput($event)" placeholder='New Checklist Item'></block-input>
        </transition>

        <transition name='fade'>
            <block-fab displayType='primary' v-if='!addingNewItem' :clickHandler='displayInput' displayText='Add Item'></block-fab>
        </transition>
        
    </div>
</template>

<style scoped src='./Demo.css'></style>
<script src='./Demo.js'></script>