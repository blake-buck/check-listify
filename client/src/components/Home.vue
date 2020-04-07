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

<script>

const {getBaseUrl} = require('../utils/getBaseUrl');
const request = require('../utils/request');

export default {
    name:'Home',
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
                let response = await request.post(
                    `${getBaseUrl()}/api/login`,
                    {
                        username:this.form[this.USERNAME],
                        password:this.form[this.PASSWORD]
                    }
                )
                response = await response.text();
    
                // you're not supposed to store JWTs in local storage, this should be temporary
                localStorage.setItem('jwt', response);
                window.location.pathname = '/user/:user-id';
            }

            if(type === this.REGISTER){
                // empty for now
            }
        },
        changeFormValue(e, key){
            this.form[key] = e.target.value;
        }
    }
}

</script>