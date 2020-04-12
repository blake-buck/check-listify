const {constants} = require('../../store/actions');
const {UPDATE_ACCOUNT_CONFIG} = constants
export default {
    name:'Account',
    computed:{
        accountConfig(){
            return this.$store.getters.getAccountConfig;
        }
    },

    methods:{
        editItem(config, key, value){
            this.$store.dispatch(UPDATE_ACCOUNT_CONFIG, {...config, [key]:value})
        }
    }

}