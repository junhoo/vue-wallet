<template>
  <div>
    <button @click='send'></button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Socket',
  data () {
    return {
      path: 'ws://192.168.1.249:9508',
      socket: '',
      randomStr: ''
    }
  },
  // props: {
  //   url: ''
  // },
  mounted () {
    // 初始化
    this.init()
    // this.service()
  },
  methods: {
    service () {
      // console.log('---')
      axios.get(this.$api.socket)
        .then(res => {
          // console.log('s-222')
          // console.log(res)
        })
        .catch(e => {
          // console.log('e-333')
          // console.log(e)
        })
    },
    init () {
      if (typeof (WebSocket) === 'undefined') {
        console.log('当天环境不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.message
      }
    },
    open () {
      // console.log('1.0 socket连接成功')
      this.randomStr = Math.random().toString(36).substr(2)
      const userMsg = JSON.parse(sessionStorage.getItem('userMsg'))
      const data = {
        'from_uid': userMsg.id, // 用户id
        'to_uid': 10000, // 接收id
        'type': 101, // 类型
        'rand_str': this.randomStr,
        'msg': {
          'device': 'android 6.7.8.9' // 设备号
        }
      }
      this.send(JSON.stringify(data))
    },
    error () {
      console.log('连接错误')
    },
    message (msg) {
      let res = msg.data
      console.log('3.0 socket接收')
      console.log(res)
      try {
        res = JSON.parse(res)
      } catch (error) {
        console.log('socket接收-解析失败')
      }
      // console.log(res.from_uid, 10000)
      // console.log(this.randomStr, res.rand_str)
      if (res.from_uid === 10000 && this.randomStr === res.rand_str) {
        console.log('4.0 匹配ok')
      }
      res = {
        from_uid: 10000,
        to_uid: '91940140',
        type: 301,
        rand_str: 1557114310.4482,
        msg: {
          event_type: 'transaction_rechange',
          data: {
            user_id: '91940140',
            status: 6,
            seller_status: 0,
            buyer_id: '91940140',
            seller_id: '0',
            order_amount: '200.00',
            order_no: '1835401557114309',
            choice_pay_type: '1',
            pay_type: 1,
            order_type: 1,
            rate: '0.10',
            rate_type: 1,
            cancel_time: 0,
            add_time: 1557114309,
            pay_prove_pic: null,
            update_time: 0,
            bonus_rate: '0.10',
            history_user_id: null,
            real_amount: '200.00',
            rest_time: 0,
            a_status: 1,
            a_status_str: '\u5339\u914d\u4e2d'
          }
        }
      }
      if (res.type === 301) {
        const resMsg = res.msg
        // const resInfo = resMsg.data
        this.$emit('onChildSocket', resMsg)
      }
    },
    send (params) {
      // console.log('2.0 socket发送')
      this.socket.send(params)
    },
    close () {
      console.log('socket已经关闭')
    }
  },
  destroyed () {
    // 销毁监听
    this.socket.onclose = this.close
  }
}
</script>
