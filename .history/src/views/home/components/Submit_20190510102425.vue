<template>
  <!-- 首页-提交块-->
  <div class="main-submit">

    <!-- 按钮区 -->
    <div class="btn-box">
      <div
          class="btn-style btn-left"
          :class="{'btn-select': selectButton === '充值'}"
          @click="clickButton('充值')">
        <div class="btn-text" >充值</div>
        <div class="btn-icon"></div>
      </div>
      <div
          class="btn-style btn-right"
          :class="{'btn-select': selectButton === '提现'}"
          @click="clickButton('提现')">
        <div class="btn-text">提现</div>
        <div class="btn-icon"></div>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="input-box">
      <p class="text" v-text="inputHint"></p>
      <p class="blank"></p>
      <input
          type="text"
          v-model="keyword"
          class="inputs"
          :placeholder="inputPlaceholder"
          maxlength="7"
          @input="handleInput"
          onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))">
      <span class="small-name">积分</span>
    </div>

    <div class="check-box">
      <!-- 切换 alipay -->
      <div class="tackout-hint"
          :class="{'tackout-hint-show': selectButton === '提现'}"
          @click="clickTackout()">
          全部提现
      </div>
      <div
          class="icon-box icon-alipay"
          :class="{'icon-alipay-active': selectAlipay}"
          @click="selectPayType(1)">
        <div class="inside-img">
        </div>
        <div class="inside-text">支付宝支付</div>
      </div>

      <!-- 切换 wechat -->
      <div
          class="icon-box icon-wechat"
          :class="{'icon-wechat-active': selectWechat}"
          @click="selectPayType(2)">
        <div class="inside-img"></div>
        <div class="inside-text">微信</div>
      </div>

      <!-- 切换 bank -->
      <div
          class="icon-box icon-bank"
          :class="{'icon-bank-active': selectBank}"
          @click="selectPayType(3)">
        <div class="inside-img"></div>
        <div class="inside-text">银行卡</div>
      </div>

      <button class="submit-btn" @click="verifyWindow()">提交订单</button>
    </div>

    <van-popup v-model="showHint" position="top" :overlay="false">
      <p class="popup-hint" @click="showTopHint('close')">{{textHint}}</p>
    </van-popup>
  </div>
</template>

<script>
import { post } from '@/assets/js/fetch'
export default {
  props: {
    userMsg: {},
    headerInfo: {}
  },
  data () {
    return {
      keyword: '',
      goBoundText: 1,
      selectButton: '充值',
      selectAlipay: false,
      selectWechat: false,
      selectBank: false,
      showHint: false,
      textHint: '',
      inputHint: '充值积分',
      inputPlaceholder: '填写充值积分',
      hasMsg: false,
      boundState: {},
      homeInfo: {}
    }
  },
  mounted () {
    const userInfo = sessionStorage.getItem('userMsg')
    if (userInfo !== null && userInfo !== '') {
      this.hasMsg = true
      const _obj = JSON.parse(userInfo)
      this.boundState = _obj.pay_info
      this.getUser()
    }
    // console.log(a)
  },
  watch: {
    userMsg () {
      if (!this.hasMsg) return
      this.boundState = this.userMsg.pay_info
      this.getUser()
    }
  },
  // computed: {
  //   headerInfo () {
  //     this.homeInfo = this.headerInfo
  //     console.log(this.headerInfo)
  //     console.log(this.homeInfo)
  //   }
  // },
  methods: {
    getUser () {
      this.selectAlipay = this.boundState.ali_pay
      this.selectWechat = this.boundState.wechat_pay
      this.selectBank = this.boundState.bank_pay
    },

    // 支付按钮的显示
    selectPayType (type) {
      console.log('selectPayType')
      this.goBoundText = type
      const apiIocn = this.boundState
      if (!apiIocn.ali_pay && !apiIocn.bank_pay && !apiIocn.wechat_pay) {
        this.emitPopupHint('none')
        return
      }

      const hasList = [this.selectAlipay, this.selectWechat, this.selectBank]
      const lastList = hasList.filter(bol => bol === true)

      if (type === 1) {
        if (!this.boundState.ali_pay) {
          this.emitPopupHint()
          return false
        }
        if (lastList.length <= 1 && !this.selectWechat && !this.selectBank) {
          this.showTopHint('至少选择一种支付方式')
          return
        }
        this.selectAlipay = !this.selectAlipay
      } else if (type === 2) {
        if (!this.boundState.wechat_pay) {
          this.emitPopupHint()
          return false
        }
        if (lastList.length <= 1 && !this.selectAlipay && !this.selectBank) {
          this.showTopHint('至少选择一种支付方式')
          return
        }
        this.selectWechat = !this.selectWechat
      } else if (type === 3) {
        if (!this.boundState.bank_pay) {
          this.emitPopupHint()
          return false
        }
        if (lastList.length <= 1 && !this.selectAlipay && !this.selectWechat) {
          this.showTopHint('至少选择一种支付方式')
          return
        }
        this.selectBank = !this.selectBank
      }
    },

    emitPopupHint (val = '') {
      const arr = ['alipay', 'wechat', 'bank']
      const type = arr[this.goBoundText - 1]
      this.$emit('onChildSubmit', type) // 定义->子组件声明的事件
    },

    clickTackout () {
      this.keyword = this.headerInfo.amount_income
    },

    clickButton (type) {
      this.selectButton = type
      this.inputHint = type === '充值' ? '充值积分' : '提现积分'
      this.inputPlaceholder = type === '充值' ? '填写充值积分' : '填写提现积分'
      this.keyword = ''
    },

    clickAlipay () {
      this.selectAlipay = !this.selectAlipay
    },
    clickWechat () {
      this.selectWechat = !this.selectWechat
    },
    clickBnak () {
      this.selectBank = !this.selectBank
    },

    // 验证窗口 提交订单
    verifyWindow () {
      const inputMoney = this.keyword
      if (parseInt(this.userMsg.status) === 0) { // 0 锁定 1正常
        this.$emit('onChildSubmit', '禁止交易')
        return
      }
      if (localStorage.getItem('openLoopConfirm') === '1' || localStorage.getItem('openLoopFinish') === '1') {
        this.hintHasOrder()
        return
      }

      const picktext = this.selectButton === '充值' ? '充值' : '提现'
      // if (parseInt(inputMoney) === 0) {
      //   this.showTopHint(picktext + '积分不能为0')
      //   return
      // }
      if (inputMoney === '') {
        var exp = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/
        if (!exp.test(inputMoney)) {
          this.showTopHint(`请填写需要${picktext}的数量`)
        }
      } else if (!this.selectAlipay && !this.selectWechat && !this.selectBank) {
        this.showTopHint('请至少选择一种支付方式')
      } else if (this.userMsg.is_realname === 0 || this.userMsg.is_realname === 2) { // 0未认证 1审核通过 2审核未通过 3审核中
        this.$emit('onChildSubmit', '去实名')
      } else {
        if (this.selectButton === '充值') {
          this.submitOrderMatch('充值')
        } else {
          if (inputMoney > parseInt(this.headerInfo.amount_income)) {
            this.keyword = this.headerInfo.amount_income
            this.showTopHint('提现超出当前积分')
            return
          }
          if (parseInt(inputMoney) < 10) {
            this.keyword = 10
            this.showTopHint('最小提现10积分')
            return
          }
          if (parseInt(inputMoney) > 50000) {
            this.keyword = 50000
            this.showTopHint('最大提现50000积分')
            return
          }
          this.submitOrderMatch('提现')
        }
      }
    },

    // 提交订单-充值/提现
    submitOrderMatch (type) {
      let url = this.$api.order
      url += type === '充值' ? '/api/order/recharge' : '/api/order/draw'

      const selectPay = this.getSelectPay()
      const data = {
        'token': sessionStorage.getItem('randomcode'),
        'order_amount': this.keyword,
        'choice_pay_type': selectPay
      }
      console.log(data)

      post(url, data)
        .then(res => {
          console.log('提交订单成功：')
          console.log(res)
          this.$emit('onChildSubmit', '去匹配')
          // this.postFormat.choice_pay_type = ''
          // const matchs = res.data.list.match
          // const orderNo = res.data.list.order_no
          // localStorage.setItem('matchOrderState', matchs)
          // localStorage.setItem('matchOrderNo', orderNo)
          // this.getOrderInfo('1') // 提交刷新订单
          // this.getHomeInfo()
          // 后台匹配订单
          // this.matchingOrder()
        })
        .catch(e => {
          console.log('提交订单错误：')
          console.log(e)
          this.showTopHint(e.msg)
        })
    },

    getSelectPay () {
      let _str = ''
      const pools = [this.selectAlipay, this.selectWechat, this.selectBank]
      pools.forEach((pick, index) => {
        if (pick) {
          _str += ',' + (index + 1)
        }
      })
      return _str.substring(1)
    },

    handleInput (e) {
      this.keyword = this.keyword.replace(/[^\d]/g, '')
      this.keyword = this.keyword.replace('.', '')
    },

    showTopHint (info) {
      if (info === 'close') {
        this.showHint = false
        return
      }
      this.textHint = info
      this.showHint = true
      if (this.timerHint) {
        clearTimeout(this.timerHint)
      }
      this.timerHint = setTimeout(() => {
        this.showHint = false
      }, 1500)
    }
  }
}
</script>

<style lang="less" scoped>
@white: #ffffff;
@bgColor: #f8f8f8;
@blueColor: #4264FB;

@btnStyle: {
  width: 273px;
  height: 90px;
  line-height: 90px;
  font-size: 30px;
  border: 3px solid @blueColor;
  border-radius: 45px;
  color: @blueColor;
  .btn-text {
    display: inline-block;
    width: 53%;
    line-height: 90px;
    float: left;
    text-align: right;
  }
  .btn-icon {
    display: inline-block;
    width: 30%;
    height: 90px;
    float: left;
  }
};

@iconCommon: {
  .inside-img {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 89px;
    height: 89px;
    // background: url('~imgurl/icon_alipay_s.png') no-repeat center;
    // background-size: 89px 89px;
  }
  .inside-text {
    position: absolute;
    top: 143px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 22px;
    color: #BBBBBB; // #3E57D7
  }
};

.main-submit {
  padding-top: 39px;
  padding-left: 62px;
  padding-right: 70px;
  z-index: 900;
  .btn-box {
    position: relative;
    height: 90px;
    .btn-style {
      @btnStyle();
      .btn-icon {
        background: url('~imgurl/btn_topup_default.png') no-repeat left 12px center;
        background-size: 38px 44px;
      }
      .btn-select {
        background: url('~imgurl/btn_tackout_default.png') no-repeat left 12px center;
        background-size: 38px 44px;
      }
    }
    .btn-left {
      float: left;
    }
    .btn-right {
      float: right;
    }
    .btn-select {
      @btnStyle();
      color: @white;
      background: @blueColor;
      border:2px solid @blueColor;
      .btn-icon {
        background: url('~imgurl/btn_topup_select.png') no-repeat left 12px center;
        background-size: 38px 44px;
      }
      .btn-select {
        background: url('~imgurl/btn_tackout_select.png') no-repeat left 12px center;
        background-size: 38px 44px;
      }
    }
  }
  .input-box {
    position: relative;
    color: #BBBBBB;
    font-size: 26px;
    padding-top: 81px;
    border-bottom: 2px #E7E7E7 solid;
    .text {
      font-size: 26px;
    }
    .blank {
      height: 45px;
      background: black;
    }
    .inputs {
      // padding-top: 45px;
      width: 90%;
      height: 43px;
      line-height: 43px;
      padding-bottom: 16px;
      font-size: 50px;
      color: #050505;
      vertical-align:bottom;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      font-size: 26px;
      color: #BBBBBB;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      font-size: 26px;
      color:  #BBBBBB;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      font-size: 26px;
      color: #BBBBBB;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      font-size: 26px;
      color: #BBBBBB;
    }
    .small-name {
      position: absolute;
      font-size:19px;
      right: 0px;
      bottom: 28px;
    }
  }
  .check-box {
    position: relative;
    padding-top: 105px; // 65px
    .tackout-hint {
      position: absolute;
      top: 35px;
      left: 0;
      color: #ffffff;
      font-size: 26px;
    }
    .tackout-hint-show {
      color: @blueColor;
    }
    .icon-box {
      display: inline-block;
      float: left;
      width: 180px;
      height: 210px;
      border-radius: 30px;
    }
    .icon-alipay {
      position: relative;
      float: left;
      @iconCommon();
      .inside-img {
        background: url('~imgurl/icon_alipay_d.png') no-repeat center;
        background-size: 89px 89px;
      }
    }
    .icon-wechat {
      position: relative;
      float: left;
      margin-left: 39px;
      margin-right: 39px;
      @iconCommon();
      .inside-img {
        background: url('~imgurl/icon_wechat_d.png') no-repeat center;
        background-size: 89px 89px;
      }
    }
    .icon-bank {
      position: relative;
      float: right;
      @iconCommon();
      .inside-img {
        background: url('~imgurl/icon_bank_d.png') no-repeat center;
        background-size: 89px 89px;
      }
    }
    .icon-alipay-active {
      background:rgba(231,231,231,1);
      .inside-img {
        background: url('~imgurl/icon_alipay_s.png') no-repeat center;
        background-size: 89px 89px;
      }
      .inside-text {
        color: @blueColor;
      }
    }
    .icon-wechat-active {
      background:rgba(231,231,231,1);
      .inside-img {
        background: url('~imgurl/icon_wechat_s.png') no-repeat center;
        background-size: 89px 89px;
      }
      .inside-text {
        color: @blueColor;
      }
    }
    .icon-bank-active {
      background:rgba(231,231,231,1);
      .inside-img {
        background: url('~imgurl/icon_bank_s.png') no-repeat center;
        background-size: 89px 89px;
      }
      .inside-text {
        color: @blueColor;
      }
    }
  }
  .submit-btn {
    margin-top: 153px;
    width: 617px;
    height: 97px;
    font-size: 30px;
    text-align: center;
    color: #ffffff;
    background: @blueColor;
    border-radius: 49px;
  }
}

.popup-hint {
  width: 750px;
  height: 179px;
  line-height: 179px;
  font-size: 28px;
  text-align: center;
  color: #ffffff;
  border-bottom: 1px solid #06204E;
  background-color:#06204E;
  opacity: 0.85;
}
</style>
