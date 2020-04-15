<template>
    <div class='ForgotPassword light'>
        <transition name='fade'>
        <div class='step 1' v-if='currentStep === 1'>
            <h1>Enter your email</h1>
            <p>If your email is in our system, we will send you an code.</p>
            <block-input :keyupHandler='($event) => changeValue("username", $event)' placeholder='Email'></block-input>
            <block-button :clickHandler='() => submitEmail()' displayText='Submit'></block-button>
        </div>
        </transition>

        <transition name='fade'>
        <div class='step 2' v-if='currentStep === 2'>
            <h1>Enter the code you recieved and new password</h1>
            <p>{{stepTwoMessage}}</p>
            <block-input :value='code' :keyupHandler='($event) => changeValue("code", $event)' placeholder='Code'></block-input>
            <block-input :value='password' type='password' :keyupHandler='($event) => changeValue("password", $event)' placeholder='Password'></block-input>
            <block-input :value='confirmPassword' type='password' :keyupHandler='($event) => changeValue("confirmPassword", $event)' placeholder='New Password'></block-input>
            <block-button :clickHandler='() => submitCodeAndPassword()' displayText='Submit'></block-button>
        </div>
        </transition>

        <transition name='fade'>
        <div class='step 3' v-if='currentStep === 3'>
            <h1>Password is changed</h1>
            <p>Return to login page to use new password.</p>
            <block-button :clickHandler='() => navigateTo("/login")' displayText='Login' displayType='primary'></block-button>
        </div>
        </transition>

    </div>
</template>

<style scoped>
    .ForgotPassword{
        height:100vh;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .step{
        margin:10px;
        border:1px solid gray;
        padding:10px;
        display:flex;
        flex-direction: column;
    }
    p{
        margin:10px;
    }
    h1{
        font-size:1.75em;
        margin:10px;
    }
    button.block-button{
        margin:10px;
        padding:10px 20px;
        width:90%;
        align-self:center;
    }

    .list-enter-active {
        transition: opacity 0.5s;
    }
    .list-leave-active{
        transition:all 0.5s;
        transform:translateX(60px);
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .fade-enter-active{
        transition: opacity .2s;
    }
    .fade-enter{
        opacity: 0;
    }

    @keyframes fadeIn{
        from {opacity: 0.4;}
        to   {opacity: 1;}
    }
    .ForgotPassword{
        animation: fadeIn 0.5s;
    }
</style>

<script>
const {navigateTo} = require('../../utils/router');
const appService   = require('../../store/service');
const {validatePassword} = require('../../utils/isValidPassword');

export default {
    name:'ForgotPassword',
    data(){
        return {
            currentStep:1,
            username:'',

            code:'',
            stepTwoMessage:'',

            password:'',
            confirmPassword:'',
            stepThreeMessage:''
        }
    },
    methods:{
        changeValue(key, e){
            this[key] = e.target.value;
        },

        // first the user submits their email -- if the email exists then they get a code
        submitEmail(){
            if(this.username){
                appService.forgotPassword(this.username);
                this.currentStep = 2;
            }
        },

        // here the user plugs in their code from email + their new password 
        async submitCodeAndPassword(){
            const {username, password, confirmPassword,code} = this;
            const passwordMessage = validatePassword(password, confirmPassword, code);
            if(passwordMessage){
                this.stepTwoMessage = passwordMessage;
            }
            else{
                const response = await appService.confirmForgotPassword(username, code, confirmPassword);
                if(response.status === 200){
                    this.currentStep = 3;
                }
                else{
                    this.stepTwoMessage = response.error.message;
                }
            }
        },


        navigateTo:navigateTo
    }
}
</script>