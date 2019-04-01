<template>
  <div>
    <common-header :title="navTitle"></common-header>
    <section>
      <div>
        <div class="li-tab-box">
          <div class="li-tab-text">充值</div>
          <div class="li-tab-time">2019-03-18 18:28:22</div>
          <div
              class="li-tab-status"
          >状态</div>
        </div>

        <div class="li-money">
          <div class="left">金额</div>
          <div class="right">￥100</div>
        </div>

        <div class="li-money">
          <div class="left">积分</div>
          <div class="right">100</div>
        </div>

        <div class="li-money">
          <div class="left">积分</div>
          <div class="right">100</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CommonHeader from 'common/header/Header'
export default {
  name: 'Detail',
  components: {
    CommonHeader
  },
  data () {
    return {
      navTitle: '订单详情'
    }
  }
}
</script>

<style lang="less" scoped>
section {
  margin: 29px 30px 0;
  .li-tab-box {
    display: flex;
    height: 86px;
    .li-tab-text {
      color: #60C064;
      font-size: 30px;
      line-height: 86px;
      margin-left: 20px;
    }
    .li-tab-time {
      flex: 1;
      font-size:22px;
      line-height: 86px;
      text-align: center;
    }
    .li-tab-status {
      font-size: 30px;
      line-height: 86px;
      margin-right: 22px;
    }
    .li-tab-orange {
      color: #FF8C01;
    }
    .li-tab-blue {
      color: #0568EE;
    }
    .li-tab-red {
      color: #FE4A57;
    }
  }

  .li-money {
    display: flex;
    justify-content: space-between;
    line-height: 69px;
    .left {
      color: #999999;
      margin-left: 20px;
      font-size: 30px;
    }
    .right {
      color: #333333;
      margin-right: 26px;
      font-size: 28px;
    }
  }
}
</style>
