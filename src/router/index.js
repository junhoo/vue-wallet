import Home from '@/views/home/Home'
import Detail from '@/views/detail/Detail'
<<<<<<< HEAD
import DetailRecharge from '@/views/detail/DetailRecharge'
// import Vue from 'vue'
// import Router from 'vue-router'
=======
import Setting from '@/views/setting/Setting'
import SettingPay from '@/views/setting/SettingPay'
>>>>>>> 8a02dd6f002027a9ce269d1db1b2ae0bcb802fc9

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
<<<<<<< HEAD
      path: '/detailRecharge',
      name: 'DetailRecharge',
      component: DetailRecharge
=======
      path: '/setting',
      name: 'Setting',
      component: Setting,
      children: [
        { name: 'SettingPay', path: 'pay', component: SettingPay }
      ]
>>>>>>> 8a02dd6f002027a9ce269d1db1b2ae0bcb802fc9
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
