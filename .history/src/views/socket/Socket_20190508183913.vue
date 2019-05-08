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
      existServer: true,
      heartTimer: null,
      relinkTimer: null,
      path: 'ws://192.168.1.249:9508',
      timeoutnum: null, // 断开 重连倒计时
      websocket: '',
      randomStr: ''
    }
  },
  // props: {
  //   url: ''
  // },
  mounted () {
    // 初始化
    if (sessionStorage.getItem('userMsg')) {
      console.log('0.0 消息启动')
      this.init()
    }
    // this.service()
    this.heartbeat()
  },
  deactivated () {
    console.log('x.x 消息离开')
  },
  methods: {
    service () {
      // console.log('---')
      axios.get(this.$api.socket)
        .then(res => {
          // console.log('s-222')
          // console.log(res)
          // {
          //   "status": "success",
          //   "code": 200,
          //   "msg": "成功",
          //   "time": 1554959616,
          //   "data": {
          //     "url": "ws://192.168.1.249:9508"
          //   }
          // }
        })
        .catch(e => {
          // console.log('e-333')
          // console.log(e)
        })
    },
    init () {
      console.log('-- socket：inits')
      if (typeof (WebSocket) === 'undefined') {
        console.log('环境不支持socket')
      } else {
        try {
          // 实例化socket
          this.websocket = new WebSocket(this.path)
          // 监听socket连接
          this.websocket.onopen = this.open
          // 监听socket错误信息
          this.websocket.onerror = this.error
          // 监听socket消息
          this.websocket.onmessage = this.message
        } catch (error) {
          // this.reconnect()
        }
      }
    },
    // 重新连接
    reconnect () {
      this.init()
      // if (this.existServer) {
      //   clearInterval(this.heartTimer)
      //   return
      // }
      // this.relinkTimer = setInterval(() => {
      //   console.log('>>> 重新连接')
      //   this.init()
      // }, 5000)
    },
    heartbeat () {
      this.heartTimer = setInterval(() => {
        console.log('')
        console.log('❤ 心跳查看')
        this.send()
        if (this.existServer) {
          console.log('-1 服务器 挂了')
          clearInterval(this.heartTimer)
          return
        } else {
          console.log('-1 服务器 ok了')
        }
      }, 5000)
    },
    open () {
      console.log('1.0 socket打开成功')
      this.send()
    },
    error () {
      console.log('error 连接错误')
    },
    message (msg) {
      let res = msg.data
      console.log('3.0 socket接收')
      console.log(res)
      let aaa = res
      res = null
      setTimeout(() => {
        res = aaa
      }, 10000)
      try {
        if (res) {
          this.existServer = true
          res = JSON.parse(res)
        } else {
          this.existServer = false
          return
        }
      } catch (error) {
        console.log('socket接收-解析失败')
      }
      // console.log(res.from_uid, 10000)
      // console.log(this.randomStr, res.rand_str)
      if (res.from_uid === 10000 && this.randomStr === res.rand_str) {
        console.log('4.0 匹配ok')
      }
      // setTimeout(() => {
      //   res = {
      //     from_uid: 10000,
      //     to_uid: '91940140',
      //     type: 301,
      //     rand_str: 1557114310.4482,
      //     msg: {
      //       event_type: 'transaction_rechange',
      //       data: {
      //         user_id: '91940140',
      //         status: 6,
      //         seller_status: 0,
      //         buyer_id: '91940140',
      //         seller_id: '0',
      //         order_amount: '200.00',
      //         order_no: '1835401557114309',
      //         choice_pay_type: '1,3',
      //         pay_type: 3,
      //         order_type: 1,
      //         rate: '0.10',
      //         rate_type: 1,
      //         cancel_time: 0,
      //         add_time: 1557114309,
      //         pay_prove_pic: null,
      //         update_time: 0,
      //         bonus_rate: '0.10',
      //         history_user_id: null,
      //         real_amount: '200.00',
      //         rest_time: 0,
      //         account: '银行卡(Mingzi)',
      //         a_status: 6,
      //         a_status_str: '匹配成功' // %E5%8C%B9%E9%85%8D%E4%B8%AD
      //       }
      //     }
      //   }
      //   this.$emit('onChildSocket', res.msg)
      // }, 1000)

      // setTimeout(() => {
      //   res.msg.data.a_status_str = '自动收款'
      //   this.$emit('onChildSocket', res.msg)
      // }, 4000)

      // setTimeout(() => {
      //   res.msg.data.a_status_str = '接单用户取消'
      //   this.$emit('onChildSocket', res.msg)
      // }, 4000)

      // setTimeout(() => {
      //   res.msg.data.a_status_str = '未到账'
      //   this.$emit('onChildSocket', res.msg)
      // }, 4000)
      // setTimeout(() => {
      //   res.msg.data.a_status_str = '交易完成'
      //   this.$emit('onChildSocket', res.msg)
      // }, 7000)
      // decodeURIComponent
      if (res.type === 301) {
        res.msg.data.a_status_str = decodeURIComponent(res.msg.data.a_status_str)
        this.$emit('onChildSocket', res.msg)
      }
    },
    send () {
      // console.log('2.0 socket发送')
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
      const params = JSON.stringify(data)
      this.websocket.send(params)
    },
    close () {
      console.log('socket已经关闭')
    }
  },
  destroyed () {
    // 销毁监听
    this.websocket.onclose = this.close
  }
}
</script>
