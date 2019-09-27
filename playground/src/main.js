import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bowser from 'bowser'
import './registerServiceWorker'

import '@/assets/css/tailwind.scss'
import 'codemirror/lib/codemirror.css'

const browser = Bowser.getParser(window.navigator.userAgent)

window.isSupportedBrowser = browser.satisfies({
  desktop: {
    safari: '>=13',
    chrome: '>=60',
    firefox: '>=60',
  }
})

Vue.config.productionTip = false

window.vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

if (window.isSupportedBrowser) {
  require('./php.js')
}
