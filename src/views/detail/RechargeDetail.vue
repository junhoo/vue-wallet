<template>
<div class="detail-body">
  <common-header title="订单详情"></common-header>
  <div class="recharge" v-if="!loadingVal">
    <div class="rechargeMain">
         <!-- 订单信息 -->
         <section>
           <ul>
             <li>
               <span class="m_left" :class="{'skyblue':orderType == 2 || orderType == 6, 'blue':orderType == 5 || orderType == 3 || orderType == 7, 'red':orderType == 4 ||orderType == 8}">{{orderType|orderStatus}}</span>
                <template v-if="orderType == 2 || orderType == 6" >
                  <count-down :endTime="rest_time2" :callback="callback(0)" endText="" timeType='zh'></count-down>
                </template>
                <template>
                  <i v-show="orderType == 8" class="m_right">超时自动取消</i>
                  <i v-show="orderType == 4" class="m_right">已被手动取消</i>
                  <i v-show="orderType == 3 || orderType == 7" class="m_right">等待对方确认收款</i>
                </template>
             </li>
             <li>
               <span class="m_left">付款金额</span>
               <i class="m_right">{{orderDetailData.order_amount}}CNY</i>
             </li>
             <li>
               <span class="m_left">充值积分</span>
               <i class="m_right">{{orderDetailData.order_amount}}</i>
             </li>
             <li>
               <span class="m_left">下单时间</span>
               <i class="m_right">{{orderDetailData.time_str}}</i>
             </li>
             <li>
               <span class="m_left">订单编号</span>
               <div class="m_right">
                 <i class="right_text">{{orderDetailData.order_no}}</i>
                 <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="orderDetailData.order_no" @click="copy()">
               </div>
             </li>
           </ul>
         </section>
         <!-- 支付信息 -->
          <section>
           <ul class="wrapper" v-if="orderType != 4 && orderType != 8">
             <li class="li-item">
               <span class="m_left">{{payway|payTypeText}}支付</span>
                <div v-if="orderType != 3 && orderType != 7 && orderType != 5" class="m_right" @click="checkoutPay(0)">
                  <i class="right_text">切换支付方式</i>
                  <img src="~imgurl/arrow-right2.png" alt=""  class="right_icon arrow-icon">
               </div>
             </li>
             <li>
               <span class="m_left">收款人</span>
               <div class="m_right">
                 <i class="right_text">{{pay_name}}</i>
                 <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="pay_name" @click="copy()">
               </div>
             </li>
             <!-- 支付宝、微信支付 -->
             <div class="wxAli" v-if="payway != 3">
               <li>
                  <span class="m_left">{{payway|payTypeText}}账号</span>
                  <div class="m_right">
                    <i class="right_text">{{pay_account}}</i>
                    <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="pay_account" @click="copy()">
                  </div>
                </li>
                <li class="qrcode">
                  <span class="m_left">收款二维码</span>
                  <div class="m_right">
                    <img class="QR" :src="pay_url" alt=""><br>
                    <a href="javascript:void(0);" @click="downs()">保存二维码</a>
                    <div id="qrcode" class="QR" @click="qrcode($event)" ref="qrcode">二维码位置</div>
                  </div>
                </li>
             </div>
             <!--银行卡支付  -->
             <div class="band" v-else>
               <li>
                  <span class="m_left">银行名称</span>
                  <div class="m_right">
                    <i class="right_text">{{pay_info.bank_pay.bank_address}}</i>
                    <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="中国银行" @click="copy()">
                  </div>
                </li>
                <li>
                  <span class="m_left">支行名称</span>
                  <div class="m_right">
                    <i class="right_text">{{pay_info.bank_pay.bank_sub_branch}}</i>
                    <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="pay_info.bank_pay.bank_sub_branch" @click="copy()">
                  </div>
                </li>
                <li>
                  <span class="m_left">银行卡号</span>
                  <div class="m_right">
                    <i class="right_text">{{pay_info.bank_pay.bank_no}}</i>
                    <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="pay_info.bank_pay.bank_no" @click="copy()">
                  </div>
                </li>
             </div>
             <li>
               <span class="m_left">付款时备注</span>
               <div class="m_right">
                 <i class="right_text">{{pay_remarks}}</i>
                 <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="pay_remarks" @click="copy()">
               </div>
             </li>
           </ul>
         </section>
         <!-- 选择支付方式弹框 -->
        <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
            <ul class="wrapper">
              <li class="clearfix">
                <div class="m_center">切换支付方式</div>
              </li>
              <li class="clearfix" v-if="paykind.isAlipay">
                <div class="m_left">
                 <img src="~imgurl/alipay-icon.png" alt=""  class="left_icon">
                 <i class="left_text">支付宝/Alipay</i>
                </div>
                <div class="m_right" @click="payChange(1)"><i class="rightBG_icon" :class="{'Active_pay' : payway == 1}"></i></div>
              </li>
              <li class="clearfix" v-if="paykind.iswx">
                <div class="m_left">
                 <img src="~imgurl/wx-icon.png" alt=""  class="left_icon">
                 <i class="left_text">微信/WeChat</i>
                </div>
                <div class="m_right" @click="payChange(2)"><i class="rightBG_icon" :class="{'Active_pay' : payway == 2}"></i></div>
              </li>
              <li class="clearfix" v-if="paykind.isbank">
                <div class="m_left">
                 <img src="~imgurl/bank-icon.png" alt=""  class="left_icon">
                 <i class="left_text">银行卡/Bank</i>
                </div>
                <div class="m_right" @click="payChange(3)"><i class="rightBG_icon" :class="{'Active_pay' : payway == 3}"></i></div>
              </li>
            </ul>
          <div class="btn-pay-boxs">
            <button class="btn-pay"></button>
            <button @click="checkoutPay(1)" class="btn-pay boxW">确定</button>
          </div>
        </van-popup>
        <!-- 提示信息 -->
        <section>
          <div class="tip" v-show="orderType == 4">
            <span> 注意：</span><br>
            <span>1：您已手动关闭了该订单交易</span><br>
            <span>2：如果您已经向对方付款，而误点了取消订单按钮请联系客服。</span>
          </div>
          <div class="tip" v-show="orderType == 8">
            <span> 注意：</span><br>
            <span>1：超时未付款已被系统自动取消该订单</span><br>
            <span>2：如果您已经向对方付款，而忘记确认付款请联系客服。</span>
          </div>
           <div class="tip" v-show="orderType == 3">
            <span> 注意：</span><br>
            <span>1：您已成功向对方付款，请等待对方确认收款即可完成</span><br>
            <span>2：如果10分钟内对方未确认，请发起申诉。</span>
          </div>
          <div class="tip" v-show="orderType == 2 || orderType == 6">
            <span> 注意：</span><br>
            <span>1.平台不支持自动扣款,请用您本人的账号向以上账户转账</span><br>
            <span>2.转账成功后请点击下方“我已完成付款”按钮</span><br>
            <span>3.成功转账后，待卖方确认收款，即可完成该笔充值</span><br>
            <span>4.请尽量保留转账截图，作为申诉时证据</span><br>
            <span>5.银行转账时，请尽量使用即时到账，以免卖方长时间未收到款项</span><br>
            <span>6.请于10分钟内向卖方指定账户支付款项，并点击 “我已完成付款”，超时会被系统自动取消该笔充值订单；</span><br>
          </div>
        </section>
    </div>
    <common-footer :rest_time="rest_time" v-on:refreshData='getOrderDel' :showfooter="orderType" :orderDetailData="orderDetailData" :pay_info="pay_info" :order_type="1" :order_no="order_no" :pay_type="payway"></common-footer>
  </div>
  <common-loading v-else :show.sync='loadingVal' :mask="true"></common-loading>
</div>
</template>
<script>
import { post } from '@/assets/js/fetch'
import CommonHeader from 'common/header/Header'
import CommonFooter from 'common/header/Footer'
import CommonLoading from 'common/loading/Loading'
import CountDown from 'common/time/CountDown'
import Clipboard from 'clipboard'
import QRCode from 'qrcodejs2'
export default {
  name: 'RechargeDetail',
  components: {
    CommonHeader,
    CommonFooter,
    CountDown,
    CommonLoading,
    QRCode
  },
  data () {
    return {
      show: false,
      payway: null, // 1.支付宝 2.微信 3.银行卡
      paykind: {
        iswx: false,
        isAlipay: false,
        isbank: false
      },
      order_type: 1, // 订单类型 1.充值 2.提现
      orderType: null, // 订单状态 2.代付款 3.未到账 4.已取消(手动) 5.已完成 8.已取消(自动)
      orderDetailData: {}, // 订单详情信息
      order_no: '', // 订单编号
      pay_name: '', // 支付账户名
      pay_account: '14154sadf', // 支付账号
      pay_url: '', // 支付二维码
      pay_remarks: '', // 付款时备注
      pay_info: {}, // 支持付款方式
      rest_time: null,
      loadingVal: true
    }
  },
  created () {
    this.order_no = this.$route.query.order_no
    this.getOrderDel()
  },
  methods: {
    // 图片下载
    qrcode (e) {
      let qrcode = new QRCode('qrcode', {
        width: 200,
        height: 200,
        text: this.pay_url
      })
      console.log(qrcode, 123)
      console.log(e.currentTarget.lastElementChild, '45')
    },
    downs () {
      var alink = document.createElement('a')
      let event = new MouseEvent('click')
      alink.href = this.imgs
      alink.download = '张三的二维码'
      alink.href = 'data:image/png;base64,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'
      alink.dispatchEvent(event)
    },
    callback () {},
    // 获取订单信息
    getOrderDel () {
      var data = {
        token: sessionStorage.getItem('randomcode'),
        order_no: this.order_no
      }
      let url = this.$api.order + '/api/order/payDetail'
      post(url, data)
        .then(res => {
          this.orderDetailData = res.data.list.order_detail
          this.payway = this.orderDetailData.pay_type || 0
          this.orderType = this.orderDetailData.status || 0
          this.order_type = this.orderDetailData.order_type
          this.pay_info = res.data.list.pay_type
          this.rest_time2 = this.orderDetailData.rest_time
          this.rest_time = this.orderDetailData.apply_time
          this.loadingVal = false
          this.payTypeMsg()
        })
        .catch(e => {
          this.loadingVal = false
          console.log(e)
          // this.$toast('网络错误4')
          this.$toast(e.msg)
        })
    },
    // 确定支付信息
    payTypeMsg () {
      if (this.payway === 1) {
        this.pay_url = this.pay_info.ali_pay.pay_url
      } else if (this.payway === 2) {
        this.pay_url = this.pay_info.wechat_pay.pay_url
      }
      if (this.pay_info.ali_pay) {
        this.paykind.isAlipay = true
        this.pay_name = this.pay_info.ali_pay.alipay_name
        this.pay_remarks = this.pay_info.ali_pay.pay_remarks
        this.pay_account = this.pay_info.ali_pay.alipay_account
      }
      if (this.pay_info.wechat_pay) {
        this.paykind.iswx = true
        this.pay_name = this.pay_info.wechat_pay.wechat_name
        this.pay_remarks = this.pay_info.wechat_pay.pay_remarks
        this.pay_account = this.pay_info.wechat_pay.wechat_account
      }
      if (this.pay_info.bank_pay) {
        this.paykind.isbank = true
        this.pay_name = this.pay_info.bank_pay.bank_name
        this.pay_remarks = this.pay_info.bank_pay.pay_remarks
      }
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
    },
    // 复制
    copy () {
      var clipboard = new Clipboard('.tag-copy')
      clipboard.on('success', e => {
        this.$toast('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        clipboard.destroy()
      })
    }
  },
  filters: {
    payTypeText: function (val) {
      let value = val || '0'
      value = value.toString()
      if (value === '1') {
        value = '支付宝'
      } else if (value === '2') {
        value = '微信'
      } else {
        value = '银行卡'
      }
      return value
    },
    orderStatus: function (val) {
      let value = val || '0'
      value = value.toString()
      if (value === '4' || value === '8') {
        value = '已取消'
      } else if (value === '2' || value === '6') {
        value = '待付款'
      } else if (value === '5') {
        value = '已完成'
      } else if (value === '3' || value === '7') {
        value = '未到账'
      } else {
        value = ''
      }
      return value
    }
  }
}
</script>

<style lang="less" scoped>
.detail-body {
  position: fixed;
  overflow-y: scroll;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .header{
    background-color: #fff;
  }
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .van-loading{
    position: absolute;
    width: 60px;
    height: 60px;
    padding: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    .van-loading__spinner{
      width: 60px;
      height: 60px;
    }
  }
}
.van-popup--bottom{
  height: 671px;
  border-radius: 20px 20px 0 0;
}
.van-overlay{
  background-color: rgba(49, 49, 109, .25);
}
.btn-pay-boxs{
  text-align: center;
  position: relative;
  .btn-pay{
    width: 82.4%;
    height: 97px;
    text-align: center;
    font-size: 30px;
    color: #2A2A2A;
    border-radius: 49px;
    background-image:-webkit-linear-gradient(left, #4264FB 0%, #4264FB 30%, #4264FB 70%, #16D3EF 90%);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50px
  }
  .boxW{
    width: 82.1%;
    height: 93px;
    top: 52px;
    background-image:-webkit-linear-gradient(left, #fff 0%, #fff 100%)
  }
}
.recharge{
  position: fixed;
  top: 88px;
  background-color: #F5F8FA;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .rechargeMain{
    padding: 36px 30px 420px;
    ul{
      width: 100%;
      margin-bottom: 24px;
      background-color: #fff;
      border-radius: 20px;
      box-sizing: border-box;
      li{
        height: 100px;
        line-height: 100px;
        padding: 0 39px;
        border-bottom: 1px solid #F5F4F4;
        display: flex;
        justify-content: space-between;
        font-size: 26px;
        &:last-of-type{
          border: none
        }
        .m_center{
          text-align: center;
          color: #000;
          font-size: 28px;
          width: 100%
        }
        .m_left{
          color: #ABACAF;
          .left_icon{
            width: 49px;
            margin-right: 30px
          }
          .left_text{
            color: #000;
            font-size: 28px
          }
        }
        .m_right{
          color: #010101;
          flex: 1;
          text-align: right;
          .right_icon{
            width: 35px;
            margin-left: 25px
          }
          .rightBG_icon{
            display: inline-block;
            height: 38px;
            width: 38px;
            background: url('~imgurl/radio-0-icon.png') center / 100% no-repeat
          }
          .Active_pay{
            background: url('~imgurl/radio-1-icon.png') center / 100% no-repeat
          }
          .arrow-icon{
            width: 18px;
          }
        }
        .skyblue{
          color: #3EC0F1
        }
        .blue{
          color: #4264FB
        }
        .red{
          color: #FF5252
        }
        span.timer{
          color: #010101 !important
        }
      }
      .qrcode{
        height: 400px;
        position: relative;
        .m_right{
          top: 60%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          text-align: center;
          .QR{
            width: 214px;
            height: 214px
          }
          a{
            color: #1359D2;
            border-bottom: 1px solid #1359D2;
            line-height: auto !important
          }
        }
      }
    }
  }
  .tip{
    font-size: 26px;
    color: #C2C2C2;
    padding: 10px 0 34px;
    span{
      line-height: 40px;
      display: inline-block;
    }
  }
}
}
</style>
