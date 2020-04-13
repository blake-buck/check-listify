const {constants} = require('../../store/actions');
const {UPDATE_ACCOUNT_CONFIG} = constants

const {navigateTo} = require('../../utils/router');
const appService = require('../../store/service');

import ConfirmDialog from './ConfirmDialog';

export default {
    name:'Account',

    components:{
        ConfirmDialog
    },

    data(){
        return {
            colorThemes:[
                {name:'light', id:1},
                {name:'dark',  id:2}
            ],
            
            form:{
                displayMessage:'',
                oldPassword:'',
                newPassword:'',
                confirmNewPassword:''
            },
            
            deleteDialogOpen:false
        }
    },

    computed:{
        accountConfig(){
            return this.$store.getters.getAccountConfig;
        },
        selectedItem(){
            return this.accountConfig.ThemeId;
        }
    },

    methods:{
        editItem(config, key, value){
            this.$store.dispatch(UPDATE_ACCOUNT_CONFIG, {...config, [key]:value});
        },
        selectItem(id){
            this.$store.dispatch(UPDATE_ACCOUNT_CONFIG, {...this.accountConfig, ThemeId:id, themeName:this.colorThemes.find(val => val.id === id).name});
        },

        changeForm(e, key){
            this.form[key] = e.target.value;
        },

        async changePassword(e){
            e.preventDefault();
            const {oldPassword, newPassword, confirmNewPassword} = this.form
            if(!oldPassword || !newPassword || !confirmNewPassword){
                this.form.displayMessage = 'Please fill out all fields.';
            }
            else if(oldPassword.length < 8){
                this.form.displayMessage = 'Old password must be at least 8 characters long'
            }
            else if(newPassword !== confirmNewPassword){
                this.form.displayMessage = 'Values in new password fields must match.';
            }
            else if(confirmNewPassword.length < 8){
                this.form.displayMessage = 'New password must be at least 8 characters long.';
            }
            else if(!isValidPassword(confirmNewPassword)){
                this.form.displayMessage = 'New password must contain an uppercase letter, number, and special character.';
            }
            else{
                const response = await appService.changePassword(oldPassword, confirmNewPassword);
                if(response.status === 200){
                    this.form.displayMessage = 'Password successfully updated.';
                }
                else{
                    this.form.displayMessage = response.error.message;
                }
                
            }
        },

        toChecklists(){
            navigateTo('/user');
        },

        toggleDeleteDialog(){
            this.deleteDialogOpen = !this.deleteDialogOpen;
        },
        async deleteAccount(){
            const response = await appService.deleteAccount();
            if(response.status === 200){
                localStorage.clear('jwt')
                navigateTo('/');
            }
            else{
                console.log(response);
                this.toggleDeleteDialog();
            }
        },

        logout(){
            localStorage.clear('jwt');
            navigateTo('/');
        }
    }

}

function isValidPassword(password){
    return (password.match(/[A-Z]/) && password.match(/[A-Z]/).length > 0) && (password.match(/[0-9]/) && password.match(/[0-9]/).length > 0) && (password.match(/[!@#$%^&*() ]/) && password.match(/[!@#$%^&*() ]/).length > 0)
}