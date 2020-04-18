import Vue from 'vue';
import store from './store/index';
import './reset.css';

const {router, initializeRouteListeners} = require('./utils/router');
const {initializeGlobalComponents} = require('./utils/initializeGlobalComponents');
const {syncWithDatabase, initializeSyncListeners} = require('./store/index');
const {registerServiceWorker} = require('./utils/registerServiceWorker');

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

        // proto-route guards
        switch(component.name){
          case 'UserChecklists':
          case 'Account':
          case 'Checklist':

            if(this.$store.getters.getIsDatabaseSynced === false && navigator.onLine){
              syncWithDatabase(this.$store);
            }

          break;
        }

        return component;
    }

  },

  render: function(createComponent){
    return createComponent(this.viewComponent)
  }

});



initializeSyncListeners(vm);

initializeRouteListeners(vm);



registerServiceWorker();