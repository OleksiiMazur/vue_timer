import Vue from 'vue'
import App from './App.vue'
import longClickDirective from 'vue-long-click/src/directives/longclick'

const longClickInstance = longClickDirective({delay: 500, interval: 50});
Vue.directive('longclick', longClickInstance);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');