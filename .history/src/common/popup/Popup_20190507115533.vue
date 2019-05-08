<template>
  <div class="popup-body">

    <div class="mask"
        v-show="show">
    </div>

    <van-popup v-model="show" position="bottom" :overlay="false">
      <div class="popup-box">

        <p class="text-1">{{ name | filterTitle }}</p>

        <template v-if="name === '填写绑定'">
          <p class="text-2">为确保交易顺利，请如实填写信息。</p>
        </template>

        <template v-else-if="name === '被取消'">
          <p class="text-2">有一笔充值到订单超时未付款被取消！</p>
        </template>

        <template v-else-if="name === '去绑定'">
          <p class="text-2">您未绑定该支付方式，是否现在去绑定？</p>
        </template>

        <template v-else-if="name === '去实名'">
          <p class="text-2">请先完成实名认证再进行交易</p>
        </template>

        <template v-else-if="name === '禁止交易'">
          <p class="text-2">您已被禁止交易，小时后解禁</p>
        </template>

        <template v-else-if="name === '交易完成'">
          <p class="text-2">有一笔充值到账，请查看积分余额！</p>
          <p class="text-moeny">+{{money}}</p>
        </template>

        <template v-else-if="name === '充值匹配成功'">
          <p class="text-2" v-show="name === '充值匹配成功'">请于10分钟内完成付款，否则将被取消</p>
          <p class="text-moeny" v-show="name === '充值匹配成功'">{{money}}<span class="symbol">CNY</span></p>
        </template>

        <template v-else>
          <!-- <p class="text-2" v-show="name === '充值匹配成功'">请于10分钟内完成付款，否则将被取消</p>
          <p class="text-moeny" v-show="name === '充值匹配成功'">800.00<span class="symbol">CNY</span></p> -->
          <p class="text-2">{{ name | filterText }}</p>
          <p class="text-3" v-show="name === '等待确认收款'">收款账号：银行卡（HankWen）</p>
        </template>

        <!-- <div v-show="name !== '去绑定'">
          <p class="text-2" v-show="type === '提现'">{{ name | filterText }}</p>
          <p class="text-3" v-show="name !== '匹配成功'">收款账号：银行卡（HankWen）</p>
        </div> -->

        <div class="btn-box" :class="{'ban-box': name === '禁止交易'}">

          <template v-if="name !== '禁止交易'">
            <div class="finish-btn">
              <button class="content" v-if="name === '填写绑定'" @click="selectType('填写绑定')">确认</button>
              <button class="content" v-else-if="name === '充值匹配成功'" @click="selectType('立即付款')">立即付款</button>
              <button class="content" v-else-if="name === '去绑定'" @click="selectType('去绑定')">去绑定</button>
              <button class="content" v-else-if="name === '去实名'" @click="selectType('去实名')">去实名</button>
              <button class="content" v-else-if="name === '等待确认收款'" @click="selectType()">去确认收款</button>
              <!-- ="name !== '确认收款' && name !== '去绑定'"  -->
              <button class="content" v-else @click="selectType()">查看订单</button>
            </div>

            <div class="cancel-btn">
              <div class="content" @click="closeDiv()">
                <button class="box">{{ name | filterCancel }}</button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="finish-btn">
              <button class="content" @click="closeDiv()">确定</button>
            </div>
          </template>
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
  data () {
    return {
      money: ''
    }
  },
  mounted () {
    this.money = sessionStorage.getItem('order_amount')
  },
  methods: {
    selectType (type) {
      this.closeDiv()
      this.$emit('onChildPopup', type) // 定义->子组件声明的事件
    },
    closeDiv () {
      this.$emit('update:show', false)
    }
  },
  filters: {
    filterTitle (value) {
      const pools = {
        '填写绑定': '提示',
        '被取消': '订单被取消',
        '去绑定': '提示',
        '去实名': '提示',
        '禁止交易': '提示',
        '充值匹配成功': '订单匹配成功',
        '提现匹配成功': '订单匹配成功',
        '等待确认收款': '确认收款',
        '自动收款': '超时自动确认收款',
        '交易完成': '交易完成'
      }
      return pools[value]
    },
    filterText (value) {
      const pools = {
        '提现匹配成功': '订单匹配成功，买方正在为您付款！',
        '等待确认收款': '买方已向您付款，请您确认查收！',
        '自动收款': '超时交易，系统已为您确认收款'
      }
      return pools[value]
    },
    filterCancel (value) {
      const pools = {
        '填写绑定': '取消',
        '去绑定': '取消',
        '去实名': '取消',
        '被取消': '我知道了',
        '充值匹配成功': '稍等一会',
        '提现匹配成功': '我知道了',
        '等待确认收款': '稍等一下',
        '自动收款': '我知道了',
        '交易完成': '我知道了'
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
    margin-bottom: 69px;
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
  .ban-box {
    height: 257px;
    margin-bottom: 0;
  }
}

</style>
