// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Qs from 'qs';
import axios from 'axios';
import router from './router';
import store from './store';
import App from './App';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

axios.defaults.paramsSerializer = params => Qs.stringify(params, { arrayFormat: 'indices' });
// http://localhost:8080/api/factor?where=%7B%22title%22:%22test%22%7D
// http://localhost:8080/api/factor?where%5Btitle%5D=test
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
