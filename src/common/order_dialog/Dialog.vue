<template>
  <div v-if="show" class="dialog" @click.stop>
    <div class="mask"></div>
    <div class="wrapper">
      <div class="inside">
        <!-- <transition name="fades"> -->
        <div class="top-bg" v-show="state !== 4"></div>
        <!-- </transition> -->
        <div class="boxs" :class="{'boxs-border-4': state === 4}">
          <p class="boxs-state">{{dialogText}}</p>
          <template v-if="buttonType === '充值'">
            <button class="look" v-show="state === 2" @click="closeDiv('付款')">立即付款</button>
            <button class="look" v-show="state === 3" @click="closeDiv('查看')">查看</button>
            <p class="boxs-padding-4" v-show="state === 4">收款账号: {{account}} </p>
            <p class="boxs-text" v-show="state === 4">金额<span>￥{{money}}</span></p>
            <button
              class="look"
              :class="{'boxs-margin-4': state === 4}"
              v-show="state === 4"
              @click="closeDiv('查看')">查看</button>
          </template>
          <template v-else>
            <button class="look" v-show="state === 2" @click="closeDiv('查看')">查看</button>
            <p class="boxs-text" v-show="state === 3">收款账号：银行卡{{account}}</p>
            <button class="look" v-show="state === 3" @click="closeDiv('收款')">去确认收款</button>
            <p class="boxs-text" v-show="state === 3">2小时候自动确认收款<span>我要申诉</span></p>

            <p class="boxs-padding-4" v-show="state === 4">收款账号: {{account}} </p>
            <p class="boxs-text" v-show="state === 4">金额<span>￥{{money}}</span></p>
            <button
              class="look"
              :class="{'boxs-margin-4': state === 4}"
              v-show="state === 4"
              @click="closeDiv('查看')">查看</button>
          </template>
        </div>
      </div>
      <button class="outside" @click.stop="closeDiv('close')"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    state: { // 1 匹配中 2 匹配成功 3 到账/已付款 4 收款
      type: Number,
      default: 1
    },
    buttonType: {
      type: String,
      default: ''
    },
    money: {
      type: String,
      default: ''
    },
    account: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // buttonType: ''
    }
  },
  created () {
    // this.buttonType = localStorage.getItem('dialogBtnType')
  },
  computed: {
    dialogText () {
      let text = ''
      const btnType = localStorage.getItem('dialogBtnType')
      if (btnType === '充值') {
        if (this.state === 1) {
          text = '订单匹配中，请稍后'
        } else if (this.state === 2) {
          text = '订单匹配成功，请10分钟内付款'
        } else if (this.state === 3) {
          text = '有一笔充值到账，积分+' + this.money
        }
      } else {
        // 提现
        if (this.state === 1) {
          text = '订单匹配中，请稍后'
        } else if (this.state === 2) {
          text = '订单匹配成功，买家正在付款'
        } else if (this.state === 3) {
          text = '买方已付款，请你确认收款'
        } else if (this.state === 4) {
          text = '超时自动交易成功'
        }
      }
      return text
    },
    payString () {
      const val = this.state
      return val
    }
  },
  methods: {
    closeDiv (type) {
      console.log('关闭窗口')
      const _dialog = JSON.parse(localStorage.getItem('dialogOrder'))
      _dialog.dialogFlowVal = 0
      localStorage.setItem('dialogOrder', JSON.stringify(_dialog))
      console.log(_dialog.dialogFlowVal)
      this.$emit('dialogOrderEvent', type)
      this.$emit('update:show', false) // 触发 input 事件，并传入新值
    }
  }
}
</script>

<style lang="less" scoped>
.fades-enter, .fades-leave-to {
  opacity: 0;
}
.fades-leave-active {
  transition: opacity .65s
}

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
      .top-bg {
        z-index: 3000;
        height: 351px;
        border-radius: 10px 10px 0 0;
        background: url('~imgurl/dialog_bg.png') no-repeat;
        background-size: 100%;
      }
      .boxs {
        position: relative;
        z-index: 4000;
        text-align: center;
        background-color: #fff;
        border-radius: 0 0 10px 10px;
        .boxs-state {
          margin-top: -1px;
          padding: 26px 0;
          height: 31px;
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
        .boxs-padding-4 {
          padding-bottom: 16px;
        }
        .boxs-margin-4 {
          margin-bottom: 52px;
        }
      }
      .boxs-border-4 {
        border-radius: 10px;
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
