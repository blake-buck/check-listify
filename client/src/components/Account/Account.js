const {constants} = require('../../store/actions');
const {UPDATE_ACCOUNT_CONFIG} = constants

const {navigateTo} = require('../../utils/router');

export default {
    name:'Account',

    data(){
        return {
            colorThemes:[
                {name:'light', id:1},
                {name:'dark',  id:2}
            ]
        }
    },

    computed:{
        accountConfig(){
            return this.$store.getters.getAccountConfig;
        },
        selectedItem(){
            return this.accountConfig.ThemeId
        }
    },

    methods:{
        editItem(config, key, value){
            this.$store.dispatch(UPDATE_ACCOUNT_CONFIG, {...config, [key]:value})
        },
        selectItem(id){
            this.editItem(this.accountConfig, 'ThemeId', id);
        },

        toChecklists(){
            navigateTo('/user');
        }
    }

}