import Home from '@/views/home/Home'
import Detail from '@/views/detail/Detail'
import DetailRecharge from '@/views/detail/DetailRecharge'
// import Vue from 'vue'
// import Router from 'vue-router'
import Setting from '@/views/setting/Setting'
import SettingPay from '@/views/setting/SettingPay'
import SettingBound from '@/views/setting/SettingBound'

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
      path: '/setting/pay',
      name: 'SettingPay',
      component: SettingPay
    },
    {
      path: '/setting/bound',
      name: 'SettingBound',
      component: SettingBound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
