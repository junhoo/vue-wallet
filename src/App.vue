<template>
  <div id='app'>
    <router-view/>
    <!-- :types='dialogBtnType'-->
    <dialog-order
                :show.sync='dialogOrderVal'
                :state='dialogFlowVal'
                :money='dialogFlowMoney'
                :buttonType='dialogBtnType'
                :account='dialogFlowAccount'
                v-on:dialogOrderEvent='onDialogOrder'>
    </dialog-order>
    <!-- <socket-view ref='socket'></socket-view> -->
  </div>
</template>

<script>
import axios from 'axios'
// import SocketView from '@/views/socket/Socket.vue'
import DialogOrder from 'common/order_dialog/Dialog'
export default {
  name: 'App',
  components: {
    // SocketView,
    DialogOrder
  },
  created () {
    // this.getSocketUrl()
    this.loop()
  },
  data () {
    return {
      loopAutoTimer: null,
      dialogOrderVal: false, // 显示
      dialogBtnType: '',
      dialogFlowVal: 1, // 1 匹配中 2 匹配成功 3 到账/已付款 4 收款
      dialogFlowMoney: '',
      dialogFlowAccount: ''
    }
  },
  methods: {
    loop () {
      this.loopAutoTimer = setInterval(() => {
        if (this.dialogOrderVal === false) {
          this.$bus.on('openDialog', params => {
            // console.log('openDialog')
            // console.log(params, 111)
            if (params === 'open') {
              this.dialogOrderVal = true
              // const _dialog = JSON.parse(localStorage.getItem('dialogOrder'))
              // this.dialogFlowVal = _dialog.dialogFlowVal
            } else {
              this.dialogOrderVal = false
            }
            if (this.dialogOrderVal === true) {
              this.$bus.off('openDialog')
            }
          })
        }
        if (this.dialogOrderVal === true) {
          this.$bus.off('openDialog')
        }
        this.dialogBtnType = localStorage.getItem('dialogBtnType')
        const _obj = JSON.parse(localStorage.getItem('dialogOrder'))
        this.dialogFlowVal = parseInt(_obj.dialogFlowVal) || 1
        this.dialogFlowMoney = _obj.dialogFlowMoney
        this.dialogFlowAccount = _obj.dialogFlowAccount
      }, 500)
    },

    onDialogOrder (type) {
      console.log('app-onDialog' + type)
      if (type === '查看' || type === '付款') {
        const orderNo = JSON.parse(localStorage.getItem('matchOrderNo'))
        let stateVal = 1
        if (type === '付款') {
          stateVal = 2
          sessionStorage.setItem('payRadio', 'open')
        }
        // clearInterval(this.loopTimer)
        const buttonVal = localStorage.getItem('dialogBtnType')
        const ordeType = buttonVal === '充值' ? 1 : 2
        this.jumpDetail(ordeType, stateVal, orderNo) // 1 已提交
      }
      if (type === '收款') {
        this.finishOrder()
      }
      if (type === 'close') {
        // 刷新订单数据
      }
      this.dialogFlowVal = 1 // 重置 匹配中...
    },

    // 查看详情
    jumpDetail (ordeType, status, orderId) {
      console.log(ordeType, status, orderId)
      // 1充值，2提现
      if (ordeType === 1) {
        this.$router.push({
          name: 'DetailRecharge',
          query: {
            orderid: orderId,
            status: status
          }
        })
      } else {
        this.$router.push({
          name: 'Detail',
          query: {
            orderid: orderId,
            status: status
          }
        })
      }
    },

    // 确认收款
    finishOrder () {
      const orderNo = localStorage.getItem('matchOrderNo')
      // localStorage.setItem('matchOrderNo', '')
      const data = {
        'app-name': '123',
        'merchant_type': '1', // 1:A端
        'merchant_code': '12345',
        'order_no': orderNo,
        'third_user_id': '1'
      }
      console.log('app-确认收款')
      console.log(data)
      const url = this.$api.order + '/api/order/confirmOrder'
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            const buttonVal = localStorage.getItem('dialogBtnType')
            const type = buttonVal === '充值' ? '1' : '2'
            this.getOrderInfo(type)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问')
        })
    },

    getSocketUrl () {
      console.log('getSocketUrl')
      const url = this.$api.socket
      axios.post(url, {})
        .then(res => {
          res = res.data
          console.log(res)
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误')
        })
    }
  }
}
</script>

<style>
html,body{
  height: 100%;
  width: 100%;
}
</style>
