<template>
<div>
  <div v-if="(showfooter == 2 || showfooter == 6) && order_type == 1">
     <div class="footer clearfix">
      <p @click="submit()">确认付款</p>
      <p @click="cancelOrder(0)" class="borbtn">取消订单</p>
    </div>
  </div>
  <div v-else-if="(showfooter == 3 || showfooter == 7) && order_type == 1">
    <div class="foote clearfix">
      <!-- <p v-if="endCountdown == 0">
        发起申诉
        <count-down :endTime="1557130889000"
          endText=""
          timeType='symbol'
          v-on:callbackEvent='oncallback'>
        </count-down>
      </p> -->
      <p v-if="endCountdown == 1" @click="appeal()" class="borbtn">发起申诉</p>
    </div>
  </div>
  <div v-else-if="(showfooter == 3 || showfooter == 7) && order_type == 2">
    <div class="foo clearfix">
      <p @click="submit2()">确认收款</p>
      <p @click="submit2()"  v-if="endCountdown == 0">确认收款</p>
      <!-- <p class="appbtn" v-if="endCountdown == 0">
        发起申诉
        <count-down :endTime="1557310497000"
          endText=""
          timeType='symbol'
          v-on:callbackEvent='oncallback'>
        </count-down>
      </p> -->
      <p @click="appeal()" class="borbtn" v-if="endCountdown2 == 1">发起申诉</p>
    </div>
  </div>
  <div v-else>
    <div class="foot clearfix">
      <p v-if="okTxt">{{okTxt}}</p>
      <p v-else>{{showfooter|textW}}</p>
      <span>联系客服 {{showfooter}}</span>
    </div>
  </div>
<!-- 弹出框 -->
<van-popup v-model="show" position="bottom" :overlay="false">
  <h3 class="title_tip">提示</h3>
  <span class="txt_tip">每天手动或超时取消订单超过3次，将被禁止交易24小时</span>
  <p class="actBtn submit" @click="cancelOrder(1)">取消订单</p>
  <p class="actBtn cancel" @click="cancelOrder(0)">继续交易</p>
</van-popup>
</div>
</template>

<script>
import { post } from '@/assets/js/fetch'
import CountDown from 'common/time/CountDown'
export default {
  name: 'Footer',
  components: {
    CountDown
  },
  props: {
    okTxt: String,
    showfooter: Number,
    order_type: Number,
    pay_type: Number,
    order_no: Number,
    orderDetailData: Object,
    pay_info: Object
  },
  data () {
    return {
      show: false,
      endCountdown: 0,
      endCountdown2: 0
    }
  },
  methods: {
    oncallback (bol) {
      this.endCountdown = 1
      this.endCountdown2 = 1
    },
    // 取消订单
    cancelOrder (index) {
      if (index === 0) {
        this.show = !this.show
        return false
      }
      var data = {
        token: sessionStorage.getItem('randomcode'),
        order_no: this.order_no
      }
      let url = this.$api.order + '/api/order/cancelRechangeOrder'
      post(url, data)
        .then(res => {
          console.log(res)
          this.$emit('refreshData', true)
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误4')
        })
    },
    // 确认付款
    submit () {
      var data = {
        token: sessionStorage.getItem('randomcode'),
        order_no: this.order_no,
        pay_type: this.pay_type
      }
      let url = this.$api.order + '/api/order/endRechangeOrder'
      post(url, data)
        .then(res => {
          this.$router.go(-1)
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误4')
        })
    },
    // 确认收款
    submit2 () {
      var data = {
        token: sessionStorage.getItem('randomcode'),
        order_no: this.order_no
      }
      let url = this.$api.order + '/api/order/confirmOrder'
      post(url, data)
        .then(res => {
          this.$router.go(-1)
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误4')
        })
    },
    appeal () {
      if (this.order_type === 2) {
        this.$router.push({
          path: '/appeal',
          query: {
            orderDetailData: JSON.stringify(this.orderDetailData),
            order_type: this.order_type
          }
        })
        return false
      }
      this.$router.push({
        path: '/appeal',
        query: {
          orderDetailData: JSON.stringify(this.orderDetailData),
          pay_info: JSON.stringify(this.pay_info)
        }
      })
    }
  },
  filters: {
    textW: function (value) {
      value = value.toString()
      if (value === '4' || value === '8') {
        value = '操作失误导致订单被取消？'
      } else if (value === '5') {
        value = '钱包积分未产生变化或者订单信息有误？'
      }
      return value
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.footer {
  bottom: 0;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  padding: 45px 65px 40px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  z-index: 100;
  p{
    width: 100%;
    height: 97px;
    line-height: 97px;
    text-align: center;
    font-size: 30px;
    color: #F5F5F5;
    border-radius: 49px;
    background-color: #4264FB;
    margin-bottom: 35px
  }
  .borbtn{
    background:url('~imgurl/bg-border.png') center / 100% no-repeat;
    color: #2A2A2A
  }
}
.foote{
  bottom: 0;
  background-color: #fff;
  text-align: center;
  padding: 45px 65px 69px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 20px 20px 0 0;
  position: fixed;
  z-index: 100;
  p{
    height: 97px;
    line-height: 97px;
    background-color: #BFBFBF;
    border-radius: 49px;
    color: #F5F5F5;
    font-size: 30px;
    span{
      display: inline-block
    }
  }
  .borbtn{
    background-color: #4264FB
  }
}
.foot{
  bottom: 0;
  background-color: #000;
  text-align: center;
  padding: 48px 65px 52px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  z-index: 100;
  P{
    font-size: 28px;
    color: #FFF;
    margin-bottom: 28px
  }
  span{
    display: inline-block;
    font-size: 28px;
    color: #00C9E7;
    padding: 5px 0;
    border-bottom: 1px solid #00C9E7;
  }
}
.foo{
  bottom: 0;
  background-color: #fff;
  text-align: center;
  padding: 45px 63px 48px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  z-index: 100;
  p{
    width: 100%;
    height: 97px;
    line-height: 97px;
    text-align: center;
    font-size: 28px;
    color: #F5F5F5;
    border-radius: 49px;
    background-color: #4264FB;
    margin-bottom: 35px
  }
  .appbtn{
    background-color: transparent;
    border: 3px solid #B5B5B5;
    color: #BDBDBD
  }
}
.van-popup--bottom{
  height: auto;
  border-radius: 20px 20px 0 0;
  padding: 45px 65px 75px;
  text-align: center;
  box-sizing: border-box;
  .actBtn{
    width: 100%;
    border-radius: 49px;
    height: 97px;
    line-height: 97px;
    font-size: 30px;
  }
  .submit{
    color: #F5F5F5;
    background-color: #4264FB;
    margin-bottom: 25px
  }
  .cancel{
    color: #2A2A2A;
    background: url('~imgurl/bg-border.png') center / 100% no-repeat
  }
  .title_tip{
    font-size: 38px;
    color: #0F0F0F;
    margin-bottom: 33px
  }
  .txt_tip{
    display: inline-block;
    font-size: 28px;
    color: #7D7D7D;
    margin-bottom: 68px
  }
}
</style>
