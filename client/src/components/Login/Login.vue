<template>
    <div class='Login light'>
        <div class='actions-wrapper'>
            <form v-on:submit="submitForm($event)">
                <h3>Check-listify Login</h3>
                <span>{{form.displayMessage}}</span>
                <block-input :keyupHandler="($event) => changeFormValue($event, 'username')" :value='form.username' placeholder='Username'></block-input>
                <block-input :keyupHandler="($event) => changeFormValue($event, 'password')" :value='form.password' placeholder='Password' type='password'></block-input>
                <block-button displayText='Login' displayType='primary'></block-button>
            </form>
            <footer>
                <p v-on:click='navigateTo("/register")'>Not a user?</p>
                <p v-on:click='navigateTo("/forgot-password")'>Forgot your password?</p>
            </footer>
        </div>
    </div>
</template>

<style scoped>
    .Login{
        min-height:100vh;
        width:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        background:white;
        color:black;
    }
    .actions-wrapper{
        border:1px solid gray;
        width:100%;
        max-width:500px;
        text-align:center;

        margin:10px;
        padding:5px;
    }
    form{
        width:100%
    }
    form h3{
        font-size:2em;
        margin:5px;
        margin-bottom:15px;
    }
    form input{
        margin-top:10px;
        margin-bottom:10px;
    }
    form button{
        margin-top:20px;
        padding:10px 20px;
        width:90%;
    }

    footer{
        margin-top:20px;
    }

    footer p{
        cursor:pointer;
        font-size:1.2em;
        margin:5px;
    }

    footer p:hover{
        opacity:0.7;
    }
    footer p:active{
        opacity:0.5;
    }

    @keyframes fadeIn{
        from {opacity: 0.4;}
        to   {opacity: 1;}
    }
    .Login{
        animation: fadeIn 0.5s;
    }
</style>

<script>
const appService = require('../../store/service');
const {navigateTo} = require('../../utils/router');
export default {
    name:'Login',
    
    data(){
        return{
            form:{
                displayMessage:'',
                username:'',
                password:''
            }
        }
    },

    created(){
        const jwt = localStorage.getItem('jwt');
        if(jwt){
            setTimeout(() => navigateTo('/user'), 0);
        }
    },

    methods:{
        
        async submitForm(e, type){
            e.preventDefault();

            const response = await appService.login(this.form['username'], this.form['password']);

            if(response.status === 200){
                // you're not supposed to store JWTs in local storage, this should be temporary
                localStorage.setItem('jwt', response.jwt);
                localStorage.setItem('refresh', response.refresh);
                navigateTo('/user');
            }
            else{
                console.log(response);
                this.form.displayMessage = response.error.message;
            }

        },

        changeFormValue(e, key){
            this.form[key] = e.target.value;
        },

        navigateTo:navigateTo
    }
}
</script>