<template>
<div>
  <common-header title="发起申诉"></common-header>
  <div class="appeal">
    <div class="rechargeMain">
      <!-- 申诉内容 -->
      <section>
        <div class="appealContent">
          <h3 class="m_title">申诉内容</h3>
          <textarea class="textarea" v-model="appealTxt" cols="30" rows="5" placeholder="申诉内容"></textarea>
        </div>
        <div class="upload" :class="{'isload':isload}">
          <div v-show="!isload">
            <span class="upload_tip">上传支付凭证</span>
            <input class="upload-file" type="file" accept="image/png, image/jpeg, image/jpg" @change="uploadFile($event,0)">
          </div>
          <img v-show="isload" class="upload_img" :src="Url" alt="" @click="showImgSelec(0)">
        </div>
       </section>
       <!-- 图片预览弹框 -->
       <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
        <span class="loadbtn" @click="showImgSelec(1)">预览</span>
        <p class="loadbtn">重新上传<input class="upload-file" type="file" @change="uploadFile($event,1)"></p>
        <p class="loadbtn" @click="showImgSelec(0)">取消</p>
      </van-popup>
      <van-dialog v-model="show2" title="" :closeOnClickOverlay='true' :showConfirmButton='false'>
        <img :src="Url" class="previewImg">
      </van-dialog>
       <!-- 订单信息 -->
       <section>
         <ul>
           <li>
             <span class="m_left" :class="{'orange':orderDetailData.order_type == 2, 'blue':orderDetailData.order_type == 1}">{{orderDetailData.order_type|orderStatus}}</span>
              <template>
                <i v-if="orderDetailData.order_type == 1" class="m_right">等待对方确认收款</i>
                <i v-if="orderDetailData.order_type == 2" class="m_right">请您确认已收到付款</i>
              </template>
           </li>
           <li>
             <span v-if="orderDetailData.order_type == 1" class="m_left">付款金额</span>
             <span v-if="orderDetailData.order_type == 2" class="m_left">收款金额</span>
             <i class="m_right">{{orderDetailData.order_amount}}CNY</i>
           </li>
           <li>
             <span v-if="orderDetailData.order_type == 1" class="m_left">充值积分</span>
             <span v-if="orderDetailData.order_type == 2" class="m_left">卖出数量</span>
             <i class="m_right">{{orderDetailData.order_amount}}</i>
           </li>
           <li>
             <span v-if="orderDetailData.order_type == 1" class="m_left">下单时间</span>
             <span v-if="orderDetailData.order_type == 2" class="m_left">接单时间</span>
             <i class="m_right">{{orderDetailData.time_str}}</i>
           </li>
           <li>
             <span class="m_left">订单编号</span>
             <div class="m_right">
               <i class="right_text">{{order_no}}</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="order_no" @click="copy()">
             </div>
           </li>
         </ul>
       </section>
       <!-- 支付信息 -->
        <section>
         <ul class="wrapper" v-if="orderDetailData.order_type == 1">
           <li class="li-item">
             <span class="m_left">{{payway|payTypeText}}支付</span>
           </li>
           <li>
             <span class="m_left">收款人</span>
             <div class="m_right">
               <i class="right_text">{{pay_name}}</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="Jeney" @click="copy()">
             </div>
           </li>
           <!-- 支付宝、微信支付 -->
           <div class="wxAli" v-if="payway != 3">
             <li>
                <span class="m_left">{{payway|payTypeText}}账号</span>
                <div class="m_right">
                  <i class="right_text">{{pay_account}}</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="Jeney1625" @click="copy()">
                </div>
              </li>
           </div>
           <!--银行卡支付  -->
           <div class="band" v-else>
             <li>
                <span class="m_left">银行名称</span>
                <div class="m_right">
                  <i class="right_text">{{pay_info.bank_pay.bank_address}}</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="中国银行" @click="copy()">
                </div>
              </li>
              <li>
                <span class="m_left">支行名称</span>
                <div class="m_right">
                  <i class="right_text">{{pay_info.bank_pay.bank_sub_branch}}</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" data-clipboard-text="梅陇支行" @click="copy()">
                </div>
              </li>
              <li>
                <span class="m_left">银行卡号</span>
                <div class="m_right">
                  <i class="right_text">{{pay_info.bank_pay.bank_no}}</i>
                  <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="20190415002006005" @click="copy()">
                </div>
              </li>
           </div>
           <li>
             <span class="m_left">付款时备注</span>
             <div class="m_right">
               <i class="right_text">{{pay_remarks}}</i>
               <img src="~imgurl/copy-icon.png" alt=""  class="right_icon tag-copy" :data-clipboard-text="8898" @click="copy()">
             </div>
           </li>
         </ul>
       </section>
    </div>
  </div>
  <div class="launchAppeal"><span @click="launchAppeal()">发起申诉</span></div>
  </div>
</template>
<script>
// import axios from 'axios'
import { post } from '@/assets/js/fetch'
import CommonHeader from 'common/header/Header'
import CommonFooter from 'common/header/Footer'
import DialogBox from 'common/dialog/Dialog'
import Clipboard from 'clipboard'
export default {
  name: 'Detail',
  components: {
    DialogBox,
    CommonHeader,
    CommonFooter
  },
  data () {
    return {
      show: false,
      show2: false,
      appealTxt: '',
      isload: 0,
      payway: 3,
      orderType: 3,
      Url: '',
      Url2: '',
      orderDetailData: {},
      pay_info: [],
      order_no: 12,
      pay_name: 'jeney', // 支付账户名
      pay_account: '14154sadf', // 支付账号
      pay_url: '', // 支付二维码
      pay_remarks: '' // 付款时备注
    }
  },
  created () {
    if (this.$route.query.order_type !== 2) {
      this.pay_info = ''
    } else {
      this.pay_info = JSON.parse(this.$route.query.pay_info)
      this.payTypeMsg()
    }
    this.orderDetailData = JSON.parse(this.$route.query.orderDetailData)
    this.payway = this.orderDetailData.pay_type
    this.order_no = this.orderDetailData.order_no
    console.log(this.pay_info)
  },
  methods: {
    // 确定支付信息
    payTypeMsg () {
      if (this.pay_info === 2) {
        return false
      }
      if (this.payway === 1) {
        this.pay_url = this.pay_info.ali_pay.pay_url
        this.pay_name = this.pay_info.ali_pay.alipay_name
        this.pay_account = this.pay_info.ali_pay.alipay_account
        this.pay_remarks = this.pay_info.ali_pay.pay_remarks
      } else if (this.payway === 2) {
        this.pay_url = this.pay_info.wechat_pay.pay_url
        this.pay_name = this.pay_info.wechat_pay.wechat_name
        this.pay_account = this.pay_info.wechat_pay.wechat_account
        this.pay_remarks = this.pay_info.wechat_pay.pay_remarks
      } else {
        this.pay_name = this.pay_info.bank_pay.bank_name
        this.pay_remarks = this.pay_info.bank_pay.pay_remarks
      }
    },
    // event上传图片
    uploadFile (event, i) {
      let file = event.target.files[0]
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('type', '1')
      let url = this.$api.order + '/api/Complain/uploadComplainFile'
      post(url, param)
        .then(res => {
          this.isload = 1
          this.Url2 = res.data.list.url
          this.Url = res.data.list.img
          if (i === 1) {
            this.show = !this.show
          }
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误4')
        })
    },
    // 发起申诉
    launchAppeal () {
      var data = {
        token: sessionStorage.getItem('randomcode'),
        order_no: this.order_no,
        pay_prove_pic: this.Url2, //  申诉凭证
        content: this.appealTxt // 申诉内容
      }
      let url = this.$api.order + '/api/Complain/applyComplain'
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
    showImgSelec (i) {
      if (i === 0) {
        this.show = !this.show
        return false
      }
      this.show = !this.show
      this.show2 = !this.show2
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
.van-popup{
  border-radius: 20px 20px 0 0;
  padding: 61px 66px 42px;
  box-sizing: border-box;
  .loadbtn{
    font-size: 28px;
    width: 100%;
    height: 97px;
    line-height: 97px;
    text-align: center;
    border-radius: 49px;
    background:url('~imgurl/bg-border.png') center / 100% no-repeat;
    color: #2A2A2A;
    margin-bottom: 35px;
    position: relative;
    .upload-file{
      width: 100%;
      position: absolute;
      left: 0;
      opacity: 0;
    }
  }
  span{
    display: inline-block;
    color: #F5F5F5 !important;
    background: #1359D2 !important
  }
}
.appeal{
  position: fixed;
  top: 88px;
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
    .textarea{
      background-color: #F5F8FA;
      padding: 25px 32px;
      border-radius: 10px;
      font-size: 28px;
      color: #000;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #E8E5E5
    }
  }
  .upload{
    border-radius: 20px;
    margin-bottom: 35px;
    border: 2px dashed #1359D2;
    height: 144px;
    text-align: center;
    line-height: 144px;
    position: relative;
    .upload_tip{
      font-size: 28px;
      color: #1359D2;
      position: absolute;
      left: 50%;
      transform: translateX(-50%)
    }
    .upload_img{
      width: 100%;
      height: 367px
    }
    .upload-file{
      width: 100%;
      position: absolute;
      left: 0;
      opacity: 0;
    }
  }
  .isload{
    border: none;
    height: 367px;
  }
  .rechargeMain{
    padding: 36px 30px 300px;
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
.launchAppeal{
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 71px 66px 43px;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
  span{
    text-align: center;
    font-size: 28px;
    color: #F5F5F5;
    background-color: #4264FB;
    border-radius: 49px;
    height: 97px;
    line-height: 97px;
    width: 100%;
    display: inline-block
  }
}
</style>
