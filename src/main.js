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
import {Popup, RadioGroup, Tab, Tabs, Step, Steps, List, Loading} from 'vant'
import 'vant/lib/popup/style'
import 'vant/lib/radio-group/style'
import 'vant/lib/radio/style'
import 'vant/lib/tab/style'
import 'vant/lib/tabs/style'

const Vue = require('vue')

Vue.use(Popup)
Vue.use(RadioGroup)
Vue.use(List)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Step).use(Steps)
Vue.use(Toast)
Vue.use(VueBus)
Vue.use(Tab)
Vue.use(Tabs)

Vue.prototype.$api = JSON.parse(process.env.api)
Vue.config.productionTip = false
fastClick.attach(document.body)

var onPlusReady = function (callback, context = this) {
  if (window.plus) {
    callback.call(context)
  } else {
    document.addEventListener('plusready', callback.bind(context))
  }
}
Vue.mixin({
  beforeCreate () {
    onPlusReady(() => {
      this.plusReady = true
    }, this)
  },
  methods: {
    onPlusReady: onPlusReady
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
