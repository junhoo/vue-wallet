// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import VueBus from 'vue-bus'
import router from './router'
import fastClick from 'fastclick'
import Toast from 'common/toast/index'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'lib-flexible/flexible'
// import Vant from 'vant'
import { Popup, RadioGroup, Radio } from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/popup/style'
import 'vant/lib/radio-group/style'
import 'vant/lib/radio/style'

const Vue = require('vue')
Vue.use(Popup)
Vue.use(RadioGroup)
Vue.use(Radio)

Vue.use(Toast)
Vue.use(VueBus)

Vue.prototype.$api = JSON.parse(process.env.api)
Vue.config.productionTip = false
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
