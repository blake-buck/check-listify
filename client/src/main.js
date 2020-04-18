import Vue from 'vue'
import store from './store/index';
import './reset.css';

const {router} = require('./utils/router');
const {syncWithDatabase} = require('./store/index')
const {SET_IS_DATABASE_SYNCED} = require('./store/mutations');


// Global components
const BlockButton = require('./blocks/block-button');
const BlockFab    = require('./blocks/block-fab');
const BlockInput  = require('./blocks/block-input');
const BlockListItem = require('./blocks/block-list-item');
const BlockIconButton = require('./blocks/block-icon-button');
const BlockSelect = require('./blocks/block-select');
const BlockSelectItem = require('./blocks/block-select-item');
const BlockToggle = require('./blocks/block-toggle');

Vue.component('block-button', BlockButton.default);
Vue.component('block-fab',    BlockFab.default);
Vue.component('block-input',  BlockInput.default);
Vue.component('block-list-item', BlockListItem.default);
Vue.component('block-icon-button', BlockIconButton.default);
Vue.component('block-select', BlockSelect.default);
Vue.component('block-select-item', BlockSelectItem.default);
Vue.component('block-toggle', BlockToggle.default);


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
            if(this.$store.getters.getIsDatabaseSynced === false && navigator.onLine){
              syncWithDatabase();
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

window.addEventListener('offline', () => {
  store.commit(SET_IS_DATABASE_SYNCED, false);
})
window.addEventListener('online', () => {
  syncWithDatabase();
})

if(process.env.VUE_APP_ENVIRONMENT !== 'local' && 'serviceWorker' in navigator){
  navigator.serviceWorker.register('./service-worker.js').then(reg => {
    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }
  }).catch(err => {
    console.log(err)
  })
}