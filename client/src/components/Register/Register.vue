<template>
    <div class='Register light'>
        <div v-if='!registerSubmitted' class='actions-wrapper'>
            <form v-on:submit="submitForm($event)">
                <h3>Check-listify Register</h3>
                <span>{{form.displayMessage}}</span>
                <block-input :keyupHandler="($event) => changeFormValue($event, 'username')" :value='form.username' placeholder='Username'></block-input>
                <block-input :keyupHandler="($event) => changeFormValue($event, 'password')" :value='form.password' placeholder='Password' type='password'></block-input>
                <block-input :keyupHandler="($event) => changeFormValue($event, 'confirmPassword')" :value='form.confirmPassword' placeholder='Confirm Password' type='password'></block-input>
                <block-button displayText='Register' displayType='secondary'></block-button>
            </form>
            <footer>
                <p v-on:click='navigateTo("/login")'>Already a user?</p>
            </footer>
        </div>

        <div v-if='registerSubmitted' class='actions-wrapper confirm'>
            <p>A confirmation email has been sent to the email address you provided!</p>
            <block-button displayText='Login' displayType='primary' :clickHandler='() => navigateTo("/login")'></block-button>
        </div>
    </div>
</template>

<style scoped>
    .Register{
        min-height:100vh;
        width:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .actions-wrapper{
        border:1px solid gray;
        width:100%;
        max-width:500px;
        text-align:center;

        margin:10px;
        padding:5px;
    }
    .actions-wrapper p{
        margin:10px;
        font-size:1.4em;
    }

    .actions-wrapper.confirm{
        padding:20px;
    }
    .actions-wrapper button{
        font-size: 1.5em;
        margin-top:20px;
        padding:10px 20px;
        width:90%;
    }

    h3{
        font-size:2em;
        margin:5px;
        margin-bottom:15px;
    }

    form{
        width:100%
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
    .Register{
        animation: fadeIn 0.5s;
    }
</style>

<script>
const appService = require('../../store/service');
const {navigateTo} = require('../../utils/router');
const {validatePassword} = require('../../utils/isValidPassword');

export default {
    name:'Register',

    data(){
        return{
            form:{
                displayMessage:'',
                username:'',
                password:'',
                confirmPassword:''
            },
            registerSubmitted:false,
        }
    },
    
    methods:{
        async submitForm(e, type){
            e.preventDefault();

            const {username, password, confirmPassword} = this.form;
            const passwordMessage = validatePassword(password, confirmPassword);

            if(passwordMessage){
                this.form.displayMessage = passwordMessage;
            }
            else{

                const response =  await appService.register(username, password);

                if(response.status === 200){
                    this.registerSubmitted = true;
                }
                else{
                    this.form.displayMessage = response.error.message;
                }
                
            }

        },

        changeFormValue(e, key){
            this.form[key] = e.target.value;
        },
        
        navigateTo:navigateTo
    }
}
</script>