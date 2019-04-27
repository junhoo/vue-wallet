<template>
  <div class="appeal">
    <common-header title="申诉详情"></common-header>
    <div class="rechargeMain">
      <!-- 进步条 -->
      <section>
        <div class="step">
          <div class="stepItem">
            <img class="stepImg" src="~imgurl/icon_sta0_1.png" alt="">
            <span class="stepTxt">等待平台客服处理  2019-04-21 12:45</span>
          </div>
          <div class="line" :class="{'line_blue':appealStatus != 1}"></div>
          <div class="stepItem">
            <img class="stepImg" :src="~imgurl/icon_sta1_2.png" alt="">
            <span class="stepTxt">处理中</span>
          </div>
          <div class="line"></div>
          <div class="stepItem">
            <img class="stepImg" src="~imgurl/icon_sta1_3.png" alt="">
            <span class="stepTxt">已完成</span>
          </div>
        </div>
      </section>
     
      <!-- 申诉内容 -->
      <section>
        <div class="appealContent">
          <h3 class="m_title">申诉内容</h3>
          <span class="m_text">买方长时间未确认收款</span>
        </div>
        <div class="upload">
          <img class="upload_img" src="~imgurl/bound_real.png" alt="" @click="showImgSelec()">
        </div>
       </section>
       <!-- 图片预览弹框 -->
       <van-dialog v-model="show" title="" :closeOnClickOverlay='true' :showConfirmButton='false'>
        <img src="~imgurl/dialog_bg.png" class="previewImg">
       </van-dialog>
       <!-- 订单信息 -->
       <section>
         <ul>
           <li>
             <span class="m_left" :class="{'orange':orderType == 7, 'blue':orderType == 3}">{{orderType|orderStatus}}</span>
              <template>
                <i v-if="orderType == 3" class="m_right">等待对方确认收款</i>
                <i v-if="orderType == 7" class="m_right">请您确认已收到付款</i>
              </template>
           </li>
           <li>
             <span v-if="orderType == 3" class="m_left">付款金额</span>
             <span v-if="orderType == 7" class="m_left">收款金额</span>
             <i class="m_right">1000.00CNY</i>
           </li>
           <li>
             <span v-if="orderType == 3" class="m_left">充值积分</span>
             <span v-if="orderType == 7" class="m_left">卖出数量</span>
             <i class="m_right">1000</i>
           </li>
           <li>
             <span v-if="orderType == 3" class="m_left">下单时间</span>
             <span v-if="orderType == 7" class="m_left">接单时间</span>
             <i class="m_right">2019-04-15 11:56</i>
           </li>
           <li>
             <span class="m_left">订单编号</span>
             <div class="m_right">
               <i class="right_text">20190415002006005</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="20190415002006005" @click="copy()">
             </div>
           </li>
         </ul>
       </section>
       <!-- 支付信息 -->
        <section>
         <ul class="wrapper" v-if="orderType == 3">
           <li class="li-item">
             <span class="m_left">{{payway|payTypeText}}支付</span>
           </li>
           <li>
             <span class="m_left">收款人</span>
             <div class="m_right">
               <i class="right_text">Jeney</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="Jeney" @click="copy()">
             </div>
           </li>
           <!-- 支付宝、微信支付 -->
           <div class="wxAli" v-if="payway != 3">
             <li>
                <span class="m_left">{{payway|payTypeText}}账号</span>
                <div class="m_right">
                  <i class="right_text">Jeney1625</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="Jeney1625" @click="copy()">
                </div>
              </li>
           </div>
           <!--银行卡支付  -->
           <div class="band" v-else>
             <li>
                <span class="m_left">银行名称</span>
                <div class="m_right">
                  <i class="right_text">中国银行</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="中国银行" @click="copy()">
                </div>
              </li>
              <li>
                <span class="m_left">支行名称</span>
                <div class="m_right">
                  <i class="right_text">梅陇支行</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="梅陇支行" @click="copy()">
                </div>
              </li>
              <li>
                <span class="m_left">银行卡号</span>
                <div class="m_right">
                  <i class="right_text">20190415002006005</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="20190415002006005" @click="copy()">
                </div>
              </li>
           </div>

           <li>
             <span class="m_left">付款时备注</span>
             <div class="m_right">
               <i class="right_text">8898</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="8898" @click="copy()">
             </div>
           </li>
         </ul>
       </section>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import CommonHeader from 'common/header/Header'
import CommonFooter from 'common/header/Footer'
import DialogBox from 'common/dialog/Dialog'
import Clipboard from 'clipboard'
export default {
  name: 'AppealDetail',
  components: {
    DialogBox,
    CommonHeader,
    CommonFooter
  },
  data () {
    return {
      show: false,
      active: 2,
      payway: 3,
      orderType: 3,
      appealStatus: 2
    }
  },
  created () {},
  methods: {
    // 切换申诉进度样式
    stepStyle () {
      if (appealStatus == 2) {
        
      }
    },
    // 点击图片弹框
    showImgSelec () {
      this.show = !this.show
    },
    // 复制
    copy () {
      var clipboard = new Clipboard('.tag-copy')
      clipboard.on('success', e => {
        this.$toast('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        clipboard.destroy()
      })
    }
  },
  filters: {
    payTypeText: function (value) {
      // value = value.toString()
      if (value === 1) {
        value = '支付宝'
      } else if (value === 2) {
        value = '微信'
      } else {
        value = '银行卡'
      }
      return value
    },
    orderStatus: function (value) {
      value = value.toString()
      if (value === '7') {
        value = '待确认'
      } else if (value === '3') {
        value = '未到账'
      }
      return value
    }
  }
}
</script>

<style lang="less" >
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.van-overlay{
  background-color: rgba(49, 49, 109, .25);
}
.previewImg{
  z-index: 9999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%)
}
.appeal{
  position: fixed;
  background-color: #F5F8FA;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .appealContent{
    padding: 34px;
    background-color: #fff;
    border-radius: 20px;
    box-sizing: border-box;
    margin-bottom: 28px;
    .m_title{
      font-size: 28px;
      color: #010101;
      font-weight: 600;
      margin-bottom: 27px;
    }
    .m_text{
      font-size: 28px;
      color: #000
    }
  }
  .upload{
    border-radius: 20px;
    margin-bottom: 35px;
    height: 367px;
    text-align: center;
    position: relative;
    .upload_img{
      width: 100%;
      height: 367px
    }
  }
  .rechargeMain{
    padding: 118px 30px 250px;
    .step{
      background-color: #fff;
      border-radius: 20px;
      padding: 30px 43px;
      margin-bottom: 21px;
      .stepItem{
        .stepImg{
          width: 39px;
          margin-right: 40px
        }
        .stepTxt{
          font-size: 26px;
          color: #000
        }
      }
      .line{
        width: 3px;
        height: 39px;
        background-color: #D7D7D7;
        margin: 8px 0;
        margin-left: 17px
      }
      .line_blue{
        background-color: #0078FF;
      }
    }
    ul{
      width: 100%;
      margin-bottom: 24px;
      background-color: #fff;
      border-radius: 20px;
      box-sizing: border-box;
      li{
        height: 100px;
        line-height: 100px;
        padding: 0 39px;
        border-bottom: 1px solid #F5F4F4;
        display: flex;
        justify-content: space-between;
        font-size: 26px;
        &:last-of-type{
          border: none
        }
        .m_center{
          text-align: center;
          color: #000;
          font-size: 28px;
          width: 100%
        }
        .m_left{
          color: #ABACAF;
          .left_icon{
            width: 49px;
            margin-right: 30px
          }
          .left_text{
            color: #000;
            font-size: 28px
          }
        }
        .m_right{
          color: #010101;
          flex: 1;
          text-align: right;
          .right_icon{
            width: 35px;
            margin-left: 25px
          }
          .rightBG_icon{
            display: inline-block;
            height: 38px;
            width: 38px;
            background: url('~imgurl/radio-0-icon.png') center / 100% no-repeat
          }
          .Active_pay{
            background: url('~imgurl/radio-1-icon.png') center / 100% no-repeat
          }
          .arrow-icon{
            width: 18px;
          }
        }
        .skyblue{
          color: #3EC0F1
        }
        .blue{
          color: #4264FB
        }
        .red{
          color: #FF5252
        }
        .orange{
          color: #FFA63D
        }
        span.timer{
          color: #010101 !important
        }
      }
      .qrcode{
        height: 400px;
        position: relative;
        .m_right{
          top: 60%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          text-align: center;
          .QR{
            height: 214px
          }
          a{
            color: #1359D2;
            border-bottom: 1px solid #1359D2;
            line-height: auto !important
          }
        }
      }
    }
  }
  .tip{
    font-size: 26px;
    color: #C2C2C2;
    padding: 10px 0 34px;
    span{
      display: inline-block;
      margin-bottom: 20px
    }
  }
}
</style>
