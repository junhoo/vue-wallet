<template>
<div v-if="showfooter == 2">
   <div class="footer clearfix">
    <p>{{tip1}}</p>
    <p class="borbtn">{{tip2}}</p>
  </div>
</div>
<div v-else-if="showfooter == 3">
  <div class="foote clearfix">
    <!-- <p>发起申诉<count-down v-show="showfooter == 2" endTime="1556262542" :callback="callback(0)" endText="" timeType='zh'></count-down></p> -->
    <p class="borbtn">发起申诉</p>
  </div>
</div>
<div v-else-if="showfooter == 7">
  <div class="foo clearfix">
    <p>确认收款</p>
    <p class="appbtn">发起申诉<count-down v-show="showfooter == 7" endTime="1556262542" :callback="callback(0)" endText="" timeType='zh'></count-down></p>
  </div>
</div>
<div v-else>
  <div class="foot clearfix">
    <p v-if="okTxt">{{okTxt}}</p>
    <p v-else>{{showfooter|textW}}</p>
    <span>联系客服</span>
  </div>
</div>
</template>

<script>
import CountDown from 'common/time/CountDown'
export default {
  name: 'Footer',
  components: {
    CountDown
  },
  props: {
    tip1: String,
    tip2: String,
    okTxt: String,
    showfooter: Number
  },
  methods: {
    callback () {},
    // appeal () {
    //   this.$router.push({
    //     path: '/appeal',
    //     query: {
    //       orderType: this.showfooter
    //     }
    //   })
    // }
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
</style>
