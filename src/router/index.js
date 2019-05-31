const Home2 = () => import('@/views/home/Home2')
const RechargeDetail = () => import('@/views/detail/RechargeDetail')
const WithdrawalDetail = () => import('@/views/detail/WithdrawalDetail')
const Appeal = () => import('@/views/detail/Appeal')
const Setting = () => import('@/views/setting/Setting')
const AppealList = () => import('@/views/setting/AppealList')
const AppealDetail = () => import('@/views/setting/AppealDetail')
const SettingCertification = () => import('@/views/setting/SettingCertification')
const SettingPay = () => import('@/views/setting/SettingPay')
const SettingBound = () => import('@/views/setting/SettingBound')
const Order = () => import('@/views/order/Order')
const Chat = () => import('@/views/chat/Chat')
const Setting2 = () => import('@/views/setting/Setting2')

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
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
