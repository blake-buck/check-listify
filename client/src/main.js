import Vue from 'vue'
import store from './store/index';

const {router} = require('./utils/router');

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
        return router(this.computedPathname);
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