<template>
  <div>
    <header>
      <!-- 标题 -->
      <div class="title-bar clearfix">
        <div class="left" >
          <p class="empty"></p>
          <p class="icon-setting" @click="jumpPage('Setting2')"></p>
        </div>
        <div class="middle">Wallet</div>
        <div class="right">
          <p class="empty"></p>
          <p class="icon-option" @click="jumpPage('Order')"></p>
        </div>
      </div>

      <!-- 金额区 -->
      <!-- <div class="save_btn" @click="savecanvas">保存图片</div>
      <div class="canvas" ref="canvas">
        <img :src="pay_url" style="width: 200px; height: 200px;">
      </div> -->
      <p class="money-use" >{{headerInfo.amount_income}}</p>
      <p class="money-ban" >冻结:{{headerInfo.freezing_amount}}</p>
      <div class="icon-service" @click="jumpPage('Chat')"></div>
    </header>

    <main>
      <!-- 首页-提交块 -->
      <home-submit
                  v-show="!hasDetail"
                  :userMsg="userMsg"
                  :headerInfo="headerInfo"
                  @onchildsubmit='onChildSubmit'>
      </home-submit>
      <!-- 首页-订单详情-->
      <home-detail
                  v-show="hasDetail"
                  :type="detailType"
                  :timed="rest_time"
                  :detailInfo="detailInfo"
                  @onchilddetail='onChildDetail'>
      </home-detail>
    </main>

    <transition name="fade">
      <div class="order-matching" v-show="showMatching">
        <div class="img-box">
          <div class="imgs"></div>
        </div>
        <p class="text-big">订单匹配中</p>
        <p class="text-small">系统正在为您发起{{detailType}}申请</p>

        <div class="cancel-btn">
          <div class="content">
            <div class="box" @click="clickCancel()">取消订单</div>
          </div>
        </div>
      </div>
    </transition>

    <order-popup :show.sync='showPopup'
                  :name='popupName'
                  :money='popupMoney'
                  :account='popupAccount'
                  @onchildpopup='onChildPopup'>
    </order-popup>

    <van-popup v-model="showHint" position="top" :overlay="false">
      <p class="popup-hint" @click="showTopHint('close')">{{textHint}}</p>
    </van-popup>

    <!-- <socket-view ref='socket' @onchildsocket='onChildSocket'></socket-view> -->
    <common-loading :show.sync='loadingVal' :mask="true"></common-loading>
  </div>
</template>

<script>
import axios from 'axios'
import { post } from '@/assets/js/fetch'
import { encrypt, decrypt } from '@/assets/js/secret.js'
import HomeSubmit from './components/Submit'
import HomeDetail from './components/Detail'
import OrderPopup from 'common/popup/Popup'
import SocketView from '@/views/socket/Socket.vue'
import CommonLoading from 'common/loading/Loading'
export default {
  name: 'Home2',
  components: {
    HomeSubmit,
    HomeDetail,
    OrderPopup,
    SocketView,
    CommonLoading
  },
  created () {
    // ?app_name=123&merchant_type=1&merchant_code=12345&third_user_id=500
    const format = {
      'app-name': this.$route.query.app_name,
      'merchant_type': this.$route.query.merchant_type, // 1:A端 2:B端
      'merchant_code': this.$route.query.merchant_code,
      'third_user_id': this.$route.query.third_user_id,
      'choice_pay_type': ''
    }
    this.postFormat = format
    // this.wbservice()
    this.autoLogin()
    sessionStorage.setItem('reqformat', JSON.stringify(format))
    if (sessionStorage.getItem('randomcode')) {
      this.getTotalCoin()
      this.getUserMsg()
      this.getCurOrder()
    }
  },
  data () {
    return {
      pay_url: 'https://desk-fd.zol-img.com.cn/t_s144x90c5/g2/M00/0F/07/ChMlWlzSob-IDqyyAAQWLsmmYHIAAJ3pgPoeNMABBZG795.jpg',
      // pay_url: 'http://user.service.168mi.cn/uploads/ali_pay/20190507/17d5cdd704f0cfa6b355a2d5e0ecfdbf.jpg',
      timerLink: null,
      timerHint: null,
      textHint: '',
      detailType: '充值', // 充值 提现 未到账
      boundType: '',
      hasDetail: false,
      showPopup: false,
      showHint: false,
      showMatching: false,
      loadingVal: false,
      popupMoney: '',
      popupAccount: '',
      popupName: '自动收款', // 去绑定 去实名 禁止交易 充值匹配成功 提现匹配成功 等待确认收款 自动确认收款 被取消 交易完成
      postFormat: {},
      userMsg: {},
      headerInfo: {
        amount_income: 0,
        freezing_amount: 0
      },
      detailInfo: {
        choice_pay_type: '',
        a_status_str: ''
      },
      order_no: '',
      rest_time: 0,
      order_type: '1', // 1充值 2提现
      existServer: false,
      timerHeart: null,
      timerPopup: null,
      timerConnect: null,
      path: '', // ws://192.168.1.249:9508
      websocket: '',
      randomStr: '',
      saveMsg: {},
      tests: '1558063270'
    }
  },
  methods: {
    getCurOrder () {
      console.log(' ')
      this.loadingVal = true
      const url = this.$api.order + '/api/order/getOrderForA'
      let data = { token: sessionStorage.getItem('randomcode') }
      post(url, data)
        .then(res => {
          this.loadingVal = false
          console.log('home: A端订单', res)
          const _list = res.data.list
          if (!_list) { return }

          // 倒计时
          let countTimed = parseInt(_list.rest_time)
          if (countTimed <= 600) {
            var nowTime = new Date()
            nowTime = nowTime.getTime()
            countTimed = parseInt(nowTime) + countTimed * 1000
          }
          this.rest_time = countTimed
          this.popupAccount = _list.account

          // 切换页面逻辑
          _list.a_status_str = decodeURIComponent(_list.a_status_str)
          if (_list.a_status_str === '接单用户取消,匹配中' || (_list.a_status_str === '自动取消' && parseInt(_list.order_type) === 2)) {
            console.log('home: rematch')
            this.detailType = parseInt(_list.order_type) === 1 ? '充值' : '提现'
            this.order_no = _list.order_no
            this.order_type = _list.order_type
            this.showMatching = true
            return
          }

          const orderno = _list.order_no
          console.log(_list.a_status_str)
          console.log(orderno)
          if (sessionStorage.getItem(orderno) === '0' && _list.a_status_str === '交易完成') {
            this.popupName = '交易完成'
            this.popupMoney = _list.order_amount
            this.showPopup = true
            sessionStorage.setItem(orderno, '1')
          }
          const mock = { data: _list }
          const pools = ['匹配中', '匹配成功', '重新匹配成功', '未到账']
          if (pools.includes(_list.a_status_str)) {
            console.log('home: oldshow')
            this.onmessage(mock)
          }
        })
        .catch(e => {
          console.log(e)
          this.loadingVal = false
        })
    },

    testAes () {
      console.log('home: === xxx')
      const addstring = '6666666'
      const encode = encrypt(addstring)
      const decode = decrypt(encode)
      console.log('home: === 原值' + addstring)
      console.log('home: === 加密' + encode)
      console.log('home: === 解密' + decode)
    },

    autoLogin () {
      const hasLogin = sessionStorage.getItem('randomcode')
      if (hasLogin !== '' && hasLogin !== null) { return }
      let data = this.postFormat
      const url = this.$api.user + '/api/login/auto_login'

      post(url, data)
        .then(res => {
          console.log('home: 1.0登录')
          const _obj = res.data.list
          if (typeof _obj === 'string') {
            sessionStorage.setItem('randomcode', _obj)
            this.getTotalCoin()
            this.getUserMsg()
            this.getCurOrder()
          } else {
            this.showTopHint(res.msg)
          }
        })
        .catch(e => {
          console.log('autoLogin')
          console.log(e)
          this.showTopHint(e.msg)
        })
    },

    getTotalCoin () {
      // const url = 'http://padmin.service.168mi.cn/admin/OutInterface/getTotal/user_id/500'
      let data = { token: sessionStorage.getItem('randomcode') }
      const url = this.$api.user + '/api/User/getTotalCoin'
      post(url, data)
        .then(res => {
          const total = res.data.list.total || 0
          const freezing = res.data.list.freezing || 0
          this.headerInfo.amount_income = parseFloat(total).toFixed(2)
          this.headerInfo.freezing_amount = parseFloat(freezing).toFixed(2)
        })
        .catch(e => {
          console.log(e)
          this.showTopHint('网络错误2.1')
        })
    },

    // 获取用户信息
    getUserMsg () {
      let data = { token: sessionStorage.getItem('randomcode') }
      let url = this.$api.user + '/api/user/getUserInfo'

      post(url, data)
        .then(res => {
          console.log('home: 2.0用户信息')
          const userInfo = res.data.list
          this.userMsg = userInfo
          if (sessionStorage.getItem('userMsg') === null) { // 没数据
            // this.$refs.socket.init()
            // this.wsinit()
            this.wbservice()
          }
          sessionStorage.setItem('userMsg', JSON.stringify(userInfo))
        })
        .catch(e => {
          console.log(e)
          this.showTopHint(e.msg)
        })
    },

    cancelOrder () {
      console.log('home: 去取消订单')
      this.loadingVal = true
      let data = {
        token: sessionStorage.getItem('randomcode'),
        order_no: this.order_no
      }
      const url = this.$api.order + '/api/order/cancelRechangeOrder'
      post(url, data)
        .then(res => {
          if (res.data.list === true) {
            console.log('home: 取消订单成功')
            this.showMatching = false
            this.showPopup = false
            this.hasDetail = false
            this.showTopHint('成功')
            this.getTotalCoin()
          } else {
            console.log('home: 取消订单失败')
            console.log(res.data.list)
            this.showTopHint('取消订单错误')
          }
          this.loadingVal = false
        })
        .catch(e => {
          console.log(e)
          this.loadingVal = false
          this.showMatching = false
          this.showTopHint(e.msg || '取消网络错误')
        })
    },

    clickCancel () {
      this.cancelOrder()
    },

    clickPopup () {
      setTimeout(() => {
        this.showMatching = false
        this.showPopup = true
      }, 500)
    },
    clickMacthing () {
      this.showMatching = !this.showMatching
    },

    onChildSubmit (type) {
      console.log('提交: >>> 返回结果')
      console.log(type)
      if (type === 'loadingShow' || type === 'loadingClose') {
        this.getTotalCoin()
        this.loadingVal = type === 'loadingShow'
        return
      }
      if (type === '去匹配') {
        console.log('home: home 下单成功-订单匹配中')
        this.showMatching = true
        this.order_no = sessionStorage.getItem('submitno')
        return
      }
      if (type === '去实名') {
        this.popupName = '去实名'
      } else {
        this.boundType = type
        this.popupName = '去绑定'
      }
      if (type === '被取消') {
        this.popupName = '被取消'
      }
      if (type === '禁止交易') {
        this.popupName = '禁止交易'
      }
      this.showPopup = true
    },

    onChildDetail (type) {
      console.log('home: >>> 详情点击')
      console.log(type)
      if (type === '取消订单') {
        this.cancelOrder()
        return
      }
      if (type.includes('充值')) {
        this.timerLink = setTimeout(() => {
          this.$router.push({
            name: 'RechargeDetail',
            query: { order_no: this.order_no }
          })
        }, 50)
      }
      if (type.includes('提现')) {
        this.timerLink = setTimeout(() => {
          this.$router.push({
            name: 'WithdrawalDetail',
            query: { order_no: this.order_no }
          })
        }, 50)
      }
    },

    onChildPopup (val) {
      let type = val
      console.log('')
      console.log('home: >>> 弹窗入口')
      if (this.timerLink) {
        clearTimeout(this.timerLink)
      }
      if (type === '去绑定') {
        this.timerLink = setTimeout(() => {
          this.$router.push({ path: '/setting/bound', query: { 'type': this.boundType, 'isbound': 'n' } })
        }, 50)
      }
      if (type === '去实名') {
        this.timerLink = setTimeout(() => {
          this.$router.push({ path: '/setting/settingCertification' })
        }, 50)
      }
      if (type === '查看订单') {
        type = this.order_type === 1 ? '充值查看订单' : '提现查看订单'
      }
      console.log(type)
      // 跳转充值详情
      if (type === '立即付款' || type === '充值查看订单') {
        this.timerLink = setTimeout(() => {
          this.$router.push({
            name: 'RechargeDetail',
            query: { order_no: this.order_no }
          })
        }, 50)
      }
      // 跳转提现详情
      if (type === '去确认收款' || type === '提现查看订单') {
        this.timerLink = setTimeout(() => {
          this.$router.push({
            name: 'WithdrawalDetail',
            query: { order_no: this.order_no }
          })
        }, 50)
      }
    },

    onChildSocket (info) {
      console.log('return home')
      setTimeout(() => {
        this.onmessage(info)
      }, 3000)
    },

    onmessage (info) {
      console.log('')
      console.log('··· home: >>> 消息入口')
      // a_status_str = 匹配中 匹配成功 已取消 交易完成|确认收款 未到账 接单用户取消 重新匹配成功 交易完成 自动收款 ->未知字段
      const orderInfo = info.data
      const orderType = orderInfo.a_status_str
      console.log(orderType)
      console.log(orderInfo.order_no)
      this.order_no = orderInfo.order_no
      this.order_type = orderInfo.order_type
      this.popupMoney = orderInfo.order_amount
      let countTimed = parseInt(orderInfo.rest_time)
      if (countTimed <= 600) {
        var nowTime = new Date()
        nowTime = nowTime.getTime()
        countTimed = parseInt(nowTime) + countTimed * 1000
      }
      this.rest_time = countTimed

      if (orderType === '匹配中') {
        this.showMatching = true
        return
      }

      let stateName = ''
      // orderType === '接单用户取消'
      if (orderType.includes('接单用户取消,匹配中')) { // 接单用户取消,匹配中
        this.hasDetail = false
        this.popupName = orderInfo.order_type === 1 ? '用户充值取消' : '用户提现取消'
        this.showPopup = true
        this.showMatching = true
        return
      } else {
        stateName = '结束'
      }

      if (orderInfo.order_type === 1) { // 1充值 2提现
        if (orderType === '匹配成功' || orderType === '重新匹配成功') {
          stateName = '充值匹配成功'
        }
        this.detailType = '充值'
      } else {
        if (orderType === '匹配成功' || orderType === '重新匹配成功') {
          stateName = '提现匹配成功'
        }
        this.detailType = '提现'
      }

      if (orderType === '未到账' && orderInfo.order_type === 1) {
        stateName = '充值未到账'
        this.detailType = '充值未到账'
      }

      if (orderType === '未到账' && orderInfo.order_type === 2) {
        stateName = '等待确认收款'
        this.detailType = '提现未到账'
      }

      if (orderType === '交易完成') {
        this.hasDetail = false
        this.popupName = '交易完成'
        this.showPopup = true
        const orderno = orderInfo.order_no
        sessionStorage.setItem(orderno, '1')
        this.getTotalCoin()
        return
      }

      if (orderType === '自动收款') {
        this.hasDetail = false
        this.popupName = '自动确认收款'
        this.showPopup = true
        return
      }

      if (orderType === '自动取消') {
        this.hasDetail = false
        this.popupName = '被取消'
        this.showPopup = true
        return
      }

      console.log(stateName)
      if (stateName === '结束') { return }
      this.popupAccount = orderInfo.account
      this.showMatching = false
      this.detailInfo = orderInfo
      // popupName = 充值匹配成功 提现匹配成功 等待确认收款 自动确认收款 被取消 交易完成
      this.hasDetail = true
      console.log('this.hasDetail')
      console.log(this.hasDetail)
      this.popupName = stateName
      if (orderType === '未到账' && parseInt(orderInfo.order_type) === 1) {
        this.showPopup = false
      } else {
        this.showPopup = true
      }
    },

    showTopHint (info) {
      if (info === 'close') {
        this.showHint = false
        return
      }
      this.textHint = info
      this.showHint = true
      if (this.timerHint) {
        clearTimeout(this.timerHint)
      }
      this.timerHint = setTimeout(() => {
        this.showHint = false
      }, 1500)
    },

    jumpPage (name) {
      this.$router.push({ name: name })
    },

    // websocket-url
    wbservice () {
      if (sessionStorage.getItem('wbp') !== null && sessionStorage.getItem('wbp') !== '') {
        return
      }
      axios.get(this.$api.socket)
        .then(res => {
          console.log('')
          console.log('=======service==========')
          console.log(res)
          this.path = res.data.data.url
          sessionStorage.setItem('wbp', this.path)
          this.wsinit()
        })
        .catch(e => {
          console.log('get wb request error')
          console.log(e)
        })
    },
    wsinit () {
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
      // this.heartbeat()
    },
    heartbeat () {
      this.timerHeart = setInterval(() => {
        // console.log('')
        // console.log('❤')
        if (this.existServer) {
          this.send()
          // console.log('-1 服务器 ok')
        } else {
          // console.log('-1 服务器 挂了')
          clearInterval(this.timerHeart)
          this.restart()
        }
        // console.log('')
      }, 20000)
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
      console.log('3.0 socket接收')
      console.log(res)
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
      if (res.from_uid === 10000 && this.randomStr === res.rand_str) {
        // console.log('4.0 匹配ok')
      }
      if (res.type === 301) {
        res.msg.data.a_status_str = decodeURIComponent(res.msg.data.a_status_str)
        this.saveMsg = res.msg
        console.log('')
        console.log('··· message消息 ···')
        console.log(res)
        console.log(res.msg.data.a_status_str)
        console.log(res.msg.data.order_no)
        if (res.msg.data.a_status_str === '匹配成功') {
          setTimeout(() => {
            this.getCurOrder()
          }, 1500)
        } else {
          this.onChildSocket(this.saveMsg)
        }
        console.log('---')
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
        this.wsinit()
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
  }
}
</script>

<style lang="less" scoped>
@white: #ffffff;
@bgColor: #f8f8f8;
@blueColor: #4264FB;

@keyframes spin {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: right 0;
  }
}

/deep/ .van-popup--top {
  background: rgba(0, 32, 78, .9);
}

header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 339px;
  background: url('~imgurl/home_top_bg.png') no-repeat;
  background-size: 100% 100%;
  z-index: 1000;
  .title-bar {
    position: relative;
    height: 98px;
    .left {
        position: relative;
        float: left;
        width: 33.333333%;
        .icon-setting {
          height: 98px;
          width: 120px;
          line-height: 98px;
          font-size: 32px;
          background: url('~imgurl/header_setting.png') no-repeat left 52px center;
          background-size: 45px 40px;
        }
    }
    .middle {
        float: left;
        width: 33.333333%;
        height: 98px;
        line-height: 98px;
        text-align: center;
        color: @white;
        font-size: 32px;
        font-family: MicrosoftYaHei;
        font-weight:bold;
    }
    .right {
        position: relative;
        float: left;
        width: 33.333333%;
        .icon-option {
            position: absolute;
            top:0;
            right: 0;
            height: 98px;
            width: 120px;
            line-height: 98px;
            font-size: 32px;
            background: url('~imgurl/header_option.png') no-repeat right 59px center;
            background-size: 40px 30px;
        }
    }
  }
  .money-use {
    margin-top: 61px;
    font-size: 69px;
    font-weight: 400;
    color:#ffffff;
    text-align: center;
    width: 100%;
  }
  .money-ban {
    margin-top: 36px;
    font-size: 22px;
    width:158px;
    font-weight: bold;
    color:rgba(151,255,135,1);
    text-align: center;
    width: 100%;
  }
  .icon-service {
    position: absolute;
    right: 40px;;
    bottom: 30px;
    width: 70px;
    height: 60px;
    background: url('~imgurl/icon_service.png') center no-repeat;
    background-size: 50px 40px;
  }
}

main {
  box-sizing: border-box;
}

.order-matching {
  position: fixed;
  top: 339px;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  box-sizing: border-box;
  z-index: 2000;
  background-color: #F5F5F5;
  .img-box {
    position: relative;
    height: 445px;
    width: 100%;
    padding-top: 64px;
    .imgs {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 445px;
      height: 445px;
      background: url('~imgurl/match_1.png') no-repeat;
      background-size: 445px 445px;
      // background: url('~imgurl/ppppp.png') no-repeat;
      // animation: spin steps(36, end) 5s infinite;
    }
  }
  .text-big {
    padding-top: 64px;
    font-weight:bold;
    font-size:38px;
    color: #000;
  }
  .text-small {
    padding-top: 33px;
    font-size:26px;
    color: #6D6D6D;
  }
  .cancel-btn {
    position: relative;
    margin-top: 99px;
    height: 232px;
    // margin-bottom: 105px;
    width: 100%;
    .content {
      box-sizing:border-box;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 618px;
      height: 97px;
      padding: 3px;
      padding-right: 2.35px;
      border-radius: 49px;
      background-image:-webkit-linear-gradient(left, #4264FB 0%, #4264FB 30%, #4264FB 70%, #16D3EF 90%);
      .box {
        width: 100%; // 611px;
        height: 100%;
        line-height: 90px; // 90px;
        border-radius: 49px;
        background:#fff;
        font-size: 30px;
        font-family: MicrosoftYaHei;
        font-weight:bold;
        color: #2A2A2A;
      }
    }
  }
}

.popup-hint {
  box-sizing: border-box;
  width: 100%;
  height: 179px;
  line-height: 179px;
  font-size: 28px;
  text-align: center;
  color: #ffffff;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-leave-active {
  transition: opacity .5s;
}
</style>

<style>
/* .van-popup--top {
  background: rgba(0, 32, 78, .9);
} */
</style>
