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
      path: '/h5/',
      name: 'Home2',
      component: Home2
    },
    {
      path: '/h5/home2',
      name: 'Home2',
      component: Home2
    },
    {
      path: '/h5/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/h5/detailRecharge',
      name: 'DetailRecharge',
      component: DetailRecharge
    },
    {
      path: '/h5/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/h5/setting/SettingCertification',
      name: 'SettingCertification',
      component: SettingCertification
    },
    {
      path: '/h5/setting/pay',
      name: 'SettingPay',
      component: SettingPay
    },
    {
      path: '/h5/setting/bound',
      name: 'SettingBound',
      component: SettingBound
    },
    {
      path: '/h5/rechargeDetail',
      name: 'RechargeDetail',
      component: RechargeDetail
    },
    {
      path: '/h5/withdrawalDetail',
      name: 'WithdrawalDetail',
      component: WithdrawalDetail
    },
    {
      path: '/h5/appeal',
      name: 'Appeal',
      component: Appeal
    },
    {
      path: '/h5/appealList',
      name: 'AppealList',
      component: AppealList
    },
    {
      path: '/h5/appealDetail',
      name: 'AppealDetail',
      component: AppealDetail
    },
    {
      path: '/h5/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/h5/setting2',
      name: 'Setting2',
      component: Setting2
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
