import Home from '@/views/home/Home'
import Detail from '@/views/detail/Detail'
import Setting from '@/views/setting/Setting'
import SettingPay from '@/views/setting/SettingPay'

const Vue = require('vue')
const Router = require('vue-router')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      children: [
        { name: 'SettingPay', path: 'pay', component: SettingPay }
      ]
    }
    // ,
    // {
    //   path: '/setting_pay',
    //   name: 'SettingPay',
    //   component: SettingPay
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
