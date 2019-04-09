import Home from '@/views/home/Home'
import Detail from '@/views/detail/Detail'
import DetailRecharge from '@/views/detail/DetailRecharge'
// import Vue from 'vue'
// import Router from 'vue-router'

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
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
