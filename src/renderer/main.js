import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import ElementUI from 'element-ui';
import './assets/styles/element-variables.scss';

// Vue.prototype.$http = http;
// Vue.prototype.$db = db;
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
