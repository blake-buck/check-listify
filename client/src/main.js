import Vue from 'vue'
import routes from './routes';
import store from './store/index';

Vue.config.productionTip = false;

new Vue({
  el:'#app',

  store,
  data:{
    currentRoute:window.location.pathname
  },

  computed:{
    viewComponent(){
      const matchingRoute = routes[this.currentRoute]
      return matchingRoute ? require(`./components/${matchingRoute}.vue`) : require('./components/NotFound.vue')
    }
  },

  render: function(h){
    return h(this.viewComponent.default)
  },
})
