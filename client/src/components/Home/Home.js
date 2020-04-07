const appService = require('../../store/service');

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
                const response = await appService.login(this.form[this.USERNAME], this.form[this.PASSWORD]);
                
                // you're not supposed to store JWTs in local storage, this should be temporary
                localStorage.setItem('jwt', response.jwt);
                window.location.pathname = '/user';
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