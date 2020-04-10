<template>
    <div>
        <h1>Account</h1>
        <p>Color Theme: {{accountConfig.ThemeId}}</p>
        <p v-on:click='editItem(accountConfig, "Opacity", !accountConfig.Opacity)'>Opacity: {{accountConfig.Opacity}}</p>
        <p v-on:click='editItem(accountConfig, "LineThrough", !accountConfig.LineThrough)'>Line Through: {{accountConfig.LineThrough}}</p>
    </div>
</template>

<script>
const {constants} = require('../../store/actions');
const {RETRIEVE_ACCOUNT_CONFIG, UPDATE_ACCOUNT_CONFIG} = constants
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
    },

    created(){
        // todo: move to route guard
        this.$store.dispatch(RETRIEVE_ACCOUNT_CONFIG);
    }

}
</script>