<template>
  <transition>
    <div class="boundpay-body">
      <common-header :title="navTitle"></common-header>
      <main>
        <div class="boxs wechat" @click="jumpPayBound('wechat')">
          <div class="name">微信</div>
          <div class="text" v-text="wechat"></div>
        </div>
        <div class="boxs alipay" @click="jumpPayBound('alipay')">
          <div class="name">支付宝</div>
          <div class="text" v-text="alipay"></div>
        </div>
        <div class="boxs bank" @click="jumpPayBound('bank')">
          <div class="name">银行卡</div>
          <div class="text" v-text="bank"></div>
        </div>
        <p>注：请务必使用您本人的实名账户，被绑定的支付方式将在交易时向买方展示，请至少绑定一种支付方式；</p>
      </main>
    </div>
  </transition>
</template>

<script>
import CommonHeader from 'common/header/Header'
export default {
  name: 'SettingPay',
  components: {
    CommonHeader
  },
  data () {
    return {
      navTitle: '绑定支付',
      bank: '',
      alipay: '',
      wechat: '',
      userMsg: {},
      boundState: {}
    }
  },
  mounted () {
    this.userMsg = JSON.parse(sessionStorage.getItem('userMsg'))
    this.boundState = this.userMsg.pay_info
    this.getCheckPay()
  },
  methods: {
    getCheckPay () {
      this.bank = this.boundState.bank_pay ? '修改' : '立即绑定'
      this.alipay = this.boundState.ali_pay ? '修改' : '立即绑定'
      this.wechat = this.boundState.wechat_pay ? '修改' : '立即绑定'
    },
    jumpPayBound (type) {
      let isbound = 'n'
      if (this[type] === '修改') {
        isbound = 'y'
      }
      this.$router.push({ path: '/setting/bound', query: { type, isbound } })
    }
  }
}
</script>

<style lang="less" scoped>
.boundpay-body {
  position: fixed;
  top: 88px;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #f5f5f5;
}

main {
  box-sizing: border-box;
  margin: 30px 45px 0 45px;
  .bank {
    background: url('~imgurl/bank-icon.png') center left 32px no-repeat;
    background-size: 40px 40px;
  }
  .alipay {
    background: url('~imgurl/alipay-icon.png') center left 32px no-repeat;
    background-size: 40px 40px;
  }
  .wechat {
    background: url('~imgurl/wx-icon.png') center left 32px no-repeat;
    background-size: 40px 40px;
  }

  .boxs {
    display: flex;
    justify-content: space-between;
    height: 98px;
    line-height: 98px;
    position: relative;
    text-align: center;
    margin-bottom: 32px;
    border-radius: 16px;
    background-color: #ffffff;
    .name {
      font-size: 30px;
      margin-left: 95px;
      color: #333333;
    }
    .text {
      font-size: 32px;
      color: #1359D2;
      font-weight: bold;
      padding-right: 45px;
      background: url('~imgurl/arrow-right.png') no-repeat right 20px center;
      background-size: 16px 28px;
    }
  }

  p {
    padding: 7px 0 0 7px;
    line-height: 25px;
    font-size: 24px;
    font-family: PingFang-SC-Medium;
    color:#FF4F4F;
  }
}

.v-enter, .v-leave-to {
  opacity: 0;
}
.v-enter-active {
  transition: opacity .5s;
}
.v-leave-active {
  transition: opacity 0;
}
</style>
