<template>
  <div v-if="show" class="dialog" @click.stop>
    <div class="mask"></div>
    <div class="wrapper">
      <div class="inside">
        <div class="boxs">
          <p class="boxs-state">订单匹配成功，买家正在付款</p>
          <p class="boxs-text" v-show="stateA">收款账号：银行卡（0988）</p>
          <button class="look" v-show="stateB">查看</button>
          <button class="look" v-show="stateC">去确认收款</button>
          <p class="boxs-text" v-show="stateC">2小时候自动确认收款<span>我要申诉</span></p>
        </div>
      </div>
      <button class="outside" @click.stop="closeDiv"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: ['show'],
  data() {
    return {
      stateA: false, // 匹配中
      stateB: false, // 匹配成功
      stateC: true // 已付款
    };
  },
  methods: {
    closeDiv() {
      this.$emit('update:show', false);// 触发 input 事件，并传入新值
    }
  }
};
</script>

<style lang="less" scoped>
.dialog {
  position: relative;
  .wrapper {
    position: fixed;
    top: 394px;
    left: 50%;
    transform: translateX(-50%);
    width: 568px;
    z-index: 2000;
    .inside {
      position: relative;
      border: 1px solid transparent;
      background: url('~imgurl/dialog_bg.png') no-repeat;
      background-size: 100%;
      .boxs {
        text-align: center;
        background-color: #fff;
        .boxs-state {
          margin: 351px 0 26px 0;
          height: 30px;
          font-size: 28px;
          color: #242424;
          font-weight: bold;
        }
        .boxs-text {
          padding-bottom: 34px;
          height: 23px;
          font-size: 24px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          span {
            color: #3B67E0;
            margin-left: 20px;
          }
        }
        .look {
          margin: 0 auto 26px;
          font-size: 30px;
          color: #ffffff;
          width: 480px;
          height: 72px;
          background-color: #0078FF;
          border-radius: 10px;
          font-weight: 500;
        }
      }
    }
    .outside {
      margin-top: 86px;
      width: 568px;
      height: 48px;
      background: url('~imgurl/delete.png') no-repeat center;
      background-size: 48px 48px;
      z-index: 2000;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
