<template>
<div>
 <common-header title="订单详情"></common-header>
  <div class="recharge">
    <div class="rechargeMain">
       <!-- 订单信息 -->
       <section>
         <ul>
           <li>
             <span class="m_left" :class="{'skyblue':orderType == 6, 'blue':orderType == 5, 'orange':orderType == 7, 'red':orderType == 4 ||orderType == 8}">{{orderType|orderStatus}}</span>
              <template>
                <count-down v-show="orderType == 2" :endTime="1556262542" :callback="callback(0)" endText="" timeType='zh'></count-down>
              </template>
              <template>
                <i v-show="orderType == 6" class="m_right">等待买方付款</i>
                <i v-show="orderType == 8" class="m_right">已手动取消该订单</i>
                <i v-show="orderType == 7" class="m_right">请确认买方已付款</i>
              </template>
           </li>
           <li>
             <span class="m_left">收款金额</span>
             <i class="m_right">{{orderDetailData.order_amount}}CNY</i>
           </li>
           <li>
             <span class="m_left">提现积分</span>
             <i class="m_right">{{orderDetailData.order_amount}}</i>
           </li>
           <li>
             <span class="m_left">提现费率</span>
             <i class="m_right">{{orderDetailData.rate}}%</i>
           </li>
           <li>
             <span class="m_left">实际到账</span>
             <i class="m_right">{{orderDetailData.real_amount}}CNY</i>
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
            <!-- <li>
             <span class="m_left">收款账户</span>
             <i class="m_right">银行卡(Jeney)</i>
           </li> -->
         </ul>
       </section>
      <!-- 提示信息 -->
      <section>
        <div class="tip" v-show="orderType == 6">
          <span> 注意：</span><br>
          <span>1：当前已有买方匹配您的提现订单，正在准备付款，请稍后片刻</span><br>
          <span>2：如果在10分钟内，买方未向你付款，系统将自动为您的订单重新匹配其他买方</span>
        </div>
        <div class="tip" v-show="orderType == 7">
          <span> 注意：</span><br>
          <span>1：买方已成功向你支付款项，如果您已经收到该笔款项，请点击下方“确认收款”按钮</span><br>
          <span>2：如果10分钟内未收到买方付款，请点击下方申诉按钮进行申诉。</span>
          <span>3：2小时后，系统自动为您确认收款，请及时核实或发起申诉。</span>
        </div>
      </section>
    </div>
    <common-footer v-if="orderType == 7 || orderType == 5" :orderDetailData="orderDetailData" :order_no="order_no" :order_type="order_type" tip1="确认付款" tip2="取消订单" :showfooter="orderType" okTxt="未收到买方付款到账？"></common-footer>
  </div>
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
  name: 'WithdrawalDetail',
  components: {
    DialogBox,
    CommonHeader,
    CommonFooter,
    CountDown
  },
  data () {
    return {
      order_type: 2, // 订单类型 1.充值 2.提现
      payway: '', // 1.支付宝 2.微信 3.银行卡
      orderType: null, // 订单状态 6.已匹配 7.待确认 4.已取消(手动) 5.已完成 8.已取消(自动)
      imgUrl: '~imgurl/copy-icon.png', // 付款二维码
      orderDetailData: {}, // 订单详情信息
      order_no: 123 // 订单编号
    }
  },
  created () {
    this.order_no = Number(this.$route.query.order_no)
    this.getOrderDel()
  },
  methods: {
    callback () {},
    // 获取订单信息
    getOrderDel () {
      var data = {
        token: sessionStorage.getItem('randomcode'),
        order_no: this.order_no
      }
      let url = this.$api.order + '/api/order/drawDetail'
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
    orderStatus: function (value) {
      value = value.toString()
      if (value === '4' || value === '8') {
        value = '已取消'
      } else if (value === '5') {
        value = '已完成'
      } else if (value === '6') {
        value = '已匹配'
      } else if (value === '7') {
        value = '待确认'
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
.recharge{
  position: fixed;
  background-color: #F5F8FA;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .rechargeMain{
    padding: 36px 30px 450px;
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
        .orange{
          color: #FFA63D
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
