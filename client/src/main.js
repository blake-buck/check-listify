import Vue from 'vue'
import store from './store/index';

const {router} = require('./utils/router');

const {constants} = require('./store/actions');
const {RETRIEVE_CHECKLISTS, RETRIEVE_CHECKLIST_ITEMS, RETRIEVE_ACCOUNT_CONFIG} = constants;

Vue.config.productionTip = false;

let vm = new Vue({
  el:'#app',

  store,

  data:{
    dataPathname:window.location.pathname
  },

  computed:{
    computedPathname(){
      return this.dataPathname
    },
    viewComponent(){
        const pathname = router(this.computedPathname);

        switch(pathname.default.name){
          case 'UserChecklists':
          case 'Account':
          case 'Checklist':
            // proto-route guards
            if(!this.$store.getters.getChecklistsLoaded){
              this.$store.dispatch(RETRIEVE_CHECKLISTS);
            }

            if(!this.$store.getters.getItemsLoaded){
              this.$store.dispatch(RETRIEVE_CHECKLIST_ITEMS);
            }

            if(!this.$store.getters.getAccountConfigLoaded){
              this.$store.dispatch(RETRIEVE_ACCOUNT_CONFIG);
            }

          break;

        }

        return pathname;
    }
  },

  render: function(h){
    return h(this.viewComponent.default)
  },
})

window.addEventListener('customnav', (e) => {
  vm.dataPathname = e.detail.route;
})
window.addEventListener('popstate', (e) => {
  e.preventDefault();
  vm.dataPathname = `${e.target.location.pathname}`;
})