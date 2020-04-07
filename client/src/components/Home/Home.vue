<template>
    <div>
        <h1>Home</h1>
        <form v-on:submit="submitForm($event, LOGIN)">
            <input v-on:keyup="changeFormValue($event, USERNAME);" placeholder='Username' />
            <input v-on:keyup="changeFormValue($event, PASSWORD);" placeholder='Password' type='password'  />
            <button type='submit'>Login</button>
        </form>

        <form v-on:submit="submitForm($event, REGISTER)">
            <input v-on:keyup="changeFormValue($event, USERNAME);" placeholder='Username' />
            <input v-on:keyup="changeFormValue($event, PASSWORD);" placeholder='Password' type='password'  />
            <button type='submit'>Register</button>
        </form>
            
    </div>
    
</template>

<script src='./Home.js'></script>