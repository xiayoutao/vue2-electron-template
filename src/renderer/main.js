import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import db from '@/common/datastore';

import ElementUI from 'element-ui';
import './assets/styles/element-variables.scss';

// Vue.prototype.$http = request;
Vue.prototype.$db = db;
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
import 'element-ui/lib/theme-chalk/index.css';
import {
  UTable,
  UTableColumn,
  UxGrid,
  UxTableColumn,
} from 'umy-ui';
import 'umy-ui/lib/theme-chalk/index.css'; // 引入样式

Vue.use(UTable);
Vue.use(UTableColumn);
Vue.use(UxGrid);
Vue.use(UxTableColumn);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
