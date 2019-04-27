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
        <div class="right">
          <p class="empty"></p>
          <p class="icon-option" @click="jumpOrderPage()"></p>
        </div>
      </div>

      <!-- 金额区 -->
      <p class="money-use" @click="xxx()">8500.00</p>
      <p class="money-ban">冻结:1000</p>
    </header>

    <main>
      <!-- 首页-提交块 -->
      <home-submit v-show="!hasDetail"></home-submit>
      <!-- 首页-订单详情-->
      <home-detail v-show="hasDetail" :type="detailType"></home-detail>
    </main>

    <div class="order-matching" v-show="showMatching">
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

    <order-popup :show.sync='showPopup'
                  :name='popupName'
                  :type='detailType'
                  v-on:onChildPopup='onChildPopup'>
    </order-popup>
  </div>
</template>

<script>
import HomeSubmit from './components/Submit'
import HomeDetail from './components/Detail'
import OrderPopup from 'common/popup/Popup'
export default {
  name: 'Home2',
  components: {
    HomeSubmit,
    HomeDetail,
    OrderPopup
  },
  data () {
    return {
      detailType: '提现', // 充值 提现 未到账
      hasDetail: true,
      showPopup: false,
      showMatching: false,
      popupName: '匹配成功' // 匹配成功 确认收款 自动收款
    }
  },
  methods: {
    xxx () {
      this.showPopup = !this.showPopup
    },
    onChildPopup (shareType) {
      if (shareType === 'close') {
        this.closeShare()
      }
    },
    jumpOrderPage () {
      this.$router.push({ name: 'Order' })
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
}

.order-matching {
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
    height: 232px;
    // margin-bottom: 105px;
    width: 100%;
    .content {
      box-sizing:border-box;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 618px;
      height: 97px;
      padding: 3px;
      padding-right: 2.35px;
      border-radius: 49px;
      background-image:-webkit-linear-gradient(left, #4264FB 0%, #4264FB 30%, #4264FB 70%, #16D3EF 90%);
      .box {
        width: 100%; // 611px;
        height: 100%;
        line-height: 90px; // 90px;
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
</style>
