<template>
  <div>

    <!-- 头部-金额区 -->
    <header class="header">
      <div class="bars clearfix">
        <div class="left" @click="jumpSetPage()"><p>设置</p></div>
        <div class="title">资产</div>
        <div class="right" @click="matchingOrder()"><p>申诉</p></div>
      </div>

      <div class="boxs">
        <div class="boxs-top">
          <div class="money-state-box">
            <div class="money-state-a" v-show="moneyShow">
               {{headerInfo.operating_amount}}<span>积分</span>
            </div>
            <div class="money-state-b" v-show="!moneyShow">
               <p class="hine-sum">****</p>
               <p class="hine-text">积分</p>
            </div>
          </div>
          <p class="text">冻结{{headerInfo.freezing_amount}}</p>
          <button @click="hideMoney()">
            <div class="hide-icon" :class="{'hide-eye': !moneyShow}"></div>
            <span class="hide-text">隐藏</span>
          </button>
        </div>

        <div class="down clearfix">
          <div class="down-default" :class="{'down-active': buttonVal === '充值'}">
            <button @click="selectBtnType('充值')">
              <div class="btn-icon"></div>
              <div class="btn-text">充值</div>
            </button>
          </div>
          <div class="down-default" :class="{'down-active': buttonVal === '提现'}">
            <button  @click="selectBtnType('提现')">
              <div class="btn-icon"></div>
              <div class="btn-text">提现</div>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="bg-wrapper">
      <p class="blank"></p>

      <!-- 中间-金额区 -->
      <main>
        <div class="main-top">
          <p v-show="buttonVal === '充值'">充值积分</p>
          <p v-show="buttonVal === '提现'">提现积分</p>
          <input type="text"
                 v-model="keyword"
                 placeholder="请输入积分数量"
                 onKeyUp="value=value.replace(/[^\d]/g,'')"
                 onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))">
        </div>
        <div class="main-mid">
          <div class="main-imgs">

            <div
                @click="selectIconType(2)"
                class="item-wx-no"
                :class="{'item-wx-active': selectIconVal2}">
            </div>
            <div
                @click="selectIconType(1)"
                class="item-ali-no"
                :class="{'item-ali-active': selectIconVal1}">
            </div>
            <div
                @click="selectIconType(3)"
                class="item-bank-no"
                :class="{'item-bank-active': selectIconVal3}">
            </div>
          </div>
          <p v-show="buttonVal === '充值'">额外扣除服务10%，实际到账5000</p>
          <p v-show="buttonVal === '提现'">资产余额1000积分，<span>全部提现</span></p>
        </div>
        <button class="main-down" @click="verifyWindow()">提交订单</button>
      </main>

      <div class="text-boxs">
        <p class="hint">温馨提示：</p>
        <div>
          <p>1、单笔最小充值额为100CNY，最大充值额为5万CNY。</p>
          <p>2、每次只能用时进行一笔充值，成功完成单笔充值后才可发起下笔充值。</p>
        </div>
      </div>

      <!-- order -->
      <home-list ref="dialog" :list="orderList" v-on:tabevent='onTabEvent' ></home-list>
      <!-- <dialog-order
                  :show.sync='dialogOrderVal'
                  :state='dialogFlowVal'
                  :types='dialogBtnType'
                  :money='dialogFlowMoney'
                  :account='dialogFlowAccount'
                  v-on:dialogOrderEvent='onDialogOrder'>
      </dialog-order> -->
      <dialog-box
                :show.sync='dialogBoxVal'
                :dialog-option="dialogOption"
                v-on:dialogboxEvent='onDialogBox'>
      </dialog-box>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HomeList from './components/List'
// import DialogOrder from 'common/order_dialog/Dialog'
import DialogBox from 'common/dialog/Dialog'
// import { encrypt, decrypt } from '@/assets/utils.js'
export default {
  name: 'Home',
  data () {
    return {
      timer: null,
      loopTimer: null,
      loopAutoTimer: null,
      keyword: '',
      visibleMoney: '',
      moneyShow: true, // 显示金额
      dialogBoxVal: false, // 显示对话框
      buttonVal: '充值',
      loopCount: 0,
      loopAutoCount: 0,
      dialogOrderVal: false, // 显示
      dialogBtnType: '',
      dialogFlowVal: 1, // 1 匹配中 2 匹配成功 3 到账/已付款 4 收款
      dialogFlowMoney: '',
      dialogFlowAccount: '',
      orderState: '已提交',
      headerInfo: {},
      selectIconVal1: false, // 1支付宝，2微信支付，3银行
      selectIconVal2: false, // 1支付宝，2微信支付，3银行
      selectIconVal3: false, // 1支付宝，2微信支付，3银行
      mainInfo: {
        state: '充值积分',
        text: ''
      },
      orderList: [],
      postOrderData: {
        'app-name': '123',
        'merchant_type': '1', // 1:A端 2:B端
        'merchant_code': '12345',
        'choice_pay_type': '', // 1支付宝，2微信支付，3银行
        'third_user_id': '1'
      },
      dialogOption: {
        title: '提示',
        text: '请先完成实名认证再进行交易',
        cancelButtonText: '取消',
        confirmButtonText: '去实名'
      },
      userMsg: {},
      boundState: {},
      pay_typeOld: '',
      connectionFailCount: 0
    }
  },
  components: {
    DialogBox,
    // DialogOrder,
    HomeList
  },
  created () {
    // let name = '123123'
    // 加密
    // let a = encrypt(name)
    // // 解密
    // let b = decrypt(a)
    this.getUserMsg()
    this.getHomeInfo()
    this.getOrderInfo('1')
    this.loopCount = parseInt(localStorage.getItem('loopConfirmCount'))
    this.loopAutoCount = parseInt(localStorage.getItem('loopFinishCount'))
    this.loopAutoOrder()
    if (!JSON.parse(localStorage.getItem('visibleMoney'))) {
      this.moneyShow = false
    }
  },
  methods: {
    getHomeInfo () {
      const data = {
        'app-name': 'app_name1',
        'uid': 1
      }
      const url = this.$api.wallet
      axios.post(url + '/api/wallet/user_wallet', data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            const _obj = res.data.list
            this.headerInfo = _obj
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误')
        })
    },

    // 选择- 充值 / 提现
    selectBtnType (type) {
      if (type === this.buttonVal) return
      const btnval = this.buttonVal === '充值' ? '提现' : '充值'
      this.buttonVal = btnval
      this.dialogBtnType = btnval
      if (this.buttonVal === '充值') {
        this.mainInfo = {
          state: '充值积分',
          text: '额外扣除服务10%，实际到账5000'
        }
      } else {
        this.mainInfo = {
          state: '提现积分',
          text: '资产余额1000积分，'
        }
      }
      this.$refs.dialog.selectTab('未完成')
    },
    // 默认支付方式
    payTypeStr () {
      var TStr = this.postOrderData.choice_pay_type
      if (this.selectIconVal1) {
        TStr = TStr.replace('1', '')
        TStr = '1'
      }
      if (this.selectIconVal2) {
        TStr = TStr.replace('2', '')
        TStr += '2'
      }
      if (this.selectIconVal3) {
        TStr = TStr.replace('3', '')
        TStr += '3'
      }
      if (TStr.length === 3) {
        TStr = TStr.slice(0, 1) + ',' + TStr.slice(1)
        TStr = TStr.slice(0, 3) + ',' + TStr.slice(3)
      } else if (TStr.length === 2) {
        TStr = TStr.slice(0, 1) + ',' + TStr.slice(1)
      }
      this.postOrderData.choice_pay_type = TStr
    },
    // 支付按钮的显示
    selectIconType (type) {
      if (type === 1) {
        if (!this.boundState.ali_pay) {
          this.$toast('支付宝未绑定，请先绑定！')
          return false
        }
        this.selectIconVal1 = !this.selectIconVal1
      } else if (type === 2) {
        if (!this.boundState.bank_pay) {
          this.$toast('微信未绑定，请先绑定！')
          return false
        }
        this.selectIconVal2 = !this.selectIconVal2
      } else {
        if (!this.boundState.wechat_pay) {
          this.$toast('银行卡未绑定，请先绑定！')
          return false
        }
        this.selectIconVal3 = !this.selectIconVal3
      }
    },
    // 验证窗口 提交订单
    verifyWindow () {
      const inputs = this.keyword
      if (this.userMsg.is_realname !== 1) {
        this.dialogOption = {
          title: '提示',
          text: '请先完成实名认证再进行交易',
          cancelButtonText: '取消',
          confirmButtonText: '去实名'
        }
        this.dialogBoxVal = true
      } else if (inputs === '') {
        var exp = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/
        if (!exp.test(inputs)) {
          this.$toast('请输入充值数量')
        }
      } else {
        // 提交订单-充值
        if (this.buttonVal === '充值') {
          this.submitOrderMatch('充值')

        // 提交订单-提现
        } else {
          this.submitOrderMatch('提现')
        }
      }
    },

    // 提交订单-充值/提现
    submitOrderMatch (type) {
      this.payTypeStr()
      localStorage.setItem('dialogBtnType', type)
      let url = this.$api.order
      url += type === '充值' ? '/api/order/recharge' : '/api/order/draw'
      this.postOrderData.order_amount = this.keyword
      this.postOrderData.choice_pay_type = '1,2'
      const data = this.postOrderData
      axios.post(url, data)
        .then(res => {
          this.postOrderData.choice_pay_type = ''
          res = res.data
          if (res.code === '10000') {
            const matchs = res.data.list.match
            const orderNo = res.data.list.order_no
            localStorage.setItem('matchOrderState', matchs)
            localStorage.setItem('matchOrderNo', orderNo)
            this.matchingOrder()
            // this.dialogOrderVal = !this.dialogOrderVal // 成功打开弹窗
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误')
        })
    },

    // type = 1未完成, 2已完成, 3已取消
    onTabEvent (type) {
      this.getHomeInfo() // 刷新首页
      this.getOrderInfo(type)
    },

    onDialogBox (type) {
      if (type) {
        // 点击去实名认证
        this.$router.push({
          path: '/setting/settingCertification'
        })
      } else {
        // 点击去绑定支付
      }
    },

    onDialogOrder (type) {
      if (type === '查看') {
        const orderNo = JSON.parse(sessionStorage.getItem('matchOrderNo'))
        clearInterval(this.loopTimer)
        const ordeType = this.buttonVal === '充值' ? 1 : 2
        this.jumpDetail(ordeType, 1, orderNo) // 1 已提交
      }
      if (type === '收款') {
        this.finishOrder()
      }
      if (type === 'close') {
        // 刷新订单数据
      }
      this.dialogFlowVal = 1 // 重置 匹配中...
    },

    jumpDetail (ordeType, status, orderId) {
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

    // 获取充值订单列表
    getOrderInfo (type) {
      const data = {
        'app-name': '123',
        'merchant_type': '1', // 1:A端
        'merchant_code': '12345',
        'type': type, // 1未完成, 2已完成, 3已取消
        'third_user_id': '1',
        'page': '1',
        'limit': '10'
      }
      const name = this.buttonVal === '充值' ? 'getRechangeLists' : 'getDrawLists'
      const url = this.$api.order
      axios.post(url + '/api/order/' + name, data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            const _list = res.data.list.list
            const stateCode = ['已提交', '待付款', '未到账', '已取消', '已完成', '已匹配', '待确认']
            _list.forEach(i => {
              i.title_type = this.buttonVal
              i.status_text = stateCode[i.status - 1]
            })
            this.orderList = _list
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误')
        })
    },

    hideMoney () {
      this.moneyShow = !this.moneyShow
      if (this.moneyShow) {
        localStorage.setItem('visibleMoney', true)
      } else {
        localStorage.setItem('visibleMoney', false)
      }
    },

    jumpSetPage () {
      this.$router.push({ name: 'Setting' })
      this.$router.push({
        name: 'Setting'
      })
    },
    // 获取用户信息
    getUserMsg () {
      const data = {
        'app-name': '123',
        'merchant_type': '1', // 1:A端
        'merchant_code': '12345',
        'third_user_id': '1'
      }
      let url = 'http://user.service.168mi.cn'
      axios.post(url + '/api/user/getUserInfo', data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            this.userMsg = res.data.list
            this.boundState = this.userMsg.pay_info
            this.selectIconVal1 = this.boundState.ali_pay
            this.selectIconVal2 = this.boundState.bank_pay
            this.selectIconVal3 = this.boundState.wechat_pay
            sessionStorage.setItem('userMsg', JSON.stringify(this.userMsg))
            this.payTypeStr()
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问')
        })
    },

    matchingOrder () {
      this.dialogOrderVal = !this.dialogOrderVal
      this.$bus.emit('openDialog', 'open')

      console.log(this.buttonVal)
      console.log('1 匹配中...')
      const match = JSON.parse(sessionStorage.getItem('matchOrderState'))
      console.log('match: ' + match)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // this.timer = setTimeout(() => {
      //   if (this.dialogOrderVal === false) {
      //     this.dialogOrderVal = true
      //   }
      //   if (match) {
      //     console.log('2 匹配成功')
      //     this.dialogFlowVal = 2 // 后台查询-匹配成功-更新窗口
      //     localStorage.setItem('openLoopConfirm', '1')
      //     this.loopOrderDetail()
      //   }
      // }, 2000)
      this.dialogFlowVal = 4
    },

    loopOrderDetail () {
      // console.log('=== 开始自动收款 ===')
      if (localStorage.getItem('openLoopConfirm') !== '1') return
      this.loopTimer = setInterval(() => {
        this.loopCount += 5000
        localStorage.setItem('loopConfirmCount', this.loopCount)

        if (this.connectionFailCount === 2) { // 两次服务器连接失败结束
          clearInterval(this.loopTimer)
        }

        if (this.dialogFlowVal === 3) {
          console.log('3 充值到账')
          console.log('============================')
          console.log('继续 loop 对方有无付款')
          this.getHomeInfo()
          localStorage.setItem('openLoopConfirm', '0')
          // localStorage.setItem('loopConfirmCount', '0')
          if (this.buttonVal === '充值') {
            clearInterval(this.loopTimer)
          }
        }
        this.getOrderData()

        // if (count === 6000 && match && this.dialogFlowType === '提现') {
        //   this.dialogFlowVal = 4
        // }
        // }
      }, 5000)
    },

    // 获取订单信息
    getOrderData () {
      const orderNo = sessionStorage.getItem('matchOrderNo')
      const data = {
        'app-name': '123',
        'merchant_type': '1', // 1:A端
        'merchant_code': '12345',
        'order_no': orderNo,
        'third_user_id': '1'
      }
      const path = this.buttonVal === '充值' ? 'payDetail' : 'drawDetail'
      const url = this.$api.order + '/api/order/' + path
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            let _data = res.data.list
            if (this.buttonVal === '充值') {
              _data = _data.order_detail
            }
            let value = _data.pay_type
            const orderAcc = ['', '支付宝', '微信', '银行卡']
            this.dialogFlowAccount = orderAcc[value]
            this.dialogFlowMoney = _data.order_amount
            const status = _data.status

            if (this.dialogOrderVal === false) {
              this.dialogOrderVal = true
              this.$bus.emit('openDialog', 'open')
            }

            const stateCode = ['已提交', '待付款', '未到账', '已取消', '已完成', '已匹配', '待确认']
            const stateName = stateCode[status - 1]
            console.log('返回订单状态: ' + stateName)
            // if (status === 5) { // 后台查询-订单已完成-更新窗口

            if (stateName === '待确认') { // 7
              this.dialogFlowVal = 3
              localStorage.setItem('matchOrderState', false) // 关闭-订单匹配
              // localStorage.setItem('openLoopFinish', '1') // 开启-自动收款
              this.loopAutoOrder()
              clearInterval(this.loopTimer)
            }
            console.log('2是匹配成功: ' + this.dialogFlowVal)
            // if (stateName === '已完成') { // 5
            //   clearInterval(this.loopTimer)
            // }
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.connectionFailCount += 1
          this.$toast('服务连接匹配失败~', 1500)
        })
    },

    loopAutoOrder () {
      // console.log('=== 开始自动收款 ===')
      // if (localStorage.getItem('openLoopFinish') !== '1') return
      this.loopAutoTimer = setInterval(() => {
        this.loopAutoCount += 2000
        localStorage.setItem('loopFinishCount', this.loopAutoCount)

        if (this.loopAutoCount >= 7200000) { // 两小时
          this.finishOrder()
          if (this.dialogOrderVal === false) {
            this.dialogOrderVal = true
            this.$bus.emit('openDialog', 'open')
          }
          this.dialogFlowVal = 4
          // localStorage.setItem('openLoopFinish', '0')
          // localStorage.setItem('loopFinishCount', '0')
          clearInterval(this.loopAutoTimer)
        }
      }, 5000)
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
      const url = this.$api.order + '/api/order/confirmOrder'
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            const type = this.buttonVal === '充值' ? '1' : '2'
            this.getOrderInfo(type)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问')
        })
    }
  }
}
</script>

<style lang="less" scoped>
@white: #ffffff;
@bgColor: #f8f8f8;

@buttonBox: {
  position: relative;
  display: inline-block;
  float: left;
  height: 189px;
  width: 50%;
};

@buttonColor: {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 240px;
  height: 60px;
  border-radius: 28px;
  text-align: center;
  color: #727272;
  border:2px solid #656565;
  background: #ffffff;
  .btn-icon {
    display: inline-block;
    margin-top: -1px;
    width: 120px;
    height: 60px;
    float: left;
  }
  .btn-text {
    display: inline-block;
    margin-top: -1px;
    width: 50px;
    line-height: 60px;
    float: left;
    text-align: left;
    margin-left: 11.5px;
  }
};

@btnIcon: {
   display: inline-block;
  width: 38px;
  height: 35px;
  background: url('~imgurl/moneyActive-icon.png') no-repeat;
  background-size: 100%;
  background-position: center;
  margin-right: 2px;
};

.clearfix:after {
    content: '';
    display: block;
    clear: both;
}

header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 303px;
  background: linear-gradient(0deg,rgba(75, 146, 254, 1),rgba(29, 64, 228, 1));
  .bars {
    position: relative;
    height: 88px;
    .left {
        float: left;
        width: 33.333333%;
        p {
            margin-left: 33px;
            height: 88px;
            line-height: 88px;
            font-size: 32px;
            color: @white;
        }
    }
    .title {
        float: left;
        width: 33.333333%;
        height: 88px;
        line-height: 88px;
        font-size: 34px;
        text-align: center;
        color: @white;
    }
    .right {
        float: left;
        width: 33.333333%;
        p {
            margin-right: 33px;
            height: 88px;
            line-height: 88px;
            font-size: 32px;
            color: @white;
            text-align: right;
        }
    }
  }
  .boxs {
    position: absolute;
    top: 106px;
    left: 41px;
    right: 41px;
    height: 386px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.2);
    .boxs-top {
      position: relative;
      height: 189px;
      text-align: center;
      .money-state-box {
        height: 189px;
        font-size: 72px;
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        color: #2F2D2D;
        .money-state-a {
          line-height: 189px;
          span {
            display: inline-block;
            color: #666666;
            font-size: 26px;
            margin-left: 6px;
          }
        }
        .money-state-b {
          .hine-sum {
            display: inline-block;
            position: absolute;
            top: 77px;
            right: 292px;
          }
          .hine-text {
            display: inline-block;
            position: absolute;
            top: 98px;
            right: 221px;
            color: #666666;
            font-size: 26px;
            margin-left: 6px;
          }
        }
      }
      .text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 6px;
        height:25px;
        font-size:26px;
        color: #999999;
      }
      button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        color: @white;
        width: 146px;
        height: 57px;
        background:#0078FF;
        border-radius: 29px 0px 0px 29px;
        .hide-text {
          float: right;
          margin-right: 20px;
        }
        .hide-icon{
          width: 39px;
          height: 28px;
          position: absolute;
          left: 21px;
          top: 15px;
          background: url('~imgurl/look-icon.png') no-repeat;
          background-size: 100%;
          background-position: center;
        }
        .hide-eye {
          background: url('~imgurl/look2-icon.png') no-repeat;
        }
      }
    }
    .down {
      height: 189px;
      .down-default {
        @buttonBox();
        button {
          @buttonColor();
          .btn-icon {
            background: url('~imgurl/money-icon.png') no-repeat right 11.5px center;
            background-size: 38px 35px;
          }
        }
      }
      .down-active {
        @buttonBox();
        button {
          @buttonColor();
          color: @white;
          background: #0078FF;
          border:2px solid #0078FF;
          .btn-icon {
            background: url('~imgurl/moneyActive-icon.png') no-repeat right 11.5px center;
            background-size: 38px 35px;
          }
        }
      }
    }
  }
}

.bg-wrapper {
  background: @bgColor;
  .blank {
    height: 223px;
  }

  main {
    box-sizing: border-box;
    height: 384px;
    margin: 0 32px;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.2);
    background: #f8f8f8;
    .main-top {
      height: 91px;
      margin: 0 21px;
      border-bottom: 2px solid #D4D4D4;
      p {
        display: inline-block;
        height: 91px;
        line-height: 91px;
        color: #384253;
        font-size: 32px;
      }
      input {
        display: inline-block;
        width: 500px;
        height: 91px;
        line-height: 91px;
        text-align: right;
        font-size: 30px;
        background-color: inherit;
        padding-right: 5px;
      }
    }
    .main-mid {
      height: 178px;
      border: 1px #ffffff solid;
      .main-imgs {
        display: flex;
        margin-top: 27px;
        .item-wx-no {
          width:160px;
          height:54px;
          background-color: #0078FF;
          margin-left: 50px;
          border-radius: 10px;
          background: url('~imgurl/wx_icon_no.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-ali-no {
          width:160px;
          height:54px;
          background-color: #0078FF;
          margin-left: 50px;
          border-radius: 10px;
          background: url('~imgurl/ali_icon_no.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-bank-no {
          width:160px;
          height:54px;
          background-color: #0078FF;
          margin-left: 50px;
          border-radius: 10px;
          background: url('~imgurl/bank_icon_no.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-wx-active {
          background: url('~imgurl/wx_icon_active.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-ali-active {
          background: url('~imgurl/ali_icon_active.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-bank-active {
          background: url('~imgurl/bank_icon_active.png') no-repeat right 0 center;
          background-size: 100%
        }
      }
      p {
        margin-top: 46px;
        font-size: 24px;
        text-align: center;
        span {
          color: #0078FF;
        }
      }
    }
    .main-down {
      display: block;
      width:600px;
      height:80px;
      background: #0078FF;
      border-radius: 10px;
      font-size:32px;
      color: @white;
      margin: 0 auto;
    }
  }

  .text-boxs {
    height: 239px;
    margin: 0 32px;
    p {
      font-size: 24px;
      color: #999999;
      line-height: 33px;
    }
    .hint {
      margin: 21px 0;
    }
  }

}
</style>
