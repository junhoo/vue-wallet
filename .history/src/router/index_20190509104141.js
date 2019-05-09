// import Vue from 'vue'
// import Router from 'vue-router'
import Home2 from '@/views/home/Home2'
import Detail from '@/views/detail/Detail'
import RechargeDetail from '@/views/detail/RechargeDetail' // 充值详情
import WithdrawalDetail from '@/views/detail/WithdrawalDetail' // 提现详情
import Appeal from '@/views/detail/Appeal' // 申诉
import DetailRecharge from '@/views/detail/DetailRecharge'
import Setting from '@/views/setting/Setting'
import AppealList from '@/views/setting/AppealList' // 申诉列表
import AppealDetail from '@/views/setting/AppealDetail' // 申诉详情
import SettingCertification from '@/views/setting/SettingCertification'
import SettingPay from '@/views/setting/SettingPay'
import SettingBound from '@/views/setting/SettingBound'
import Order from '@/views/order/Order'

import Setting2 from '@/views/setting/Setting2'

const Vue = require('vue')
const Router = require('vue-router')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home2',
      component: Home2
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
      path: '/rechargeDetail',
      name: 'RechargeDetail',
      component: RechargeDetail
    },
    {
      path: '/withdrawalDetail',
      name: 'WithdrawalDetail',
      component: WithdrawalDetail
    },
    {
      path: '/appeal',
      name: 'Appeal',
      component: Appeal
    },
    {
      path: '/appealList',
      name: 'AppealList',
      component: AppealList
    },
    {
      path: '/appealDetail',
      name: 'AppealDetail',
      component: AppealDetail
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/setting2',
      name: 'Setting2',
      component: Setting2
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
