<template>
  <div class="wrapper">
    <common-header :title="navTitle"></common-header>

    <main>
      <div class="hint">请输入您的信息</div>

      <ul v-if="entryType === 'bank'">
        <li class="item">
          <div class="name">姓名</div>
          <input type="text" placeholder="请出入您的姓名" v-model="apiBank.bank_name">
        </li>
        <li class="item">
          <div class="name">银行卡号</div>
          <input type="text" placeholder="请输入绑定的银行卡号" v-model="apiBank.bank_no">
        </li>
        <li class="item">
          <div class="name">开户银行</div>
          <input type="text" placeholder="请输入开户银行" v-model="apiBank.bank_address">
        </li>
        <li class="item">
          <div class="name">开户支行</div>
          <input type="text" placeholder="请输入银行卡的开户支行" v-model="apiBank.bank_sub_branch">
        </li>
      </ul>

      <ul v-if="entryType === 'alipay'">
        <li class="item">
          <div class="name">姓名</div>
          <input type="text" placeholder="请出入您的姓名" v-model="apiAlipay.alipay_name">
        </li>
        <li class="item">
          <div class="name">支付宝账号</div>
          <input type="text" placeholder="请输入支付宝账号" v-model="apiAlipay.alipay_account">
        </li>
      </ul>

      <ul v-if="entryType === 'wechat'">
        <li class="item">
          <div class="name">姓名</div>
          <input type="text" placeholder="请出入您的姓名" v-model="apiWechat.wechat_name">
        </li>
        <li class="item">
          <div class="name">微信账号</div>
          <input type="text" placeholder="请输入微信账号" v-model="apiWechat.wechat_account">
        </li>
      </ul>

      <p class="note">注：请务必使用您本人的实名账户</p>
    </main>

    <div class="yyy" v-if="entryType === 'alipay' || entryType === 'wechat'">
      <p class="blank"></p>
      <div class="upload">
        <p class="name">请上传收款二维码</p>
        <!-- <div class="btn">
          <van-uploader :after-read="onRead">
            <van-icon name="photograph"/>
          </van-uploader>
        </div> -->
        <div class="imgs">
          <input type="file" @change="uploadFile($event)">
        </div>
      </div>
    </div>

    <footer>
      <button @click="boundBank()">确定</button>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import CommonHeader from 'common/header/Header'
export default {
  name: 'SettingBound',
  components: {
    CommonHeader
  },
  data () {
    return {
      entryType: '',
      entryIsbound: '',
      navTitle: '设置',
      apiBank: {
        'merchant_type': '1', // 1 A端
        'merchant_code': '12345', // 商户渠道
        'third_user_id': '1', // 第三方平台
        'bank_name': '', // 银行名字
        'bank_address': '', // 开户银行
        'bank_sub_branch': '', // 开户支行
        'bank_no': '' // 银行卡号
      },
      apiAlipay: {
        'merchant_type': '1',
        'merchant_code': '12345',
        'alipay_name': '',
        'alipay_account': '',
        'alipay_rq_code': '',
        'third_user_id': '1'
      },
      apiWechat: {
        'merchant_type': '1',
        'merchant_code': '12345',
        'wechat_name': '',
        'wechat_account': '',
        'wechat_rq_code': '',
        'third_user_id': '1'
      }
    }
  },
  created () {
    this.entryType = this.$route.query.type
  },
  methods: {
    // event上传图片
    uploadFile (event) {
      let file = event.target.files[0]
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('type', '1')
      // let config = {
      //   headers: {'Content-Type': 'multipart/form-data'}
      // }
      // ali_pay/20190410/1d87e8fb-e714-4e92-ab85-0736616a9acb.png
      let url = 'http://user.service.168mi.cn'
      const entryType = this.$route.query.type
      if (entryType === 'wechat') {
        url += '/api/Upload/uploadWeChatPayFile'
      } else {
        url += '/api/Upload/uploadAliPayFile'
      }
      axios.post(url, param)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            const imgurl = res.data.list.url
            console.log(imgurl)
            if (imgurl) {
              if (entryType === 'wechat') {
                this.apiWechat.wechat_rq_code = imgurl
              } else {
                this.apiAlipay.alipay_rq_code = imgurl
              }
            } else {
              this.$toast('上传路径消失~')
            }
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误')
        })
    },

    // base64上传图片
    onRead (file) {
    },

    boundBank () {
      let data = null
      let url = 'http://user.service.168mi.cn'
      const entryType = this.$route.query.type

      if (entryType === 'bank') {
        console.log('绑定-银行卡', data)
        data = this.apiBank
        url += '/api/Bindpay/addBankPay'
      } else if (entryType === 'wechat') {
        console.log('绑定-微信', data)
        data = this.apiWechat
        url += '/api/Bindpay/addWeChatPay'
      } else if (entryType === 'alipay') {
        console.log('绑定-支付宝', data)
        data = this.apiAlipay
        url += '/api/Bindpay/addAliPay'
      } else {
        data = {}
      }

      console.log(data)
      axios.post(url, data)
        .then(res => {
          res = res.data
          console.log('绑定: ' + JSON.stringify(res))
          if (res.code === '10000') {
            this.$toast(res.msg)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误')
        })
    },
    jumpPayBound () {
      this.$router.push({ name: 'SettingBound' })
    }
  }
}
</script>

<style lang="less" scoped>
main {
  padding: 0 70px 0 30px;
  color: #6D778B;
  .hint {
    margin-top: 40px;
    font-size: 48px;
  }
  .item {
    margin-top: 48px;
    .name {
      color: #6D778B;
      font-size: 28px;
    }
    input::placeholder{
      color: #9FA9BA;
      opacity: 1;
      font-size: 32px;
    }
    input {
      width: 100%;
      line-height: 80px;
      font-size: 32px;
      padding-top: 20px;
      border-bottom: 2px solid #E3E3E3;
    }
  }
  .note {
    margin-top: 48px;
    color: #FFA55A;
    font-size: 28px;
    line-height: 48px;
  }
}

.yyy {
  .blank {
    background-color: #F4F4F4;
    height: 12px;
  }
  .upload {
    padding: 0 36px;
    .name {
      margin-top: 30px;
      color: #6D778B;
      height: 50px;
      font-size: 36px;
      font-weight: 600;
    }
    .btn {
      margin: 0 auto;
      margin-top: 74px;
      width: 288px;
      height: 288px;
      .van-icon {
        display: none;
      }
      .van-uploader {
        width: 288px;
        height: 288px;
        background: url('~imgurl/upload.png') no-repeat;
        background-size: 100%;
      }
    }
    .imgs {
      margin: 0 auto;
      margin-top: 74px;
      width: 288px;
      height: 288px;
      background: url('~imgurl/upload.png') no-repeat;
      background-size: 100%;
      input {
        width: 288px;
        height: 288px;
        opacity: 0;
        color: transparent;
      }
    }
  }
}

footer {
  position: relative;
  button {
    position: fixed;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: 620px;
    height: 88px;
    background: #0078FF;
    border-radius: 10px;
    font-size:32px;
    color: #ffffff;
  }
}
</style>
