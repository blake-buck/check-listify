
const {getBaseUrl} = require('../../utils/getBaseUrl');
const request = require('../../utils/request');

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