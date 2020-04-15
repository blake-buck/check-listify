<template>
    <div class='ForgotPassword light'>
        <div class='step 1' v-if='currentStep === 1'>
            <h1>Enter your email</h1>
            <p>If your email is in our system, we will send you an code.</p>
            <block-input :keyupHandler='($event) => changeValue("username", $event)' placeholder='Email'></block-input>
            <block-button :clickHandler='() => submitEmail()' displayText='Submit'></block-button>
        </div>

        <div class='step 2' v-if='currentStep === 2'>
            <h1>Enter the code you recieved and new password</h1>
            <p>{{stepTwoMessage}}</p>
            <block-input :value='code' :keyupHandler='($event) => changeValue("code", $event)' placeholder='Code'></block-input>
            <block-input :value='password' type='password' :keyupHandler='($event) => changeValue("password", $event)' placeholder='Password'></block-input>
            <block-input :value='confirmPassword' type='password' :keyupHandler='($event) => changeValue("confirmPassword", $event)' placeholder='New Password'></block-input>
            <block-button :clickHandler='() => submitCodeAndPassword()' displayText='Submit'></block-button>
        </div>

        <div class='step 3' v-if='currentStep === 3'>
            <h1>Password is changed</h1>
            <p>Return to login page to use new password.</p>
            <block-button :clickHandler='() => navigateTo("/login")' displayText='Login' displayType='primary'></block-button>
        </div>

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
</style>

<script>
const {navigateTo} = require('../../utils/router');
const appService   = require('../../store/service');
const {isValidPassword} = require('../../utils/isValidPassword');

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
        submitEmail(){
            if(this.username){
                appService.forgotPassword(this.username);
                this.currentStep = 2;
            }
        },
        async submitCodeAndPassword(){
            const {username, password, confirmPassword,code} = this;
            if(!code || !password|| !confirmPassword){
                this.stepTwoMessage = 'Please fill out all fields.';
            }
            else if(password !== confirmPassword){
                this.stepTwoMessage = 'Values in password fields must match.';
            }
            else if(confirmPassword.length < 8){
                this.stepTwoMessage = 'Password must be at least 8 characters long.';
            }
            else if(!isValidPassword(confirmPassword)){
                this.stepTwoMessage = 'Password must contain an uppercase letter, number, and special character.';
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