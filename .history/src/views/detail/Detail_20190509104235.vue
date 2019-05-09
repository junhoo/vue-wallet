<template>
  <div class="detail-body">
    <common-header :title="navTitle"></common-header>

    <!-- 订单信息 -->
    <ul class="wrapper">
      <li class="li-tab-box">
<<<<<<< HEAD
        <div class="li-tab-text">充值</div>
=======
        <div class="li-tab-text">提现</div>
>>>>>>> 9bff8711a6bb73dd7e746dd8c903629ecef06358
        <div class="li-tab-time">
          <template v-if="0">
            <count-down endTime="1554266200000" :callback="callback" endText="已经结束了" timeType='zh'></count-down>
          </template>
        </div>
        <div
            class="li-tab-status"
            :class="{'li-tab-orange':orderStatus == 7 || orderStatus == 3,
            'li-tab-red':orderStatus == 6 || orderStatus == 2 || orderStatus == 4}"
            >{{orderStatus|orderStatus}}
        </div>
      </li>
      <li class="li-item clearfix">
        <div class="left">金额</div>
        <div class="right strong">￥{{orderDetailData.real_amount}}</div>
      </li>
      <li class="li-item clearfix">
        <div class="left">积分</div>
        <div class="right">{{orderDetailData.order_amount}}</div>
      </li>
       <li class="li-item clearfix">
        <div class="left">费率</div>
        <div class="right">{{orderDetailData.rate}}</div>
      </li>
       <li class="li-item clearfix">
        <div class="left">实际到账</div>
        <div class="right">{{orderDetailData.real_amount}}</div>
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
    <ul class="wrapper" v-if="0">
      <li class="li-tab-title">
        <div class="left">银行卡支付</div>
        <div class="icon"></div>
        <div class="right">切换支付方式</div>
      </li>

      <li class="li-item clearfix">
        <div class="left">收款人</div>
        <div class="icon"></div>
        <div class="right">啥打算大所多</div>
      </li>

      <!-- 银行卡 -->
      <template v-if="0">
        <li class="li-item clearfix">
          <div class="left">银行名称</div>
          <div class="icon"></div>
          <div class="right">一个银行</div>
        </li>

        <li class="li-item clearfix">
          <div class="left">支行名称</div>
          <div class="icon"></div>
          <div class="right">营业厅</div>
        </li>

        <li class="li-item clearfix">
          <div class="left">银行卡号</div>
          <div class="right">1561165456</div>
        </li>
      </template>

      <!-- 支付宝 -->
      <template v-if="0">
        <li class="li-item clearfix">
          <div class="left">收款二维码</div>
          <div @click="openQrcode()">
            <div class="icon"></div>
            <div class="right" v-text="btnQRText"></div>
          </div>
        </li>

        <div id="qrcode" class="qrcode-img" ref="qrcode" v-show="showQrcode"></div>
      </template>

      <li class="li-item clearfix">
        <div class="left">付款时备注</div>
        <div class="icon"></div>
        <div class="right">1903181149045289796</div>
      </li>
<<<<<<< HEAD

      <!-- 代付款 -->
      <div class="text-boxs" v-if="0">
        <p class="hint">温馨提示：</p>
        <div>
          <p>1、平台不支持自动扣款,请用您本人的账号向以上账户转账。</p>
          <p>2、转账成功后请点击下方“我已完成付款”按钮。</p>
          <p>3、成功转账后，待卖方确认完成，即可完成这笔充值。</p>
          <p>4、请尽量保留转账截图，作为纠纷时证据。</p>
          <p>5、银行转账时，请尽量使用即时到账，以免卖方长时间未收到款项。</p>
          <p>6、请于30分钟内向卖方指定账户支付款项，并点击“我已完成付款”，超时会被系统自动取消该笔充值订单。</p>
        </div>
      </div>
=======
>>>>>>> 9bff8711a6bb73dd7e746dd8c903629ecef06358
    </ul>
    <!-- 收款账号 -->
    <div class="account" :class="{'account2': orderStatus==7 || orderStatus==3}" v-if="orderStatus==5 || orderStatus==7 || orderStatus==3">
      <span>收款账号：{{orderDetailData.pay_type | payTypeText}}({{orderDetailData.account}})</span>
    </div>
    <!-- 手动取消提示 -->
    <div class="cancel" v-if="orderStatus==4">
      <span>您已手动取消该笔充值订单</span>
    </div>
    <!-- 提示 -->
    <div class="text-boxs" v-if="orderStatus != 4 && orderStatus != 5">
      <p class="hint">提示：</p>
      <div>
        <p>{{orderStatus|tipStatus1}}</p>
        <p>{{orderStatus|tipStatus2}}</p>
        <p>{{orderStatus|tipStatus3}}</p>
      </div>
    </div>

    <!-- 确认按钮 -->
    <div class="btn-pay-boxs" v-if="1">
      <button @click="submit()" class="btn-pay">{{orderStatus|btnStatus}}</button>
    </div>
    <div class="appeal" v-if="orderStatus==7 || orderStatus==3"><span>2小时候自动确认收款</span><i v-show="0">我要申诉</i></div>
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
      btnQRText: '查看',
      bodyHeight: 0,
      navTitle: '订单详情',
      showQrcode: true,
      orderStatus: '2',
      order_no: '',
      orderDetailData: {}
    }
  },
  created () {
    const format = sessionStorage.getItem('reqformat')
    this.postFormat = JSON.parse(format)
    this.orderStatus = this.$route.query.status
    this.order_no = this.$route.query.orderid
    this.getOrderData()
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

      const url = this.$api.order + '/api/order/drawDetail'
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            this.orderDetailData = res.data.list
            console.log(this.orderDetailData, '132')
            // this.payway = res.data.list.pay_type
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问')
        })
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

      const url = this.$api.order + '/api/order/cancelOrder'
      axios.post(url, data)
        .then(res => {
          res = res.data
          console.log(res, 123)
          if (res.code === 10000) {
            this.$router.go(-1)
          } else {
            this.dialogBoxVal = false
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问')
        })
    },
    // 确认收款
    finishOrder () {
      // const data = {
      //   'app-name': '123',
      //   'merchant_type': '1', // 1:A端
      //   'merchant_code': '12345',
      //   'order_no': this.order_no,
      //   'third_user_id': '1'
      // }
      let data = this.postFormat
      data.order_no = this.order_no

      const url = this.$api.order + '/api/order/confirmOrder'
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            localStorage.setItem('openLoopFinish', '0')
            this.$router.go(-1)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问')
        })
    },
    submit () {
      this.orderStatus = this.orderStatus.toString()
      if (this.orderStatus === '1') {
        localStorage.setItem('openLoopConfirm', '0')
        this.cancelOrder1()
        return false
      } else if (this.orderStatus === '3' || this.orderStatus === '7') { // 2 6 已匹配 // 3 7
        this.finishOrder()
      } else {
        this.$router.go(-1)
      }
    },
    openQrcode () {
      this.showQrcode = !this.showQrcode
      this.btnQRText = this.showQrcode ? '收起' : '点击查看'
    },
    callback () {
<<<<<<< HEAD
=======
    },
    copy () {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$toast('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        console.log('该浏览器不支持自动复制')
        clipboard.destroy()
      })
    }
  },
  filters: {
    payTypeText: function (value) {
      // value = value.toString()
      if (value === 1) {
        value = '支付宝'
      } else if (value === 2) {
        value = '微信'
      } else {
        value = '银行卡'
      }
      return value
    },
    btnStatus: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '取消订单'
      } else if (value === '7' || value === '3') {
        value = '确认收款'
      } else {
        value = '返回'
      }
      return value
    },
    orderStatus: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '已提交'
      } else if (value === '7' || value === '3') {
        value = '待确认'
      } else if (value === '6' || value === '2') {
        value = '已匹配'
      } else if (value === '5') {
        value = '已完成'
      } else {
        value = '已取消'
      }
      return value
    },
    tipStatus1: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '1、我们已接收您的提现订单，并正在为您匹配买方。'
      } else if (value === '7' || value === '3') {
        value = '1、当前已有买方匹配您的提现订单，正在准备付款，请稍后片刻。'
      } else if (value === '6' || value === '2') {
        value = '1、买方已成功向你支付款项，如果您已经收到该笔款项，请点击下方“我已确认收款”按钮。'
      } else if (value === '5') {
        value = '1、该笔充值已完成，如没有充值到账请联系***核实。'
      } else {
        value = ''
      }
      return value
    },
    tipStatus2: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '2、当订单变更为已匹配状态时，则表示已有买方正准备向你的订单付款。'
      } else if (value === '7' || value === '3') {
        value = '2、如果在10分钟内，买方未向你付款，系统将自动为您的订单重新匹配。'
      } else if (value === '6' || value === '2') {
        value = '2、如果3分钟内未收到买方款项，请点击下方申诉按钮进行申诉。'
      } else {
        value = ''
      }
      return value
    },
    tipStatus3: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '3、成功完单笔提现订单后才可发起下一笔提现。'
      } else if (value === '7' || value === '3') {
        value = '3、提现订单已匹配状态下，您不能取消操作。'
      } else if (value === '6' || value === '2') {
        value = '3、如果未收到买方支付的款项，请勿点击下方“我已确认收款”按钮，以免造成损失。'
      } else {
        value = ''
      }
      return value
>>>>>>> 9bff8711a6bb73dd7e746dd8c903629ecef06358
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
        margin-right: -122px;
        color: #2D79F1;
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
  .cancel{
    font-size: 28px;
    color: #999999;
    text-align: center;
    margin: 250px 0 45px;
  }
  .account{
    margin: 29px 30px 310px;
    background: #FFFFFF;
    border-radius: 10px;
    color: #242424;
    font-size: 26px;
    height: 84px;
    line-height: 84px;
    text-align: center;
  }
  .account2{
    margin: 29px 30px 24px !important;;
  }
  .text-boxs {
    padding: 0 43px;
    margin-bottom: 150px;
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
<<<<<<< HEAD
  }
=======
>>>>>>> 9bff8711a6bb73dd7e746dd8c903629ecef06358
  .btn-pay-boxs {
    padding: 0 75px;
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
  }
  .appeal{
    font-size: 26px;
    color: #ABABAB;
    width: 100%;
    padding: 0 190px;
    i{
      font-style: normal;
      color: #3B67E0;
      margin-left: 20px;
    }
  }
  .btn-wait-boxs {
    margin: 233px auto 103px;
    width: 600px;
    height: 80px;
    background:linear-gradient(94deg,rgba(196,208,247,1),rgba(196,208,247,1));
    box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius:10px;
    p {
      display: inline-block;
      font-size:32px;
      color: #ffffff;
      line-height: 80px;
      margin-left: 177px;
    }
    .text {
      display: inline-block;
      margin-left: 26px;
      color: #2F81FE;
      font-size: 28px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
    }
  }
}
</style>
