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
      <p class="money-use" @click="clickPopup()">{{headerInfo.amount_income}}</p>
      <p class="money-ban" @click="clickMacthing()">冻结:{{headerInfo.freezing_amount}}</p>
    </header>

    <main>
      <!-- 首页-提交块 -->
      <home-submit
                  v-show="!hasDetail"
                  :userMsg="userMsg"
                  :headerInfo="headerInfo"
                  v-on:onChildSubmit='onChildSubmit'>
      </home-submit>
      <!-- 首页-订单详情-->
      <home-detail v-show="hasDetail" :type="detailType"></home-detail>
    </main>

    <transition name="fade">
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
    </transition>

    <order-popup :show.sync='showPopup'
                  :name='popupName'
                  :type='detailType'
                  v-on:onChildPopup='onChildPopup'>
    </order-popup>

    <van-popup v-model="showHint" position="top" :overlay="false">
      <div class="popup-hint">请填写需要充值的数量</div>
    </van-popup>

    <socket-view ref='socket' v-on:onChildSocket='onmessage'></socket-view>
  </div>
</template>

<script>
import { post } from '@/assets/js/fetch'
import HomeSubmit from './components/Submit'
import HomeDetail from './components/Detail'
import OrderPopup from 'common/popup/Popup'
import SocketView from '@/views/socket/Socket.vue'
export default {
  name: 'Home2',
  components: {
    HomeSubmit,
    HomeDetail,
    OrderPopup,
    SocketView
  },
  created () {
    // ?app_name=123&merchant_type=1&merchant_code=12345&third_user_id=500
    const format = {
      'app-name': this.$route.query.app_name,
      'merchant_type': this.$route.query.merchant_type, // 1:A端 2:B端
      'merchant_code': this.$route.query.merchant_code,
      'third_user_id': this.$route.query.third_user_id,
      'choice_pay_type': ''
    }
    this.postFormat = format
    this.autoLogin()
    sessionStorage.setItem('reqformat', JSON.stringify(format))
    setTimeout(() => {
      this.headerInfo = {
        amount_income: 5000,
        freezing_amount: 2000
      }
    }, 500)
  },
  data () {
    return {
      timerHint: 0,
      detailType: '充值', // 充值 提现 未到账
      boundType: '',
      hasDetail: false,
      showPopup: false,
      showHint: false,
      showMatching: false,
      popupName: '交易完成', // 去绑定 去实名 禁止交易 匹配成功 确认收款 自动收款 被取消 交易完成
      postFormat: {},
      userMsg: {},
      headerInfo: {
        amount_income: 0,
        freezing_amount: 0
      }
    }
  },
  methods: {
    autoLogin () {
      const hasLogin = sessionStorage.getItem('randomcode')
      if (hasLogin !== '' && hasLogin !== null) { return }
      let data = this.postFormat
      const url = this.$api.user + '/api/login/auto_login'

      post(url, data)
        .then(res => {
          console.log('1.0登录')
          const _obj = res.data.list
          if (typeof _obj === 'string') {
            this.getUserMsg()
            // token 8679Nhv6Un3dlCtgaHencsb0YZA9WN0CLbOXvy8Sf9pakR6SLRon617IlzRqrSXLN3aK7A
            sessionStorage.setItem('randomcode', _obj)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误1')
        })
    },

    // 获取用户信息
    getUserMsg () {
      let data = this.postFormat
      let url = this.$api.user + '/api/user/getUserInfo'

      post(url, data)
        .then(res => {
          console.log('2.0用户信息')
          const userInfo = res.data.list
          this.userMsg = userInfo
          sessionStorage.setItem('userMsg', JSON.stringify(userInfo))
          // this.getHomeInfo()
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误4')
        })
    },

    clickPopup () {
      setTimeout(() => {
        this.showMatching = false
        this.showPopup = true
      }, 2000)
    },
    clickMacthing () {
      this.showMatching = !this.showMatching
    },

    showTopHint () {
      this.showHint = true
      if (this.timerHint) {
        clearTimeout(this.timerHint)
      }
      this.timerHint = setTimeout(() => {
        this.showHint = false
      }, 1500)
    },

    onChildSubmit (type) {
      if (type === '被取消') {
        this.popupName = '被取消'
      }
      if (type === '禁止交易') {
        this.popupName = '禁止交易'
        // this.showPopup = true
        // return
      }
      if (type === '去实名') {
        this.popupName = '去实名'
        // this.showPopup = true
        // return
      } else {
        this.boundType = type
        this.popupName = '去绑定'
      }
      this.showPopup = true
    },

    onChildPopup (type) {
      if (type === '去绑定') {
        setTimeout(() => {
          this.$router.push({ path: '/setting/bound', query: { 'type': this.boundType, 'isbound': 'n' } })
        }, 50)
      }
      if (type === '去实名') {
        setTimeout(() => {
          this.$router.push({ path: '/setting/settingCertification' })
        }, 50)
      }
      if (type === 'close') {
        this.closeShare()
      }
    },

    onmessage (info) {
      console.log(info)
      // 1 已提交 2 待付款 3 未到账 4 已取消 5 已完成 6 已匹配 7 待确认 8 自动取消
      const stateCode = ['已提交', '待付款', '未到账', '已取消', '已完成', '已匹配', '待确认', '自动取消']
      const orderType = stateCode[info.data.status]

      console.log(orderType)
      this.showMatching = true
      setTimeout(() => {
        this.showMatching = false
        this.showPopup = true
      }, 2000)
      // 匹配成功 确认收款 自动收款 被取消 交易完成
    },

    jumpSetPage () {
      this.$router.push({ name: 'Setting2' })
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

.popup-hint {
  width: 750px;
  height: 179px;
  line-height: 179px;
  font-size: 28px;
  text-align: center;
  color: #ffffff;
  border: 1px solid rgba(6, 32, 78, 1);
  background: rgba(6, 32, 78, 1);
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-leave-active {
  transition: opacity .5s;
}
</style>
