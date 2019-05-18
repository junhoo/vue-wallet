<template>
<div class="detail-body">
  <common-header title="订单详情"></common-header>
  <div class="recharge" v-if="!loadingVal">
    <div class="rechargeMain" id="Top3Img" ref="Top3Img">
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
                    <img class="QR" :src="pay_url" alt="" style="z-index: 9999"><br>
                    <a href="javascript:void(0);">保存二维码</a>
                    <!-- <a href="javascript:void(0);" @click="qrcode($event)">保存二维码</a> -->
                    <div id="qrcode" class="QR" ref="qrcode"></div>
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
      var urls = qrcode._oDrawing._elImage.src
      console.log(qrcode._oDrawing, 123)
      console.log(qrcode._oDrawing._elImage.alt, 123)
      console.log(this.$refs.qrcode.lastElementChild.alt, '45')
      this.downs(urls)
      qrcode.clear()
    },
    downs (urls) {
      var alink = document.createElement('a')
      let event = new MouseEvent('click')
      alink.href = this.imgs
      alink.download = '付款二维码'
      // alink.href = 'data:image/png;base64,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'
      alink.href = urls
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
      this.payTypeMsg()
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
/deep/ .van-popup--bottom{
  height: 671px;
  border-radius: 20px 20px 0 0;
}
/deep/ .van-overlay{
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
          #qrcode{
            position: absolute;
            top: 0;
            left: 0;
            img{
              display: none !important
            }
          }
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
            height: 214px;
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
