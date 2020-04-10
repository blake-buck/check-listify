<template>
    <div>
        <h1>Home</h1>
        <form v-on:submit="submitForm($event, LOGIN)">
            <block-input :keyupHandler="($event) => changeFormValue($event, USERNAME)" placeholder='Username'></block-input>
            <block-input :keyupHandler="($event) => changeFormValue($event, PASSWORD)" placeholder='Password' type='password'></block-input>
            <block-button displayText='Login'></block-button>
        </form>

        <form v-on:submit="submitForm($event, REGISTER)">
            <block-input :keyupHandler="($event) => changeFormValue($event, USERNAME)" placeholder='Username'></block-input>
            <block-input :keyupHandler="($event) => changeFormValue($event, PASSWORD)" placeholder='Password' type='password'></block-input>
            <block-button displayText='Register'></block-button>
        </form>
            
    </div>
    
</template>

<script src='./Home.js'></script>