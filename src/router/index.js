// import Vue from 'vue'
// import Router from 'vue-router'
import Home from '@/views/home/Home'
import Home2 from '@/views/home/Home2'
import Detail from '@/views/detail/Detail'
import DetailRecharge from '@/views/detail/DetailRecharge'
import Setting from '@/views/setting/Setting'
import SettingCertification from '@/views/setting/SettingCertification'
import SettingPay from '@/views/setting/SettingPay'
import SettingBound from '@/views/setting/SettingBound'
import Order from '@/views/order/Order'

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
      path: '/home2',
      name: 'Home2',
      component: Home2
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/detailRecharge',
      name: 'DetailRecharge',
      component: DetailRecharge
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/setting/SettingCertification',
      name: 'SettingCertification',
      component: SettingCertification
    },
    {
      path: '/setting/pay',
      name: 'SettingPay',
      component: SettingPay
    },
    {
      path: '/setting/bound',
      name: 'SettingBound',
      component: SettingBound
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
