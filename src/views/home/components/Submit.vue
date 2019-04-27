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
      <input class="inputs" type="text" :placeholder="inputPlaceholder">
      <span class="small-name">积分</span>
    </div>

    <div class="check-box">
      <!-- 切换 alipay -->
      <div class="tackout-hint" :class="{'tackout-hint-show': selectButton === '提现'}">全部提现</div>
      <div
          class="icon-box icon-alipay"
          :class="{'icon-alipay-active': selectAlipay}"
          @click="clickAlipay()">
        <div class="inside-img">
        </div>
        <div class="inside-text">支付宝支付</div>
      </div>

      <!-- 切换 wechat -->
      <div
          class="icon-box icon-wechat"
          :class="{'icon-wechat-active': selectWechat}"
          @click="clickWechat()">
        <div class="inside-img"></div>
        <div class="inside-text">微信</div>
      </div>

      <!-- 切换 bank -->
      <div
          class="icon-box icon-bank"
          :class="{'icon-bank-active': selectBank}"
          @click="clickBnak()">
        <div class="inside-img"></div>
        <div class="inside-text">银行卡</div>
      </div>

      <button class="submit-btn">提交订单</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectButton: '充值',
      selectAlipay: false,
      selectWechat: false,
      selectBank: false,
      inputHint: '充值积分',
      inputPlaceholder: '填写充值积分'
    }
  },
  methods: {
    clickButton (type) {
      this.selectButton = type
      this.inputHint = type === '充值' ? '充值积分' : '提现积分'
      this.inputPlaceholder = type === '充值' ? '填写充值积分' : '填写提现积分'
    },

    clickAlipay () {
      this.selectAlipay = !this.selectAlipay
    },
    clickWechat () {
      this.selectWechat = !this.selectWechat
    },
    clickBnak () {
      this.selectBank = !this.selectBank
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
    // height: 211px;
    color: #BBBBBB;
    font-size: 26px;
    padding-top: 81px;
    border-bottom: 2px #E7E7E7 solid;
    .text {
      font-size: 26px;
    }
    .inputs { // 104
      margin-top: 45px;
      width: 90%;
      height: 43px;
      padding-bottom: 16px;
      font-size: 50px;
      color: #050505; // #999;
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
</style>
