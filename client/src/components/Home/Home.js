const {navigateTo} = require('../../utils/router');


export default {
    name:'Home',
    
    methods:{   

        navigateHome(){
            navigateTo('/');
        },
        navigateDemo(){
            navigateTo('/demo');
        },
        navigateLogin(){
            navigateTo('/login');
        },
        navigateRegister(){
            navigateTo('/register');
        }
    }
}