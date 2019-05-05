<template>
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
      <div class="text-box-3" v-show="type === '充值'">
        <span class="text-left">收款方式</span><span class="text-right">买家未付款</span>
      </div>
      <div class="text-box-4" v-show="type === '提现' || type === '未到账'">
        <span class="text-left">支付方式</span>
        <div class="icon-bank"></div>
        <div class="icon-wechat"></div>
        <div class="icon-alipay"></div>
      </div>

      <!-- 备注区 -->
      <div class="note-box" v-show="type === '充值'">
        <p>1：订单匹配成功，等待买方付款</p>
        <p>2：如果10分钟内，买方未付款，系统将重新为您匹配其他买方</p>
      </div>

      <div class="note-box" v-show="type === '提现'">
        <p>1：请于10分钟内完成付款，超时将自动取消</p>
        <p>2：每天超过3次取消，将被禁止交易48小时</p>
      </div>

      <div class="note-box" v-show="type === '未到账'">
        <p>等待对方确认收款，如果10分钟内对方未确认付款，请发起申诉。</p>
      </div>

      <!-- 按钮区 -->
      <div class="button-box" v-show="type === '充值'">
        <button class="look-btn">查看订单</button>
      </div>

      <div class="button-box" v-show="type === '提现'">
        <button class="pay-btn">立即付款</button>
        <button class="cancel-btn"><span class="cancel-text">取消订单</span></button>
      </div>

      <div class="button-box-not" v-show="type === '未到账'">
        <button class="look-btn">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeDetail',
  props: {
    type: String
  }
}
</script>

<style lang="less" scoped>
@blueColor: #4264FB;

.main-detail {
  background: #F5F5F5;
  padding: 36px 30px 90px 30px;
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

  .skyblue {
    color: #3EC0F1;
  }
  .orange {
    color: #FFA63D;
  }
  .blue {
    color: #4264FB;
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
        height: 30px;
        line-height: 0;
        position: absolute;
        right: 0;
        bottom: 25px;
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

    .text-box-4 {
      position: relative;
      height: 105px;
      font-size: 26px;
      border-bottom: 2px #E7E7E7 solid;
      .text-left {
        position: absolute;
        left: 0;
        bottom: 25px;
        font-size:26px;
        color: #656565;
        font-weight: bold;
      }
      .icon-alipay {
        float: right;
        width: 49px;
        height: 105px;
        background: url('~imgurl/mini_alipay.png') no-repeat bottom 18px center;
        background-size: 49px 49px;
      }
      .icon-wechat {
        margin-left: 16px;
        float: right;
        width: 49px;
        height: 105px;
        background: url('~imgurl/mini_wechat.png') no-repeat bottom 18px center;
        background-size: 49px 49px;
      }
      .icon-bank {
        margin-left: 16px;
        float: right;
        width: 49px;
        height: 105px;
        background: url('~imgurl/mini_bank.png') no-repeat bottom 18px center;
        background-size: 49px 49px;
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

    .button-box {
      padding-top: 92px;
      padding-bottom: 78px;
      font-size: 30px;
      .look-btn {
        color: #ffffff;
        width: 618px;
        height: 97px;
        background: @blueColor;
        border-radius: 49px;
      }
      .pay-btn {
        width:618px;
        height:97px;
        background:rgba(66,100,251,1);
        border-radius:49px;
        color: #ffffff;
      }
      .cancel-btn {
        width:618px;
        height:97px;
        background: #ffffff;
        border-radius: 49px;
        color: #4264FB;
        .cancel-text {
          display: inline-block;
          height: 97px;
          line-height: 97px;
        }
      }
    }

    .button-box-not {
      padding-top: 161px;
      padding-bottom: 78px;
      font-size: 30px;
      .look-btn {
        color: #ffffff;
        width: 618px;
        height: 97px;
        background: @blueColor;
        border-radius: 49px;
      }
    }
  }
}
</style>
