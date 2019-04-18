<template>
  <div class="detail-body">
    <common-header :title="navTitle"></common-header>

    <!-- 订单信息 -->
    <ul class="wrapper">
      <li class="li-tab-box">
        <div class="li-tab-text">充值</div>
        <div class="li-tab-time">
          <template v-if="orderStatus == 2 || orderStatus == 6">
            <count-down :endTime="orderDetailData.res_time" :callback="callback(0)" endText="" timeType='zh'></count-down>
          </template>
        </div>
        <div
            class="li-tab-status"
            :class="{'li-tab-orange':orderStatus == 2 || orderStatus == 7 || orderStatus == 6,
            'li-tab-red':orderStatus == 4 || orderStatus == 3}">
            {{orderStatus | orderStatus}}
        </div>
      </li>
      <li class="li-item clearfix">
        <div class="left">金额</div>
        <div class="right strong">￥{{orderDetailData.order_amount}}</div>
      </li>
      <li class="li-item clearfix">
        <div class="left">积分</div>
        <div class="right">{{orderDetailData.order_amount}}</div>
      </li>
      <li class="li-item clearfix">
        <div class="left">下单时间</div>
        <div class="right">{{orderDetailData.time_str}}</div>
      </li>
      <li class="li-item clearfix">
        <div class="left">订单号</div>
        <div class="icon tag-read" :data-clipboard-text="orderDetailData.order_no" @click="copy"><img src="~imgurl/copy-icon.png" alt=""></div>
        <div class="right">{{orderDetailData.order_no}}</div>
      </li>
    </ul>

    <!-- 支付信息 -->
    <ul class="wrapper" v-if="orderStatus == 3 || orderStatus == 2 || orderStatus == 6 || orderStatus == 5 || orderStatus == 7">
      <li class="li-tab-title">
        <div class="left" v-text="payText"></div>
        <div class="icon"></div>
        <div @click="checkoutPay(0)" v-if="orderStatus == 2 || orderStatus == 6" class="right">切换支付方式</div>
      </li>

      <li class="li-item clearfix">
        <div class="left">收款人</div>
        <div class="icon"><img src="~imgurl/copy-icon.png" alt=""></div>
        <!-- payType.ali_pay. -->
        <div class="right" v-show="payway == 1">{{ali_pay.alipay_name}}</div>
        <div class="right" v-show="payway == 2">{{wechat_pay.wechat_name}}</div>
        <div class="right" v-show="payway == 3">{{bank_pay.bank_name}}</div>
      </li>
       <li class="li-item clearfix" v-show="payway != 3">
        <div class="left" v-text="payText2"></div>
        <div class="icon"><img src="~imgurl/copy-icon.png" alt=""></div>
        <div class="right" v-show="payway == 1">{{ali_pay.alipay_account}}</div>
        <div class="right" v-show="payway !== 1">{{wechat_pay.wechat_account}}</div>
      </li>

      <!-- 银行卡 -->
      <div v-show="payway == 3">
        <li class="li-item clearfix">
          <div class="left">银行名称{{payway}}</div>
          <div class="icon"><img src="~imgurl/copy-icon.png" alt=""></div>
          <div class="right">{{bank_pay.bank_address}}</div>
        </li>

        <li class="li-item clearfix">
          <div class="left">支行名称</div>
          <div class="icon"><img src="~imgurl/copy-icon.png" alt=""></div>
          <div class="right">{{bank_pay.bank_sub_branch}}</div>
        </li>

        <li class="li-item clearfix">
          <div class="left">银行卡号</div>
          <div class="icon"><img src="~imgurl/copy-icon.png" alt=""></div>
          <div class="right">{{bank_pay.bank_no}}</div>
        </li>
      </div>

      <template v-show="payway != 3">
        <li class="li-item clearfix" v-if="orderStatus == 2 || orderStatus == 6">
          <div class="left">收款二维码</div>
          <div @click="openQrcode()">
            <!-- <div class="icon" v-show="payway == 1"><img :src='ali_pay.alipay_rq_code' alt=""></div> -->
            <div class="icon"><img src='~imgurl/lookcode.png' alt=""></div>
            <div class="right" v-text="btnQRText"></div>
          </div>
        </li>
        <div id="qrcode" class="qrcode-img" ref="qrcode" v-show="showQrcode"></div>
      </template>

      <li class="li-item clearfix">
        <div class="left">付款时备注</div>
        <div class="icon"><img src="~imgurl/copy-icon.png" alt=""></div>
        <div class="right">1903181149045289796</div>
      </li>
    </ul>
    <!-- 提示 -->
    <div class="text-boxs">
      <p class="hint">提示：</p>
      <div>
        <p>{{orderStatus|tipStatus1}}</p>
        <p>{{orderStatus|tipStatus2}}</p>
        <p>{{orderStatus|tipStatus3}}</p>
        <p>{{orderStatus|tipStatus4}}</p>
        <p>{{orderStatus|tipStatus5}}</p>
        <p>{{orderStatus|tipStatus6}}</p>
      </div>
    </div>
     <!-- 手动取消提示 -->
    <div class="cancelTips" v-if="orderStatus==3 ||orderStatus==4 ">
      <span v-if="orderStatus==4">您已手动取消该笔充值订单</span>
      <span v-else-if="orderStatus==8">超时未付款，系统自动取消订单</span>
    </div>
    <!-- 取消按钮 -->
    <div class="cancel" v-if="orderStatus == 2 || orderStatus == 6">
      <span @click="cancelOrder1()" class="btn-pay">取消订单</span>
    </div>
    <!-- 付款方式弹框 -->
    <van-popup v-model="show" position="bottom">
      <van-radio-group v-model="radio" :click="payChange(radio)">
        <ul class="wrapper">
          <li class="li-item clearfix">
            <div class="left"><img class="leftImg" src="~imgurl/toLeftarrow.png" alt=""></div>
            <div class="center">选择付款方式</div>
          </li>

          <li class="li-item clearfix" v-if="isAlipay">
            <div class="left"><img src="~imgurl/alipay-icon.png" alt=""></div>
            <div class="left">支付宝</div>
            <div class="right"><van-radio name="1"></van-radio></div>
          </li>

          <li class="li-item clearfix" v-if="iswx">
            <div class="left"><img src="~imgurl/wx-icon.png" alt=""></div>
            <div class="left">微信</div>
            <div class="right"><van-radio name="2"></van-radio></div>
          </li>

          <li class="li-item clearfix" v-if="isbank">
            <div class="left"><img src="~imgurl/bank-icon.png" alt=""></div>
            <div class="left">银行卡</div>
            <div class="right"><van-radio name="3"></van-radio></div>
          </li>
        </ul>
      </van-radio-group>
      <div class="btn-pay-boxs">
        <button @click="checkoutPay(1)" class="btn-pay">确定</button>
      </div>
    </van-popup>
    <!-- 确认按钮 -->
    <div class="btn-pay-boxs2" v-if="orderStatus == 1 || orderStatus == 2 || orderStatus == 6">
      <button @click="submit2()" class="btn-pay">{{orderStatus|btnStatus}}</button>
    </div>
    <div class="btn-pay-boxs" :class="{'padtop':orderStatus == 3}" v-else>
      <button @click="submit()" class="btn-pay" :class="{'appeal':appeal=='1'}">{{orderStatus|btnStatus}}
        <span v-if="appeal=='1'">
          <template>
            <count-down :endTime="orderDetailData.res_time" :callback="callback(1)" endText="" timeType='zh'></count-down>
          </template>
        </span>
      </button>
    </div>
    <dialog-box
              :show.sync='dialogBoxVal'
              :dialog-option="dialogOption"
              v-on:dialogboxEvent='onDialogBox'>
    </dialog-box>
  </div>
</template>
<script>
import axios from 'axios'
import CommonHeader from 'common/header/Header'
import DialogBox from 'common/dialog/Dialog'
import CountDown from 'common/time/CountDown'
import Clipboard from 'clipboard'
export default {
  name: 'Detail',
  components: {
    DialogBox,
    CommonHeader,
    CountDown
  },
  data () {
    return {
      dialogBoxVal: false, // 显示对话框
      dialogOption: {
        title: '提示',
        text: '每天手动或超时取消订单超过3次，将被禁止交易24小时',
        cancelButtonText: '继续交易',
        confirmButtonText: '取消订单'
      },
      postFormat: {},
      ali_pay: {
        alipay_name: ''
      },
      bank_pay: {
        bank_name: ''
      },
      wechat_pay: {
        wechat_name: ''
      },
      btnQRText: '点击查看',
      payText: '微信支付',
      payText2: '微信账号',
      bodyHeight: 0,
      navTitle: '订单详情',
      showQrcode: false,
      orderStatus: '0',
      payway: '1', // 1支付宝，2微信，3银行卡
      payType: {},
      appeal: '0', // 点击申诉之后变为1
      show: false,
      checked: true,
      radio: '1',
      order_no: '',
      orderDetailData: {},
      iswx: false,
      isAlipay: false,
      isbank: false
    }
  },
  created () {
    const format = sessionStorage.getItem('reqformat')
    this.postFormat = JSON.parse(format)
    this.orderStatus = this.$route.query.status
    this.order_no = this.$route.query.orderid
    this.getOrderData()
  },
  mounted () {
    const payRadio = sessionStorage.getItem('payRadio')
    if (payRadio === 'open') {
      this.checkoutPay(1) // 1 2 3
      sessionStorage.setItem('payRadio', '')
    }
  },
  methods: {
    // 获取订单信息
    getOrderData () {
      // const data = {
      //   'app-name': '123',
      //   'merchant_type': '1', // 1:A端
      //   'merchant_code': '12345',
      //   'order_no': this.order_no,
      //   'third_user_id': '1'
      // }
      let data = this.postFormat
      data.order_no = this.order_no

      const url = 'http://order.service.168mi.cn/api/order/payDetail'
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            this.orderDetailData = res.data.list.order_detail
            const payType = res.data.list.pay_type
            this.payType = payType
            this.ali_pay = payType.ali_pay || {}
            this.wechat_pay = payType.wechat_pay || {}
            this.bank_pay = payType.bank_pay || {}
            this.isPayTipe()
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          console.log(e)
          // this.$toast('网络错误，不能访问0')
        })
    },
    // 判断付款方式
    isPayTipe () {
      const str = JSON.stringify(this.payType)
      if (str.includes('ali_pay')) {
        this.isAlipay = true
      }
      if (str.includes('wechat_pay')) {
        this.iswx = true
      }
      if (str.includes('bank_pay')) {
        this.isbank = true
      }
      return false
    },
    onDialogBox (bol) {
      if (bol) {
        this.cancelOrder()
      }
    },
    // 取消订单
    cancelOrder1 () {
      this.dialogBoxVal = true
    },
    cancelOrder () {
      let data = this.postFormat
      data.order_no = this.order_no
      const url = 'http://order.service.168mi.cn/api/order/cancelRechangeOrder'
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            this.$toast(res.msg)
            this.$router.go(-1)
          } else {
            this.dialogBoxVal = false
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问1')
        })
    },
    // 切换支付方式
    payChange (name) {
      this.payway = name
      if (name === '1') {
        this.payText = '支付宝支付'
        this.payText2 = '支付宝账号'
      } else if (name === '3') {
        this.payText = '银行卡支付'
      } else {
        this.payText = '微信支付'
        this.payText2 = '微信账号'
      }
    },
    checkoutPay (i) {
      this.show = !this.show
      if (i === 0) {
        return false
      }
      // const data = {
      //   'app-name': '123',
      //   'merchant_type': '1', // 1:A端
      //   'merchant_code': '12345',
      //   'third_user_id': '1',
      //   'pay_type': this.payway,
      //   'order_no': this.order_no,
      // }
      let data = this.postFormat
      data.order_no = this.order_no
      data.pay_type = this.payway

      const url = 'http://order.service.168mi.cn/api/order/changePayType'
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问2')
        })
    },
    // 我已完成付款
    finishOrder () {
      // const data = {
      //   'app-name': '123',
      //   'merchant_type': '1', // 1:A端
      //   'merchant_code': '12345',
      //   'third_user_id': '1',
      //   'order_no': this.order_no,
      //   'pay_type': this.payway
      // }
      let data = this.postFormat
      data.order_no = this.order_no
      data.pay_type = this.payway

      const url = 'http://order.service.168mi.cn/api/order/endRechangeOrder'
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            // localStorage.setItem('openLoopFinish', '0')
            localStorage.setItem('openLoopConfirm', '0') // 停止-弹出10分钟付款
            this.$router.go(-1)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问3')
        })
    },
    submit2 () {
      this.orderStatus = this.orderStatus.toString()
      if (this.orderStatus === '1') {
        this.cancelOrder1()
      } else {
        this.finishOrder()
      }
    },
    openQrcode () {
      this.showQrcode = !this.showQrcode
      this.btnQRText = this.showQrcode ? '收起' : '点击查看'
    },
    callback () {
    },
    copy () {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$toast('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        clipboard.destroy()
      })
    },
    submit () {
      if (this.orderStatus === '3') {
        this.appeal = '1'
      } else {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  filters: {
    btnStatus: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '取消订单'
      } else if (value === '2' || value === '6') {
        value = '我已完成付款'
      } else if (value === '3') {
        value = '申诉'
      } else {
        value = '返回'
      }
      return value
    },
    orderStatus: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '已提交'
      } else if (value === '2' || value === '6') {
        value = '待付款'
      } else if (value === '5') {
        value = '已完成'
      } else if (value === '3' || value === '7') {
        value = '未到账'
      } else if (value === '8') {
        value = '已取消'
      } else {
        value = '已取消'
      }
      return value
    },
    tipStatus1: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '1、我们已接收您的充值订单，并正在为您匹配卖方。'
      } else if (value === '2' || value === '6') {
        value = '1、平台不支持自动扣款,请用您本人的账号向以上账户转账。'
      } else if (value === '5') {
        value = '1、该笔充值已完成，如没有充值到账请联系***核实。'
      } else if (value === '3') {
        value = '1、由于你没有在系统规定时间内向卖方付款，因此系统自动取消您的充值订单。'
      } else if (value === '4') {
        value = '1、您已手动关闭了该订单交易'
      } else if (value === '5' || value === '7') {
        value = '1、我们已通知卖方确认消息，稍后片刻充值即可到账'
      } else {
        value = ''
      }
      return value
    },
    tipStatus2: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '2、当订单变更为代付款状态时，请您尽快向卖方付款，并点击“我已确认付款”。'
      } else if (value === '2' || value === '6') {
        value = '2、转账成功后请点击下方“我已完成付款”按钮。'
      } else if (value === '4') {
        value = '2、如果您已经向买方付款，而误点了取消订单按钮请发起申诉。'
      } else if (value === '4') {
        value = '2、如果您已经像卖方付款，而没有点击“我已完成付款”按钮，请点击下方按钮进行申诉'
      } else if (value === '5' || value === '7') {
        value = '2、10分钟后未收到卖方确认您可以向我们进行申诉处理。'
      } else {
        value = ''
      }
      return value
    },
    tipStatus3: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '3、成功完单笔充值订单后才可发起下一笔充值。'
      } else if (value === '2' || value === '6') {
        value = '3、成功转账后，待卖方确认完成，即可完成这笔充值。'
      } else {
        value = ''
      }
      return value
    },
    tipStatus4: function (value) {
      value = value.toString()
      if (value === '2' || value === '6') {
        value = '4、请尽量保留转账截图，作为纠纷时证据。'
      } else {
        value = ''
      }
      return value
    },
    tipStatus5: function (value) {
      value = value.toString()
      if (value === '2' || value === '6') {
        value = '5、银行转账时，请尽量使用即时到账，以免卖方长时间未收到款项。'
      } else {
        value = ''
      }
      return value
    },
    tipStatus6: function (value) {
      value = value.toString()
      if (value === '2' || value === '6') {
        value = '6、请于30分钟内向卖方指定账户支付款项，并点击“我已完成付款”，超时会被系统自动取消该笔充值订单。'
      } else {
        value = ''
      }
      return value
    }
  }
}
</script>

<style lang="less" >
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}

.detail-body {
  position: relative;
  .wrapper {
    margin: 29px 30px 30px;
    padding: 20px 40px;
    background: #FFFFFF;
    border-radius: 10px;
    .li-tab-title {
      display: flex;
      justify-content: space-between;
      height: 91px;
      line-height: 91px;
      font-size: 34px;
      .left {
        color: #384253;
      }
      .right {
        width: 240px;
        color: #999999;
        background: url('~imgurl/arrow-right.png') no-repeat right 0 center;
        background-size: 16px 28px;
      }
    }

    .li-tab-box {
      display: flex;
      height: 86px;
      .li-tab-text {
        color: #60C064;
        font-size: 34px;
        line-height: 86px;
      }
      .li-tab-time {
        flex: 1;
        font-size:28px;
        line-height: 86px;
        text-align: center;
        margin-right: -60px;
        color: #1C6FE9;
      }
      .li-tab-status {
        font-size: 34px;
        line-height: 86px;
        color: #0568EE;
      }
      .li-tab-orange {
        color: #FF8C01;
      }
      .li-tab-red {
        color: #FE4A57;
      }
    }

    .li-item {
      height: 69px;
      line-height: 69px;
      color: #384253;
      .left {
        color: #596F87;
        font-size: 30px;
        float: left;
      }
      .right {
        color: #384253;
        font-size: 28px;
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        float: right;
      }
      .center{
        text-align: center;
        font-size: 28px;
        color: #070707;
      }
      .strong {
        font-size:34px;
        font-weight: bold;
      }
      .icon {
        width: 40px;
        height: 60px;
        background-size: 30px 30px;
        margin-left: 20px;
        float: right;
        img{
          width: 29px;
        }
      }
    }

    .qrcode-img {
      margin: 36px auto;
      width: 153px;
      height: 153px;
      border: 1px #000000 solid;
    }
  }
  .cancelTips{
    font-size: 28px;
    color: #384253;
    text-align: center;
    margin: 250px 0 85px;
  }
  .cancel{
    font-size: 32px;
    color: #0078FF;
    text-align: center;
    padding-bottom: 150px;
  }
  .text-boxs {
    padding: 0 43px 95px;
      p {
        font-size: 24px;
        color: #999;
        line-height: 33px;
      }
      .hint {
        color: #454545;
        margin: 0;
        margin-bottom: 5px;
      }
    }
  .van-popup{
    .li-item{
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;
      .van-radio__icon {
          height: .9rem;
          line-height: .9rem;
          width: 100%;
          position: absolute;
          right: 0;
          text-align: right;
      }
      &:last-of-type{
        border: none;
      }
      .left{
        margin-right: 20px;
        img{
          width: .55rem
        }
        .leftImg{
          width: .3rem
        }
      }
    }
    .btn-pay-boxs{
      padding: 40px 75px 0;
      margin-bottom: 50px;
      .btn-pay {
        width: 100%;
        height: 80px;
        background: linear-gradient(94deg,rgba(47,131,255,1),rgba(60,59,238,1));
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        font-size: 32px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        text-align: center;
        color: #FFFEFE;
      }
    }
    .van-icon{
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
  }
  .btn-pay-boxs {
    padding: 0 75px 0;
    margin-bottom: 27px;
    .btn-pay {
      width: 100%;
      height: 80px;
      background: linear-gradient(94deg,rgba(47,131,255,1),rgba(60,59,238,1));
      box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      font-size: 32px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      text-align: center;
      color: #FFFEFE;
    }
    .appeal{
      background: #D2D2D2 !important;
      color: #606875;
    }
    span{
      font-size: 24px;
      color: #69707D;
    }
  }
  .padtop{
    padding-top: 200px;
  }
  .btn-pay-boxs2 {
    position: fixed;
    bottom: 0;
    width: 100%;
    .btn-pay {
      width: 100%;
      height: 96px;
      background: linear-gradient(94deg,rgba(47,131,255,1),rgba(60,59,238,1));
      font-size: 32px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      text-align: center;
      color: #FFFEFE;
    }
  }
}
</style>
