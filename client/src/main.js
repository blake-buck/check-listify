import Vue from 'vue'
import store from './store/index';
import './reset.css';

const {router} = require('./utils/router');

const {constants} = require('./store/actions');
const {RETRIEVE_CHECKLISTS, RETRIEVE_CHECKLIST_ITEMS, RETRIEVE_ACCOUNT_CONFIG} = constants;

const BlockButton = require('./blocks/block-button');
const BlockFab    = require('./blocks/block-fab');
const BlockInput  = require('./blocks/block-input');
const BlockListItem = require('./blocks/block-list-item');

Vue.component('block-button', BlockButton.default);
Vue.component('block-fab',    BlockFab.default);
Vue.component('block-input',  BlockInput.default);
Vue.component('block-list-item', BlockListItem.default);

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