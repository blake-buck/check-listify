<template>
    <div>
        <h1>Account</h1>
        <p>Color Theme: {{accountConfig.ThemeId}}</p>
        <p>Opacity: {{accountConfig.Opacity}}</p>
        <p>Line Through: {{accountConfig.LineThrough}}</p>
    </div>
</template>

<script>
const {constants} = require('../../store/actions');
const {RETRIEVE_ACCOUNT_CONFIG} = constants
export default {
    name:'Account',
    computed:{
        accountConfig(){
            return this.$store.getters.getAccountConfig;
        }
    },

    created(){
        // todo: move to route guard
        this.$store.dispatch(RETRIEVE_ACCOUNT_CONFIG);
    }

}
</script>