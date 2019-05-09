<template>
<div>
    <common-header title="申诉详情"></common-header>
  <div class="appeal">
    <div class="rechargeMain">
      <!-- 进步条 -->
      <section>
        <div class="step">
          <div class="stepItem">
            <img class="stepImg" src="~imgurl/icon_sta0_1.png" alt="">
            <span class="stepTxt">等待平台客服处理  {{appealData.add_time | formatDate}}</span>
          </div>
          <div class="line" :class="{'line_blue':appealStatus != 1}"></div>
          <div class="stepItem">
            <img v-if="appealStatus!=1" class="stepImg" src="~imgurl/icon_sta0_2.png" alt="">
            <img v-else class="stepImg" src="~imgurl/icon_sta1_2.png" alt="">
            <span class="stepTxt">处理中</span>
            <p v-if="appealStatus!=1" class="stepTip">客服专员{{appealData.customer_id}}正在核实信息</p>
          </div>
          <div class="line" :class="{'line_blue':appealStatus == 3}"></div>
          <div class="stepItem">
            <img v-if="appealStatus==3" class="stepImg" src="~imgurl/icon_sta0_3.png" alt="">
            <img v-else class="stepImg" src="~imgurl/icon_sta1_3.png" alt="">
            <span class="stepTxt">已完成</span>
            <p v-if="appealStatus==3 && orderType ==1" class="stepTip">已联系卖方确认收款</p>
            <p v-else-if="appealStatus==3 && orderType ==2" class="stepTip">已通知买方处理</p>
          </div>
        </div>
      </section>
      <!-- 申诉内容 -->
      <section>
        <div class="appealContent">
          <h3 class="m_title">申诉内容</h3>
          <span class="m_text">{{appealData.content}}</span>
        </div>
        <div class="upload" v-if="orderType == 1">
          <img class="upload_img" :src="appealData.pay_prove_pic_img" alt="" @click="showImgSelec()">
        </div>
      </section>
       <!-- 图片预览弹框 -->
      <van-dialog v-model="show" title="" :closeOnClickOverlay='true' :showConfirmButton='false'>
       <img :src="appealData.pay_prove_pic_img" class="previewImg">
      </van-dialog>
       <!-- 订单信息 -->
      <section>
        <ul>
          <li>
            <span class="m_left" :class="{'orange':orderType == 2, 'blue':orderType == 1}">{{orderType|orderStatus}}</span>
             <template>
               <i v-if="orderType == 1" class="m_right">等待对方确认收款</i>
               <i v-if="orderType == 2" class="m_right">请您确认已收到付款</i>
             </template>
          </li>
          <li>
            <span v-if="orderType == 1" class="m_left">付款金额</span>
            <span v-if="orderType == 2" class="m_left">收款金额</span>
            <i class="m_right">{{appealData.amount}}CNY</i>
          </li>
          <li>
            <span v-if="orderType == 1" class="m_left">充值积分</span>
            <span v-if="orderType == 2" class="m_left">卖出数量</span>
            <i class="m_right">{{appealData.order_amount}}</i>
          </li>
          <li>
            <span v-if="orderType == 1" class="m_left">下单时间</span>
            <span v-if="orderType == 2" class="m_left">接单时间</span>
            <i class="m_right">{{appealData.order_time}}</i>
          </li>
          <li>
            <span class="m_left">订单编号</span>
            <div class="m_right">
              <i class="right_text">{{appealData.order_no}}</i>
              <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="appealData.order_no" @click="copy()">
            </div>
          </li>
        </ul>
      </section>
       <!-- 支付信息 -->
        <section>
         <ul class="wrapper" v-if="orderType == 1">
           <li class="li-item">
             <span class="m_left">{{payType|payTypeText}}支付</span>
           </li>
           <li>
             <span class="m_left">收款人</span>
             <div class="m_right">
               <i class="right_text">{{payee}}</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="payee" @click="copy()">
             </div>
           </li>
           <!-- 支付宝、微信支付 -->
           <div class="wxAli" v-if="payType != 3">
             <li>
                <span class="m_left">{{payType|payTypeText}}账号</span>
                <div class="m_right">
                  <i class="right_text">{{accountNumber}}</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="accountNumber" @click="copy()">
                </div>
              </li>
           </div>
           <!--银行卡支付  -->
           <div class="band" v-else>
             <li>
                <span class="m_left">银行名称</span>
                <div class="m_right">
                  <i class="right_text">{{payInfo.address}}</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="payInfo.address" @click="copy()">
                </div>
              </li>
              <li>
                <span class="m_left">支行名称</span>
                <div class="m_right">
                  <i class="right_text">{{payInfo.bank_sub_branch}}</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="payInfo.bank_sub_branch" @click="copy()">
                </div>
              </li>
              <li>
                <span class="m_left">银行卡号</span>
                <div class="m_right">
                  <i class="right_text">{{payInfo.bank_no}}</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="payInfo.bank_no" @click="copy()">
                </div>
              </li>
           </div>
           <li>
             <span class="m_left">付款时备注</span>
             <div class="m_right">
               <i class="right_text">{{pay_remarks}}</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="pay_remarks" @click="copy()">
             </div>
           </li>
         </ul>
       </section>
    </div>
    <div v-if="appealStatus==1 || appealStatus==2" class="cancel"><span @click="deleteA()">删除</span></div>
  </div>
  </div>
</template>
<script>
// import axios from 'axios'
import moment from 'moment'
import CommonHeader from 'common/header/Header'
import { post } from '@/assets/js/fetch'
import DialogBox from 'common/dialog/Dialog'
import Clipboard from 'clipboard'
export default {
  name: 'AppealDetail',
  components: {
    DialogBox,
    CommonHeader
  },
  data () {
    return {
      show: false,
      active: 2,
      payType: 3, // 1.支付宝 2.微信 3.银行卡
      orderType: 1, // 订单类型： 1.充值 2.提现
      appealStatus: 2, // 操作状态： 1.未处理 2.处理中
      complain_no: '',
      appealData: {},
      payInfo: {},
      payee: '', // 收款人
      accountNumber: '', // 账号 微信or支付宝
      pay_remarks: '' // 账号 微信or支付宝
    }
  },
  created () {
    this.complain_no = this.$route.query.complain_no
    this.getAppealDel()
  },
  methods: {
    // 获取申诉详情
    getAppealDel () {
      var data = {
        token: sessionStorage.getItem('randomcode'),
        complain_no: this.complain_no
      }
      let url = this.$api.order + '/api/Complain/complainLogInfo'
      post(url, data)
        .then(res => {
          console.log(res)
          this.appealData = res.data.list
          this.appealStatus = this.appealData.status
          this.orderType = this.appealData.order_type
          this.payType = this.appealData.pay_type
          this.payInfo = this.appealData.pay_info
          this.pay_remarks = this.payInfo.pay_remarkspay_remarks
          if (this.payType === 1) {
            this.payee = this.payInfo.alipay_name
            this.accountNumber = this.payInfo.alipay_account
          } else if (this.payType === 2) {
            this.payee = this.payInfo.wechat_name
            this.accountNumber = this.payInfo.wechat_account
          }
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误4')
        })
    },
    // 撤销申诉
    deleteA () {
      this.getAppealDel()
      if (this.appealStatus === 2) {
        this.$toast('该申诉单已在处理中')
        return false
      }
      var data = {
        token: sessionStorage.getItem('randomcode'),
        complain_no: this.complain_no
      }
      let url = this.$api.order + '/api/Complain/delComplainLog'
      post(url, data)
        .then(res => {
          this.$router.push({
            path: '/appealList'
          })
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误4')
        })
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
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD hh:mm')
    },
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
      if (value === '2') {
        value = '待确认'
      } else if (value === '1') {
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
    padding: 36px 30px 250px;
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
        .stepTip{
          font-size: 26px;
          color: #969696;
          padding-left: 85px;
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
          text-align: left;
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
  .cancel{
    position: fixed;
    bottom: 0;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    padding: 45px 65px 69px;
    width: 100%;
    box-sizing: border-box;
    z-index: 100;
    span{
      display: inline-block;
      font-size: 30px;
      color: #F5F5F5;
      border-radius: 49px;
      background-color: #FF5050;
      width: 100%;
      height: 97px;
      line-height: 97px;
      text-align: center
    }
  }
}
</style>
