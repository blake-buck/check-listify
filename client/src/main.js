import Vue from 'vue';
import store from './store/index';
import './reset.css';

const {router, initializeRouteListeners,navigateTo} = require('./utils/router');
const {initializeGlobalComponents} = require('./utils/initializeGlobalComponents');
const {syncWithDatabase, initializeSyncListeners} = require('./store/index');
const {registerServiceWorker} = require('./utils/registerServiceWorker');

const SyncingDialog = require('./components/SyncingDialog/SyncingDialog').default;

initializeGlobalComponents(Vue);
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
        const component = router(this.computedPathname).default;
        const hasJwt = localStorage.getItem('jwt') ? true : false;
        // proto-route guards
        switch(component.name){
          case 'UserChecklists':
          case 'Account':
          case 'Checklist':

            if(!hasJwt){
              setTimeout(() => navigateTo('/'), 0)
            }
            else if(hasJwt && this.$store.getters.getIsDatabaseSynced === false){
              syncWithDatabase(this.$store);
            }
            

          break;
        }

        return component;
    }

  },

  render: function(createComponent){
    return createComponent(
      'div',
      [
        createComponent(this.viewComponent),
        createComponent(SyncingDialog)
      ]
    )
  }

});



initializeSyncListeners(vm);

initializeRouteListeners(vm);



registerServiceWorker();