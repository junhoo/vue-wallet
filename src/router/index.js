import Home from '@/views/home/Home'
import Detail from '@/views/detail/Detail'
import RechargeDetail from '@/views/detail/RechargeDetail' // 充值详情
import WithdrawalDetail from '@/views/detail/WithdrawalDetail' // 提现详情
import DetailRecharge from '@/views/detail/DetailRecharge'
import Setting from '@/views/setting/Setting'
import SettingCertification from '@/views/setting/SettingCertification'
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
      path: '/recharge_detail',
      name: 'RechargeDetail',
      component: RechargeDetail
    },
    {
      path: '/withdrawal_detail',
      name: 'WithdrawalDetail',
      component: WithdrawalDetail
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
