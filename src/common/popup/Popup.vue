<template>
  <div class="popup-body">

    <div class="mask"
        v-show="show"
        @click="closeDiv()">
    </div>

    <van-popup v-model="show" position="bottom" :overlay="false">
      <div class="popup-box">

        <p class="text-1">{{ name | filterTitle }}</p>

        <p class="text-2" v-show="type === '充值'">请于10分钟内完成付款，否则将被取消</p>
        <p class="text-moeny" v-show="type === '充值'">800.00<span class="symbol">CNY</span></p>

        <p class="text-2" v-show="type === '提现'">{{ name | filterText }}</p>
        <p class="text-3" v-show="name !== '匹配成功'">收款账号：银行卡（HankWen）</p>

        <div class="btn-box">
          <div class="finish-btn">
            <button class="content" v-show="name === '确认收款'" @click="selectType()">去确认收款</button>
            <button class="content" v-show="name !== '确认收款'" @click="selectType()">查看订单</button>
          </div>

          <div class="cancel-btn">
            <div class="content" @click="closeDiv()">
              <button class="box">{{ name | filterCancel }}</button>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    name: '',
    type: ''
  },
  methods: {
    selectType (shareType) {
      this.$emit('onChildPopup', shareType) // 定义->子组件声明的事件
    },
    closeDiv () {
      this.$emit('update:show', false)
    }
  },
  filters: {
    filterTitle (value) {
      const pools = {
        '匹配成功': '订单匹配成功',
        '确认收款': '确认收款',
        '自动收款': '超时自动确认收款'
      }
      return pools[value]
    },
    filterText (value) {
      const pools = {
        '匹配成功': '订单匹配成功，买方正在为您付款！',
        '确认收款': '买方已向您付款，请您确认查收！',
        '自动收款': '超时交易，系统已为您确认收款'
      }
      return pools[value]
    },
    filterCancel (value) {
      const pools = {
        '匹配成功': '我知道了',
        '确认收款': '稍等一下',
        '自动收款': '我知道了'
      }
      return pools[value]
    }
  }
}
</script>

<style lang='less' scoped>
.van-popup {
  border-radius:20px 20px 0px 0px;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.3);
  z-index: 2000;
}

.popup-box {
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  color: #fff;
  z-index: 10000;
  text-align: center;
  .text-1 {
    width: 100%;
    font-size:38px;
    color: #0F0F0F;
    padding-top: 56px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    background-color: #FFFFFF;
  }
  .text-2 {
    padding-top: 33px;
    color: #7D7D7D;
    font-size: 28px;
    background-color: #FFFFFF;
  }
  .text-3 {
    padding-top: 48px;
    color: #4264FB;
    font-size:30px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    background-color: #FFFFFF;
  }

  .text-moeny {
    padding-top: 48px;
    color: #4264FB;
    font-size: 40px;
    font-weight: bold;
    .symbol {
      font-size: 30px;
    }
  }

  .btn-box {
    background-color: #FFFFFF;
    height: 314px;
    margin-bottom: 95px;
    .finish-btn {
      position: relative;
      width: 100%;
      .content {
        width: 618px;
        height: 97px;
        margin-top: 68px;
        font-size:28px;
        color: #fff;
        background:#4264FB;
        border-radius: 49px;
      }
    }
    .cancel-btn {
      position: relative;
      padding-top: 25px;
      width: 100%;
      .content {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        box-sizing:border-box;
        width: 618px;
        height: 97px;
        padding: 3px;
        padding-right: 2.5px;
        border-radius: 49px;
        background-image:-webkit-linear-gradient(left, #4264FB 0%, #4264FB 30%, #4264FB 70%, #16D3EF 90%);
        .box {
          width: 100%;
          height: 100%;
          border-radius: 49px;
          background:#fff;
          font-size: 30px;
          font-family: MicrosoftYaHei;
          font-weight:bold;
          color: #2A2A2A;
        }
      }
    }
  }
}

</style>
