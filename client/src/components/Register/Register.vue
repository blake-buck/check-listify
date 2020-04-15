<template>
    <div>
        <form v-on:submit="submitForm($event, REGISTER)">
            <block-input :keyupHandler="($event) => changeFormValue($event, USERNAME)" placeholder='Username'></block-input>
            <block-input :keyupHandler="($event) => changeFormValue($event, PASSWORD)" placeholder='Password' type='password'></block-input>
            <block-button displayText='Register'></block-button>
        </form>
    </div>
</template>

<script>
const appService = require('../../store/service');
const {navigateTo} = require('../../utils/router');
export default {
    name:'Register',

    data(){
        return{
            form:{
                username:'',
                password:''
            },
            LOGIN:'LOGIN',
            REGISTER: 'REGISTER',
            USERNAME: 'username',
            PASSWORD: 'password'
        }
    },
    
    methods:{
        async submitForm(e, type){
            e.preventDefault();

            if(type === this.LOGIN){
                const response = await appService.login(this.form[this.USERNAME], this.form[this.PASSWORD]);
                
                // you're not supposed to store JWTs in local storage, this should be temporary
                localStorage.setItem('jwt', response.jwt);
                navigateTo('/user');
            }

            if(type === this.REGISTER){
                const response = await appService.register(this.form[this.USERNAME], this.form[this.PASSWORD]);
                console.log(response);
            }
        },
        changeFormValue(e, key){
            this.form[key] = e.target.value;
        },
    }
}
</script>