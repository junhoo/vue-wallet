<template>
  <div>
    <common-header :title="navTitle"></common-header>
    <main>
      <div class="boxs">
        <div class="name">银行卡</div>
        <div class="text">立即绑定</div>
      </div>
      <div class="boxs">
        <div class="name">支付宝</div>
        <div class="text">立即绑定</div>
      </div>
      <div class="boxs">
        <div class="name">微信</div>
        <div class="text">立即绑定</div>
      </div>
      <p>注：请务必使用您本人的实名账号，被绑定的支付方式将在交易时向买方展示，请至少绑定一种支付方式</p>
    </main>
  </div>
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
      navTitle: '设置'
    }
  },
  methods: {
    jumpPayBound () {
      this.$router.push({ name: 'Detail' })
    },
    jumpRealBound () {
      this.$router.push({ name: 'Detail' })
    }
  }
}
</script>

<style lang="less" scoped>
main {
  box-sizing: border-box;
  margin: 0 20px;
  .boxs {
    display: flex;
    justify-content: space-between;
    height: 182.5px;
    line-height: 182.5px;
    margin: 20px 0px;
    text-align: center;
    background: url('~imgurl/bank_icon_active.png') center left 30px no-repeat;
    background-size: 40px 40px;
    background-color: #F5F6FA;
    border-radius: 20px;
    .name {
      font-size: 28px;
      margin-left: 90px;
      color: #9EA8B9;
    }
    .text {
      font-size: 30px;
      color: #6D778B;
      padding-right: 50px;
      background: url('~imgurl/arrow-right.png') no-repeat right 20px center;
      background-size: 16px 28px;
    }
  }
  p {
    padding: 0 18px;
    line-height: 67px;
    font-size: 26px;
    font-family: PingFang-SC-Medium;
    color:#666666;
  }
}
</style>
