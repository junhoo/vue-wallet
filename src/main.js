// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import Toast from 'common/toast/index'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'lib-flexible/flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
const Vue = require('vue')
Vue.use(Vant)
Vue.use(Toast)
Vue.use(Uploader)

Vue.config.productionTip = false
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
