import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import '@/assets/css/tailwind.scss';
import 'codemirror/lib/codemirror.css';

Vue.config.productionTip = false;

window.vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

require('./php.js');
