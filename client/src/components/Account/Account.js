const {constants} = require('../../store/actions');
const {UPDATE_ACCOUNT_CONFIG} = constants
export default {
    name:'Account',

    data(){
        return {
            colorThemes:[
                {name:'light', id:1},
                {name:'dark',  id:2}
            ],
            selectedItem:1
        }
    },

    computed:{
        accountConfig(){
            return this.$store.getters.getAccountConfig;
        }
    },

    methods:{
        editItem(config, key, value){
            this.$store.dispatch(UPDATE_ACCOUNT_CONFIG, {...config, [key]:value})
        },
        selectItem(id){
            this.selectedItem = id;
        }
    }

}