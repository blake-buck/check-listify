const {constants} = require('../../store/actions');
const {UPDATE_ACCOUNT_CONFIG} = constants

const {navigateTo} = require('../../utils/router');
const appService = require('../../store/service');

const {validatePassword} = require('../../utils/isValidPassword');

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
            
            deleteDialogOpen:false,

    
        }
    },

    computed:{
        accountConfig(){
            return this.$store.getters.getAccountConfig;
        },
        selectedItem(){
            return this.accountConfig.ThemeId;
        },
        isOnline(){
            return navigator.onLine
        }
    },

    methods:{
        // Commented out while toggles are disabled

        // In general only one property on an item is getting modified at a time, so the single key-value pair
        // covers most cases
        // editItem(config, key, value){
        //     this.$store.dispatch(UPDATE_ACCOUNT_CONFIG, {...config, [key]:value});
        // },

        
        selectColorTheme(id){
            this.$store.dispatch(UPDATE_ACCOUNT_CONFIG, {...this.accountConfig, ThemeId:id, themeName:this.colorThemes.find(val => val.id === id).name});
        },

        changeForm(e, key){
            this.form[key] = e.target.value;
        },

        async changePassword(e){
            e.preventDefault();

            const {oldPassword, newPassword, confirmNewPassword} = this.form;
            
            
            const passwordMessage = validatePassword(newPassword, confirmNewPassword);

            if(passwordMessage){
                this.form.displayMessage = passwordMessage;
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
                localStorage.clear();
                navigateTo('/');
            }
            else{
                console.log(response);
                this.toggleDeleteDialog();
            }

        },

        logout(){
            localStorage.clear();
            navigateTo('/');
        }
    }

}

