<template>
  <div class="detail-body">
    <common-header :title="navTitle"></common-header>

    <!-- 订单信息 -->
    <ul class="wrapper">
      <li class="li-tab-box">
        <div class="li-tab-text">充值</div>
        <div class="li-tab-time">
          <template v-if="0">
            <count-down endTime="1554266200000" :callback="callback" endText="已经结束了" timeType='zh'></count-down>
          </template>
        </div>
        <div
            class="li-tab-status"
        >状态</div>
      </li>

      <li class="li-item clearfix">
        <div class="left">金额</div>
        <div class="right strong">￥1000</div>
      </li>

      <li class="li-item clearfix">
        <div class="left">积分</div>
        <div class="right">100</div>
      </li>

      <li class="li-item clearfix">
        <div class="left">下单时间</div>
        <div class="right">2019 18:38:22</div>
      </li>

      <li class="li-item clearfix">
        <div class="left">订单号</div>
        <div class="icon"></div>
        <div class="right">1903181149045289796</div>
      </li>
    </ul>

    <!-- 支付信息 -->
    <ul class="wrapper" v-if="1">
      <li class="li-tab-title">
        <div class="left">银行卡支付</div>
        <div class="icon"></div>
        <div class="right">切换支付方式</div>
      </li>

      <li class="li-item clearfix">
        <div class="left">收款人</div>
        <div class="icon"></div>
        <div class="right">啥打算大所多</div>
      </li>

      <!-- 银行卡 -->
      <template v-if="0">
        <li class="li-item clearfix">
          <div class="left">银行名称</div>
          <div class="icon"></div>
          <div class="right">一个银行</div>
        </li>

        <li class="li-item clearfix">
          <div class="left">支行名称</div>
          <div class="icon"></div>
          <div class="right">营业厅</div>
        </li>

        <li class="li-item clearfix">
          <div class="left">银行卡号</div>
          <div class="icon"></div>
          <div class="right">1561165456</div>
        </li>
      </template>

      <!-- 支付宝 -->
      <template v-if="1">
        <li class="li-item clearfix">
          <div class="left">收款二维码</div>
          <div @click="openQrcode()">
            <div class="icon"></div>
            <div class="right" v-text="btnQRText"></div>
          </div>
        </li>

        <div id="qrcode" class="qrcode-img" ref="qrcode" v-show="showQrcode"></div>
      </template>

      <li class="li-item clearfix">
        <div class="left">付款时备注</div>
        <div class="icon"></div>
        <div class="right">1903181149045289796</div>
      </li>

      <!-- 代付款 -->
      <div class="text-boxs" v-if="0">
        <p class="hint">温馨提示：</p>
        <div>
          <p>1、平台不支持自动扣款,请用您本人的账号向以上账户转账。</p>
          <p>2、转账成功后请点击下方“我已完成付款”按钮。</p>
          <p>3、成功转账后，待卖方确认完成，即可完成这笔充值。</p>
          <p>4、请尽量保留转账截图，作为纠纷时证据。</p>
          <p>5、银行转账时，请尽量使用即时到账，以免卖方长时间未收到款项。</p>
          <p>6、请于30分钟内向卖方指定账户支付款项，并点击“我已完成付款”，超时会被系统自动取消该笔充值订单。</p>
        </div>
      </div>
    </ul>

    <!-- 代付款按钮 -->
    <div class="btn-pay-boxs" v-if="0">
      <button class="btn-pay">我已完成付款</button>
      <button class="btn-cancel">取消订单</button>
    </div>

    <!-- 未到账按钮 -->
    <div class="btn-wait-boxs" v-if="1">
      <p>申诉</p>
      <div class="text">
        <count-down endTime="1554266200000" :callback="callback" endText="已经结束了" timeType='symbol'></count-down>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from 'common/header/Header'
import CountDown from 'common/time/CountDown'
export default {
  name: 'Detail',
  components: {
    CommonHeader,
    CountDown
  },
  data () {
    return {
      btnQRText: '查看',
      bodyHeight: 0,
      navTitle: '订单详情',
      showQrcode: true
    }
  },
  mounted () {
  },
  methods: {
    openQrcode () {
      this.showQrcode = !this.showQrcode
      this.btnQRText = this.showQrcode ? '收起' : '点击查看'
    },
    callback () {
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}

.detail-body {
  position: relative;
  .wrapper {
    margin: 29px 30px 0;
    padding-left: 20px;
    padding-right: 22px;
    background: #FFFFFF;
    .li-tab-title {
      display: flex;
      justify-content: space-between;
      height: 91px;
      line-height: 91px;
      font-size: 34px;
      .left {
        color: #384253;
      }
      .right {
        width: 240px;
        color: #999999;
        background: url('~imgurl/mine_more.png') no-repeat right 0 center;
        background-size: 16px 28px;
      }
    }

    .li-tab-box {
      display: flex;
      height: 86px;
      .li-tab-text {
        color: #60C064;
        font-size: 34px;
        line-height: 86px;
      }
      .li-tab-time {
        flex: 1;
        font-size:28px;
        line-height: 86px;
        text-align: center;
        margin-right: -122px;
        color: #2D79F1;
      }
      .li-tab-status {
        font-size: 34px;
        line-height: 86px;
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

    .li-item {
      height: 69px;
      line-height: 69px;
      color: #384253;
      .left {
        color: #596F87;
        font-size: 30px;
        float: left;
      }
      .right {
        color: #384253;
        font-size: 28px;
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        float: right;
      }
      .strong {
        font-size:34px;
        font-weight: bold;
      }
      .icon {
        width: 29px;
        height: 60px;
        background: url('~imgurl/mine_more.png') no-repeat #f9f9f9 right 0 center;
        background-size: 30px 30px;
        margin-left: 20px;
        border: 1px blue solid;
        float: right;
      }
      // .qrcode_img >>> canvas {
        //   width: 354px;
      //   height: 354px;
      // }
      // .qrcode_img >>> img {
        //   width: 354px;
      //   height: 354px;
      // }
    }

    .qrcode-img {
      margin: 36px auto;
      width: 153px;
      height: 153px;
      border: 1px #000000 solid;
    }

    .text-boxs {
      margin-bottom: 147px;
      p {
        font-size: 24px;
        color: #999999;
        line-height: 33px;
      }
      .hint {
        margin: 21px 0;
      }
    }
  }
  .btn-pay-boxs {
    padding: 0 75px;
    .btn-pay {
      width: 100%;
      height: 80px;
      background: linear-gradient(94deg,rgba(47,131,255,1),rgba(60,59,238,1));
      box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      font-size: 32px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      text-align: center;
      color: #FFFEFE;
    }
    .btn-cancel {
      width: 100%;
      height: 100px;
      box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
      background: #fff;
      border-radius: 10px;
      font-size: 32px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      text-align: center;
      color: #2F81FE;
    }
  }
  .btn-wait-boxs {
    margin: 233px auto 103px;
    width: 600px;
    height: 80px;
    background:linear-gradient(94deg,rgba(196,208,247,1),rgba(196,208,247,1));
    box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius:10px;
    p {
      display: inline-block;
      font-size:32px;
      color: #ffffff;
      line-height: 80px;
      margin-left: 177px;
    }
    .text {
      display: inline-block;
      margin-left: 26px;
      color: #2F81FE;
      font-size: 28px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
    }
  }
}
</style>
