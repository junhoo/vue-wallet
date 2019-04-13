<template>
  <transition>
    <div>
      <common-header :title="navTitle"></common-header>
      <main>
        <div class="boxs bank" @click="jumpPayBound('bank')">
          <div class="name">银行卡</div>
          <div class="text" v-text="bank"></div>
        </div>
        <div class="boxs alipay" @click="jumpPayBound('alipay')">
          <div class="name">支付宝</div>
          <div class="text" v-text="alipay"></div>
        </div>
        <div class="boxs wechat" @click="jumpPayBound('wechat')">
          <div class="name">微信</div>
          <div class="text" v-text="wechat"></div>
        </div>
        <p>注：请务必使用您本人的实名账号，被绑定的支付方式将在交易时向买方展示，请至少绑定一种支付方式</p>
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
      navTitle: '设置',
      bank: '',
      alipay: '',
      wechat: '',
      userMsg: {},
      boundState: {}
    }
  },
  created () {
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
      let isbound = '0'
      isbound = this.bank === '修改' ? 'y' : 'n'
      isbound = this.alipay === '修改' ? 'y' : 'n'
      isbound = this.wechat === '修改' ? 'y' : 'n'
      this.$router.push({ path: '/setting/bound', query: { type, isbound } })
    }
  }
}
</script>

<style lang="less" scoped>
main {
  box-sizing: border-box;
  margin: 40px 20px 0 20px;
  .boxs {
    display: flex;
    justify-content: space-between;
    height: 144px;
    line-height: 144px;
    margin: 20px 0px;
    text-align: center;
    background-color: #F5F6FA;
    border-radius: 20px;
    .name {
      font-size: 32px;
      margin-left: 92px;
      color: #9EA8B9;
    }
    .text {
      font-size: 32px;
      color: #6D778B;
      font-weight: bold;
      padding-right: 50px;
      background: url('~imgurl/arrow-right.png') no-repeat right 20px center;
      background-size: 16px 28px;
    }
  }
  .bank {
    background: url('~imgurl/bank-icon.png') center left 32px no-repeat;
    background-size: 42px 37px;
  }
  .alipay {
    background: url('~imgurl/alipay-icon.png') center left 32px no-repeat;
    background-size: 42px 37px;
  }
  .wechat {
    background: url('~imgurl/wx-icon.png') center left 32px no-repeat;
    background-size: 42px 37px;
  }
  p {
    padding: 0 18px;
    line-height: 48px;
    font-size: 26px;
    font-family: PingFang-SC-Medium;
    color:#666666;
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
