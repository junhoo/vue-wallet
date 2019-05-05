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
        this.socket.onmessage = this.getMessage
      }
    },
    open () {
      // console.log('1.0 socket连接成功')
      this.randomStr = Math.random().toString(36).substr(2)
      const data = {
        'from_uid': 123, // 用户id
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
    getMessage (msg) {
      let res = msg.data
      // console.log('3.0 socket接收')
      // console.log(res)
      try {
        res = JSON.parse(res)
      } catch (error) {
        console.log('socket接收-解析失败')
      }
      // console.log(res.from_uid, 10000)
      // console.log(this.randomStr, res.rand_str)
      if (res.from_uid === 10000 && this.randomStr === res.rand_str) {
        console.log('接收ok')
      }
      // 1 已提交 2 待付款 3 未到账 4 已取消 5 已完成 6已匹配 7 待确认 8 自动取消
    },
    send (params) {
      // console.log('2.0 socket发送')
      // console.log(params)
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
