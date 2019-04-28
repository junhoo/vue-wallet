<template>
  <div class="recharge">
    <common-header title="订单详情"></common-header>
    <div class="rechargeMain">
       <!-- 订单信息 -->
       <section>
         <ul>
           <li>
             <span class="m_left" :class="{'skyblue':orderType == 2, 'blue':orderType == 5 || orderType == 3, 'red':orderType == 4 ||orderType == 8}">{{orderType|orderStatus}}</span>
              <template>
                <count-down v-show="orderType == 2" endTime="1556262542" :callback="callback(0)" endText="" timeType='zh'></count-down>
              </template>
              <template>
                <i v-show="orderType == 4" class="m_right">超时自动取消</i>
                <i v-show="orderType == 8" class="m_right">已被手动取消</i>
                <i v-show="orderType == 3" class="m_right">等待对方确认收款</i>
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
         <ul class="wrapper" v-if="orderType != 4 || orderType != 8">
           <li class="li-item">
             <span class="m_left">{{payway|payTypeText}}支付</span>
              <div class="m_right" @click="checkoutPay(0)">
                <i class="right_text">切换支付方式</i>
                <img src="~imgurl/arrow-right2.png" alt=""  class="right_icon arrow-icon">
             </div>
           </li>
           <li>
             <span class="m_left">收款人</span>
             <div class="m_right">
               <i class="right_text">Jeney</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="Jeney" @click="copy()">
             </div>
           </li>
           <!-- 支付宝、微信支付 -->
           <div class="wxAli" v-if="payway != 3">
             <li>
                <span class="m_left">{{payway|payTypeText}}账号</span>
                <div class="m_right">
                  <i class="right_text">Jeney1625</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="Jeney1625" @click="copy()">
                </div>
              </li>
              <li class="qrcode">
                <span class="m_left">收款二维码</span>
                <div class="m_right">
                  <img class="QR" src="~imgurl/upload.png" alt=""><br>
                  <a :href="imgUrl" download="">保存二维码
                    <img :src="imgUrl" alt="">
                  </a>
                </div>
              </li>
           </div>
           <!--银行卡支付  -->
           <div class="band" v-else>
             <li>
                <span class="m_left">银行名称</span>
                <div class="m_right">
                  <i class="right_text">中国银行</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="中国银行" @click="copy()">
                </div>
              </li>
              <li>
                <span class="m_left">支行名称</span>
                <div class="m_right">
                  <i class="right_text">梅陇支行</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="梅陇支行" @click="copy()">
                </div>
              </li>
              <li>
                <span class="m_left">银行卡号</span>
                <div class="m_right">
                  <i class="right_text">20190415002006005</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="20190415002006005" @click="copy()">
                </div>
              </li>
           </div>

           <li>
             <span class="m_left">付款时备注</span>
             <div class="m_right">
               <i class="right_text">8898</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="8898" @click="copy()">
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
        <div class="tip" v-show="orderType == 8">
          <span> 注意：</span><br>
          <span>1：您已手动关闭了该订单交易</span><br>
          <span>2：如果您已经向对方付款，而误点了取消订单按钮请联系客服。</span>
        </div>
        <div class="tip" v-show="orderType == 4">
          <span> 注意：</span><br>
          <span>1：超时未付款已被系统自动取消该订单</span><br>
          <span>2：如果您已经向对方付款，而忘记确认付款请联系客服。</span>
        </div>
         <div class="tip" v-show="orderType == 3">
          <span> 注意：</span><br>
          <span>1：您已成功向对方付款，请等待对方确认收款即可完成</span><br>
          <span>2：如果10分钟内对方未确认，请发起申诉。</span>
        </div>
        <div class="tip" v-show="orderType == 2">
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
    <common-footer tip1="确认付款" tip2="取消订单" :showfooter="orderType"></common-footer>
  </div>
</template>
<script>
import { post } from '@/assets/js/fetch'
import CommonHeader from 'common/header/Header'
import CommonFooter from 'common/header/Footer'
import DialogBox from 'common/dialog/Dialog'
import CountDown from 'common/time/CountDown'
import Clipboard from 'clipboard'
export default {
  name: 'RechargeDetail',
  components: {
    DialogBox,
    CommonHeader,
    CommonFooter,
    CountDown
  },
  data () {
    return {
      show: false,
      payway: '1', // 1.支付宝 2.微信 3.银行卡
      paykind: {
        iswx: true,
        isAlipay: true,
        isbank: true
      },
      orderType: 3, // 订单状态 2.代付款 3.未到账 4.已取消(手动) 5.已完成 8.已取消(自动)
      imgUrl: '~imgurl/copy-icon.png', // 付款二维码
      orderDetailData: {}, // 订单详情信息
      order_no: '' // 订单编号
    }
  },
  created () {
    this.order_no = this.$route.query.order_no
    this.getOrderDel()
  },
  methods: {
    callback () {},
    // 获取订单信息
    getOrderDel () {
      var data = {
        token: localStorage.getItem('randomcode'),
        complain_no: this.complain_no
      }
      let url = this.$api.order + '/api/order/payDetail'
      post(url, data)
        .then(res => {
          console.log(res)
          this.orderDetailData = res.data.list
          this.payway = this.orderDetailData.pay_type
          this.orderType = this.orderDetailData.status
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误4')
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
    orderStatus: function (value) {
      value = value.toString()
      if (value === '4' || value === '8') {
        value = '已取消'
      } else if (value === '2') {
        value = '待付款'
      } else if (value === '5') {
        value = '已完成'
      } else if (value === '3') {
        value = '未到账'
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
  background-color: #F5F8FA;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .rechargeMain{
    padding: 118px 30px 350px;
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
      display: inline-block;
      margin-bottom: 20px
    }
  }
}
</style>
