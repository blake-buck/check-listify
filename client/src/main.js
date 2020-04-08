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
      const userRegex = /\/user\/checklist\/\d+/.exec(this.currentRoute);
      let matchingRoute = routes[this.currentRoute];
      if(userRegex && userRegex.length > 0){
        matchingRoute = 'Checklist';
      }
    

      return matchingRoute ? require(`./components/${matchingRoute}/${matchingRoute}.vue`) : require('./components/NotFound/NotFound.vue')
    }
  },

  render: function(h){
    return h(this.viewComponent.default)
  },
})
