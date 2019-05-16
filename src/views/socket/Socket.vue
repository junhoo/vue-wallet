<template>
  <div>
    <button></button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Socket',
  data () {
    return {
      existServer: false,
      timerHeart: null,
      timerPopup: null,
      timerConnect: null,
      path: 'ws://192.168.1.249:9508',
      websocket: '',
      randomStr: '',
      saveMsg: {}
    }
  },
  // props: {
  //   url: ''
  // },
  mounted () {
    // 初始化
    if (sessionStorage.getItem('userMsg')) {
      // this.init()
    }
    // this.service()
  },
  methods: {
    service () {
      // console.log('---')
      axios.get(this.$api.socket)
        .then(res => {
          console.log('')
          console.log('=======service==========')
          console.log(res)
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
      console.log('')
      console.log('··· 消息启动')
      console.log('=== socket：inits')
      if (typeof (WebSocket) === 'undefined') {
        console.log('环境不支持socket')
      } else {
        try {
          // 实例化socket
          this.websocket = new WebSocket(this.path)
          // 监听socket连接
          this.websocket.onopen = this.wsopen
          // 监听socket错误信息
          this.websocket.onerror = this.wserror
          // 监听socket消息
          this.websocket.onmessage = this.wsmessage
          // 监听socket关闭
          this.websocket.onclose = this.wsclose
        } catch (error) {
        }
      }
      this.heartbeat()
    },
    heartbeat () {
      this.timerHeart = setInterval(() => {
        // console.log('')
        // console.log('❤ 心跳查看')
        if (this.existServer) {
          this.send()
          // console.log('-1 服务器 ok')
        } else {
          // console.log('-1 服务器 挂了')
          clearInterval(this.timerHeart)
          this.restart()
        }
        // console.log('')
      }, 15000)
    },
    wsopen () {
      console.log('1.0 socket打开成功')
      this.send()
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
    wsmessage (msg) {
      let res = msg.data
      // console.log('3.0 socket接收')
      // console.log(res)
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
        // console.log('4.0 匹配ok')
      }
      // decodeURIComponent
      if (res.type === 301) {
        res.msg.data.a_status_str = decodeURIComponent(res.msg.data.a_status_str)
        this.saveMsg = res.msg
        console.log('')
        console.log('··· message消息 ···')
        console.log(res)
        console.log(res.msg.data.a_status_str)
        console.log(res.msg.data.order_no)
        this.$emit('onchildsocket', this.saveMsg)
        // console.log(this.$emit)
        console.log(' da da da')
        const orderno = res.msg.data.order_no
        const orderType = parseInt(res.msg.data.order_type)
        if (orderType === 1) {
          sessionStorage.setItem(orderno, '0')
        }
      }
    },
    restart () {
      if (this.timerConnect) {
        clearTimeout(this.timerConnect)
      }
      this.timerConnect = setTimeout(() => {
        console.log('webs 重新连接')
        this.init()
      }, 2000)
    },
    wsclose () {
      console.log('socket已经关闭')
      this.restart()
    },
    wserror () {
      console.log('error 连接错误')
      this.restart()
    }
  },
  destroyed () {
    // 销毁监听
    // console.log('=== socket: destroyed')
    // this.websocket.onclose = this.close
  }
}
</script>
