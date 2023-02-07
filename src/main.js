import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted';

Vue.config.productionTip = false
Vue.use(Toasted, {
  duration: 2000,
  theme: "bubble",
  position: "bottom-right",
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
