<template>
  <div>
    <header>
      <!-- 标题 -->
      <div class="title-bar clearfix">
        <div class="left" @click="jumpSetPage()">
          <p class="empty"></p>
          <p class="icon-setting"></p>
        </div>
        <div class="middle">Wallet</div>
        <div class="right" @click="xxx()">
          <p class="empty"></p>
          <p class="icon-option"></p>
        </div>
      </div>

      <!-- 金额区 -->
      <p class="money-use">8500.00</p>
      <p class="money-ban">冻结:1000</p>
    </header>

    <main>
      <!-- 首页-提交块 -->
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
              :class="{'icon-alipay-active': selectAlipay}">
            <div class="inside-img">
            </div>
            <div class="inside-text">支付宝支付</div>
          </div>

          <!-- 切换 wechat -->
          <div
              class="icon-box icon-wechat"
              :class="{'icon-alipay-active': selectWechat}">
            <div class="inside-img"></div>
            <div class="inside-text">微信</div>
          </div>

          <!-- 切换 bank -->
          <div
              class="icon-box icon-bank"
              :class="{'icon-bank-active': selectBank}">
            <div class="inside-img"></div>
            <div class="inside-text">银行卡</div>
          </div>

          <button class="submit-btn">提交订单</button>
        </div>
      </div>

      <!-- 首页-订单详情-->
      <div class="main-detail">
        <div class="top-box blue">
          <span class="top-text">已匹配</span><span class="top-state">等待买家付款</span>
        </div>

        <div class="content-box">
          <div class="text-box-1">
            <span class="text-left">收款金额</span><span class="text-right">900.00</span>
            <p class="text-symbol">CNY</p>
          </div>
          <div class="text-box-2">
            <span class="text-left">提现积分</span><span class="text-right">1000.00</span>
          </div>
          <div class="text-box-3">
            <span class="text-left">收款方式</span><span class="text-right">买家未付款</span>
          </div>

          <div class="note-box">
            <p>1：订单匹配成功，等待买方付款</p>
            <p>2：如果10分钟内，买方未付款，系统将重新为您匹配其他买方</p>
          </div>

          <div class="check-order">
            <button>查看订单</button>
          </div>
        </div>
      </div>
    </main>

    <!-- :class="{'order-matching-show': clickshow}" -->
    <div class="order-matching">
      <div class="img-box">
        <div class="imgs"></div>
      </div>
      <p class="text-big">订单匹配中</p>
      <p class="text-small">系统正在为您发起充值申请</p>

      <div class="cancel-btn">
        <div class="content">
          <div class="box">取消订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home2',
  data () {
    return {
      clickshow: false,
      selectButton: '充值',
      selectAlipay: false,
      selectWechat: true,
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
    xxx () {
      this.clickshow = !this.clickshow
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

header {
  box-sizing: border-box;
  width: 100%;
  height: 339px;
  background: url('~imgurl/home_top_bg.png') no-repeat;
  background-size: 100% 100%;
  z-index: 1000;
  .title-bar {
    position: relative;
    height: 88px;
    .left {
        position: relative;
        float: left;
        width: 33.333333%;
        .icon-setting {
          height: 88px;
          width: 120px;
          line-height: 88px;
          font-size: 32px;
          background: url('~imgurl/header_setting.png') no-repeat left 52px center;
          background-size: 45px 40px;
        }
    }
    .middle {
        float: left;
        width: 33.333333%;
        height: 88px;
        line-height: 88px;
        text-align: center;
        color: @white;
        font-size: 32px;
        font-family: MicrosoftYaHei;
        font-weight:bold;
    }
    .right {
        position: relative;
        float: left;
        width: 33.333333%;
        .icon-option {
            position: absolute;
            top:0;
            right: 0;
            height: 88px;
            width: 120px;
            line-height: 88px;
            font-size: 32px;
            background: url('~imgurl/header_option.png') no-repeat right 59px center;
            background-size: 40px 30px;
        }
    }
  }
  .money-use {
    margin-top: 71px;
    font-size: 69px;
    font-weight: 400;
    color:#ffffff;
    text-align: center;
    width: 100%;
  }
  .money-ban {
    margin-top: 36px;
    font-size: 22px;
    width:158px;
    font-weight: bold;
    color:rgba(151,255,135,1);
    text-align: center;
    width: 100%;
  }
}

main {
  box-sizing: border-box;
  .main-submit {
    display: none;
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
        color: #999;
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
        color: #BBBBBB;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:  #BBBBBB;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #BBBBBB;
      }
      :-ms-input-placeholder { /* Internet Explorer 10+ */
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
          background: url('~imgurl/icon_alipay_s.png') no-repeat center;
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
          background: url('~imgurl/icon_wechat_s.png') no-repeat center;
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

  .main-detail {
    background: #F5F5F5;
    padding: 36px 30px 60px 30px;
    .top-box {
      height: 122px;
      line-height: 122px;
      font-size: 28px;
      background: #ffffff;
      border-radius:20px;
      .top-text {
        font-weight: bold;
        float: left;
        margin-left: 33px;
      }
      .top-state {
        float: right;
        margin-right: 38px;
      }
    }

    .blue {
      color: #3EC0F1;
    }
    .orange {
      color: #FFA63D;
    }

    .content-box {
      margin-top: 20px;
      padding-left: 33px;
      padding-right: 39px;
      background: #ffffff;
      .text-box-1 {
        position: relative;
        height: 116px;
        line-height: 116px;
        border-bottom: 2px #E7E7E7 solid;
        .text-left {
          font-size: 40px;
          color: #000;
          font-weight: bold;
        }
        .text-right {
          float: right;
          font-size: 40px;
          color: #000;
          font-weight: bold;
          margin-right: 60px;
        }
        .text-symbol {
          width: 60px;
          position: absolute;
          right: 0;
          bottom: 0;
          float: right;
          font-size: 30px;
          color: #000;
          font-weight: bold;
        }
      }
      .text-box-2 {
        height: 97px;
        line-height: 97px;
        border-bottom: 2px #E7E7E7 solid;
        .text-left {
          font-size:26px;
          color: #656565;
          font-weight: bold;
        }
        .text-right {
          float: right;
          font-size: 30px;
          color: #292929;
          font-weight: bold;
        }
      }
      .text-box-3 {
        height: 105px;
        line-height: 105px;
        font-size:26px;
        border-bottom: 2px #E7E7E7 solid;
        .text-left {
          font-size:26px;
          color: #656565;
          font-weight: bold;
        }
        .text-right {
          float: right;
          font-size: 30px;
          color: #292929;
          font-weight: bold;
        }
      }

      .note-box {
        margin-top: 47px;
        p {
          color: #C2C2C2;
          line-height: 42px;
          font-size: 26px;
        }
      }

      .check-order {
        padding-top: 92px;
        padding-bottom: 78px;
        button {
          color: #ffffff;
          font-size: 30px;
          width: 618px;
          height: 97px;
          background: @blueColor;
          border-radius: 49px;
        }
      }
    }
  }
}

.order-matching-show {
  transform: translateY(-971px);
  transition: transform .5s;
}
.order-matching {
  display: none;
  position: fixed;
  top: 339px;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  box-sizing: border-box;
  z-index: 2000;
  background-color: #F5F5F5;
  .img-box {
    position: relative;
    height: 445px;
    width: 100%;
    padding-top: 64px;
    .imgs {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 445px;
      height: 445px;
      background: url('~imgurl/match_1.png') no-repeat;
      background-size: 445px 445px;
    }
  }
  .text-big {
    padding-top: 64px;
    font-weight:bold;
    font-size:38px;
    color: #000;
  }
  .text-small {
    padding-top: 33px;
    font-size:26px;
    color: #6D6D6D;
  }
  .cancel-btn {
    position: relative;
    margin-top: 99px;
    // margin-bottom: 105px;
    width: 100%;
    .content {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      box-sizing:border-box;
      width: 618px;
      height: 97px;
      padding: 3px;
      border-radius: 49px;
      background-image:-webkit-linear-gradient(left, #4264FB 0%, #4264FB 30%, #4264FB 70%, #16D3EF 90%);   }
      .box {
        width: 611px;
        height: 90px;
        line-height: 90px;
        border-radius: 49px;
        background:#fff;
        font-size: 30px;
        font-family: MicrosoftYaHei;
        font-weight:bold;
        color: #2A2A2A;
      }
    }
  }
</style>
