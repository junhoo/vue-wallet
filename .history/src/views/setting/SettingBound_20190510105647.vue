<template>
  <div class="wrapper">
    <common-header :title="navTitle"></common-header>

    <div class="hint">请输入您的信息</div>
    <p class="note">*请务必使用您本人的实名账户*</p>
    <main>

      <ul v-if="entryType === 'bank'">
        <li class="item">
          <div class="name">姓名</div>
          <input type="text" placeholder="请输入您的姓名" maxlength="20" v-model="apiBank.bank_name">
        </li>
        <li class="item">
          <div class="name">银行卡号</div>
          <input
                type="text" placeholder="请输入绑定的银行卡号" maxlength="20" v-model="apiBank.bank_no" @input="handleInput"
                onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))">
        </li>
        <li class="item">
          <div class="name">开户银行</div>
          <input type="text" placeholder="请输入开户银行" maxlength="10" v-model="apiBank.bank_address">
        </li>
        <li class="item">
          <div class="name">开户支行</div>
          <input type="text" placeholder="请输入银行卡的开户支行" maxlength="10" v-model="apiBank.bank_sub_branch">
        </li>
        <li class="item">
          <div class="name">收款备注</div>
          <input type="text" placeholder="请输入收款备注" maxlength="20" v-model="apiBank.pay_remarks">
        </li>
      </ul>

      <ul v-if="entryType === 'alipay'">
        <li class="item">
          <div class="name">姓名</div>
          <input type="text" placeholder="请输入您的姓名" v-model="apiAlipay.alipay_name">
        </li>
        <li class="item">
          <div class="name">支付宝账号</div>
          <input type="text" placeholder="请输入支付宝账号" v-model="apiAlipay.alipay_account">
        </li>
        <li class="item">
          <div class="name">收款备注</div>
          <input type="text" placeholder="请输入收款备注" v-model="apiAlipay.pay_remarks">
        </li>
      </ul>

      <ul v-if="entryType === 'wechat'">
        <li class="item">
          <div class="name">姓名</div>
          <input type="text" placeholder="请输入您的姓名" v-model="apiWechat.wechat_name">
        </li>
        <li class="item">
          <div class="name">微信账号</div>
          <input type="text" placeholder="请输入微信账号" v-model="apiWechat.wechat_account">
        </li>
        <li class="item">
          <div class="name">收款备注</div>
          <input type="text" placeholder="请输入收款备注" v-model="apiWechat.pay_remarks">
        </li>
      </ul>

    </main>

    <div class="yyy" v-if="entryType === 'alipay' || entryType === 'wechat'">
      <div class="upload">
        <!-- <p class="name">请上传收款二维码</p> -->
        <div class="imgs">
          <template v-if="entryIsbound === 'n'">
            <img v-if="preview !== ''"
                class="img-down"
                :class="[istrue?'img-width':'img-height']"
                :src="preview">
            <img
                v-else
                class="img-up"
                src="~imgurl/upload.png">
          </template>
          <template v-else>
            <img v-if="preview !== ''"
                class="img-down"
                :class="[istrue?'img-width':'img-height']"
                :src="preview">
            <img
                v-else
                class="img-down img-width img-height"
                :src="qrcodeUrl">
          </template>
          <!-- <van-uploader class="xxx" :after-read="onRead">
            <van-icon name="photograph" />
          </van-uploader> -->
          <!-- <div class="mask"><span>重新上传</span></div> -->
          <input class="img-file" type="file" @change="uploadFile($event)">
        </div>
      </div>
    </div>

    <footer>
      <button v-show="!hasData" class="buttons">确定</button>
      <button v-show="hasData" class="buttons show-color" @click="boundBank()">确定</button>
    </footer>

    <!-- <dialog-box
                :show.sync='dialogBoxVal'
                :dialog-option="dialogOption"
                v-on:dialogboxEvent='onDialogBox'>
    </dialog-box> -->

    <order-popup :show.sync='showPopup'
                  :name='popupName'
                  v-on:onChildPopup='onChildPopup'>
    </order-popup>

    <van-popup v-model="showHint" position="top" :overlay="false">
      <p class="popup-hint" @click="showTopHint('close')">{{textHint}}</p>
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios'
import { post } from '@/assets/js/fetch'
import { compress, convertBase64UrlToBlob } from '@/assets/js/yasuo'
// import DialogBox from 'common/dialog/Dialog'
import OrderPopup from 'common/popup/Popup'
import CommonHeader from 'common/header/Header'
export default {
  name: 'SettingBound',
  components: {
    CommonHeader,
    OrderPopup
    // DialogBox
  },
  data () {
    return {
      istrue: true,
      showHint: false,
      showPopup: false,
      popupName: '填写绑定',
      postFormat: {},
      textHint: '',
      preview: '',
      entryType: '',
      entryIsbound: '',
      navTitle: '',
      qrcodeUrl: '', // https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1671789140,435698588&fm=26&gp=0.jpg
      apiBank: {
        'app-name': '',
        'merchant_type': '', // 1 A端
        'merchant_code': '', // 商户渠道
        'third_user_id': '', // 第三方平台
        'bank_name': '', // 银行名字
        'bank_address': '', // 开户银行
        'bank_sub_branch': '', // 开户支行
        'bank_no': '', // 银行卡号
        'pay_remarks': ''
      },
      apiAlipay: {
        'app-name': '',
        'merchant_type': '',
        'merchant_code': '',
        'alipay_name': '',
        'alipay_account': '',
        'alipay_rq_code': '',
        'pay_remarks': '',
        'third_user_id': ''
      },
      apiWechat: {
        'app-name': '',
        'merchant_type': '',
        'merchant_code': '',
        'wechat_name': '',
        'wechat_account': '',
        'wechat_rq_code': '',
        'pay_remarks': '',
        'third_user_id': ''
      },
      dialogBoxVal: false, // 显示对话框
      dialogOption: {
        title: '提示',
        text: '为确保交易顺利，请如实填写信息。',
        cancelButtonText: '修改',
        confirmButtonText: '确认'
      }
    }
  },
  created () {
    const format = sessionStorage.getItem('reqformat')
    this.postFormat = JSON.parse(format)
    this.entryType = this.$route.query.type
    this.entryIsbound = this.$route.query.isbound
    this.getListInfo(this.$route.query.type, this.$route.query.isbound)
  },
  computed: {
    hasData () {
      if (this.entryType === 'bank') {
        const pools = [this.apiBank.bank_name, this.apiBank.bank_no, this.apiBank.bank_address, this.apiBank.bank_sub_branch]
        for (const item of pools) {
          if (item === '') {
            return false
          }
        }
      }
      if (this.entryType === 'alipay') {
        const inputBox = this.apiAlipay
        const pools = [inputBox.alipay_name, inputBox.alipay_account, inputBox.pay_remarks]
        for (const item of pools) {
          if (item === '') {
            return false
          }
        }
      }
      if (this.entryType === 'wechat') {
        const inputBox = this.apiWechat
        const pools = [inputBox.wechat_name, inputBox.wechat_account, inputBox.pay_remarks]
        for (const item of pools) {
          if (item === '') {
            return false
          }
        }
      }
      return true
    },
    isWidth () {
      return this.istrue
    }
  },
  methods: {
    onRead (file) {
      console.log(file)
    },

    // event上传图片
    uploadFile (event) {
      let file = event.target.files[0]
      console.log(file)
      console.log(file.size)
      console.log(file.size / 1024) // 518
      if (!/image\/\w+/.test(file.type)) {
        this.showTopHint('请选择图片')
        return false
      }

      var reads = new FileReader()
      reads.readAsDataURL(file)
      let self = this
      reads.onload = function (e) {
        self.preview = this.result
        let img = new Image()
        img.src = e.target.result
        img.onload = function () {
          self.istrue = this.width > this.height
          console.log(this.width > this.height)
        }
      }

      if (file.size / 1024 > 5000) {
        reads.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          img.onload = function () {
            let data = compress(img)
            var formData = new FormData()
            formData.append('file', convertBase64UrlToBlob(data), file.name)

            console.log('1.0')
            console.log(formData.get('file'))
            self.updateInfo(formData)
          }
        }
      } else {
        let param = new FormData()
        param.append('file', file, file.name)
        param.append('type', '1')
        console.log('2.0')
        console.log(param.get('file'))
        self.updateInfo(param)
      }
    },

    updateInfo (param) {
      let url = this.$api.user
      const entryType = this.$route.query.type
      if (entryType === 'wechat') {
        url += '/api/Upload/uploadWeChatPayFile'
      } else {
        url += '/api/Upload/uploadAliPayFile'
      }

      post(url, param)
        .then(res => {
          // console.log(param, 'azaz')
          const imgurl = res.data.list.url
          if (imgurl) {
            if (entryType === 'wechat') {
              this.apiWechat.wechat_rq_code = imgurl
            } else {
              this.apiAlipay.alipay_rq_code = imgurl
            }
          } else {
            this.showTopHint('上传路径消失~')
          }
        })
        .catch(e => {
          console.log(e)
          this.showTopHint('网络错误')
        })
    },

    // 获取绑定信息
    getListInfo (type, isbound) {
      if (isbound !== 'y') return
      const data = { token: sessionStorage.getItem('randomcode') }
      let url = this.$api.user
      if (type === 'bank') {
        url += '/api/Bindpay/getBankLists'
      } else if (type === 'alipay') {
        url += '/api/Bindpay/getAliPayLists'
      } else if (type === 'wechat') {
        url += '/api/Bindpay/getWeChatLists'
      }

      post(url, data)
        .then(res => {
          const _info = res.data.list
          this.istrue = JSON.parse(sessionStorage.getItem('istrue'))
          if (type === 'bank') {
            this.apiBank.bank_name = _info.bank_name
            this.apiBank.bank_address = _info.bank_address
            this.apiBank.bank_sub_branch = _info.bank_sub_branch
            this.apiBank.bank_no = _info.bank_no
            this.apiBank.pay_remarks = _info.pay_remarks
          } else if (type === 'alipay') {
            this.apiAlipay.alipay_name = _info.alipay_name
            this.apiAlipay.alipay_account = _info.alipay_account
            this.apiAlipay.alipay_rq_code = _info.alipay_rq_code
            this.qrcodeUrl = _info.alipay_rq_code
            this.apiAlipay.pay_remarks = _info.pay_remarks
          } else if (type === 'wechat') {
            this.apiWechat.wechat_name = _info.wechat_name
            this.apiWechat.wechat_account = _info.wechat_account
            this.apiWechat.wechat_rq_code = _info.wechat_rq_code
            this.qrcodeUrl = res.data.list.wechat_rq_code
            this.apiWechat.pay_remarks = _info.pay_remarks
          }
        })
        .catch(e => {
          console.log(e)
          this.showTopHint('网络错误')
        })
    },

    // 确定绑定
    boundBank () {
      const type = this.entryType
      const pool = {
        'bank': this.apiBank,
        'alipay': this.apiAlipay,
        'wechat': this.apiWechat
      }
      const _obj = pool[type]
      if (_obj[`${type}_name`] === '') {
        this.showTopHint('请填写姓名')
        return
      }
      if (type === 'alipay' || type === 'wechat') {
        if (_obj[`${type}_account`] === '') {
          this.showTopHint('请填写账号')
          return
        }
        if (_obj[`${type}_rq_code`] === '') {
          this.showTopHint('请上传二维码')
          return
        }
      } else {
        if (_obj[`${type}_no`] === '') {
          this.showTopHint('请填写银行卡号')
          return
        }
        if (_obj[`${type}_address`] === '') {
          this.showTopHint('请填写开户银行')
          return
        }
        if (_obj[`${type}_sub_branch`] === '') {
          this.showTopHint('请填写开户支行')
          return
        }
        if (this.apiBank.bank_no.length < 15) {
          this.showTopHint('请输入至少15位银行卡号')
          return
        }
        if (this.apiBank.bank_no.length > 20) {
          this.showTopHint('请输入少于20位银行卡号')
          return
        }
      }
      this.showPopup = true
    },

    onChildPopup (res) {
      if (res !== '填写绑定') return
      const type = this.entryType
      const isbound = this.entryIsbound
      let data = null
      let url = this.$api.user
      const entryType = type

      if (entryType === 'bank') {
        data = this.apiBank
        data['app-name'] = this.postFormat['app-name']

        url += isbound === 'y'
          ? '/api/Bindpay/bankInfoUpdate'
          : '/api/Bindpay/addBankPay'
      } else if (entryType === 'wechat') {
        data = this.apiWechat
        data['app-name'] = this.postFormat['app-name']

        url += isbound === 'y'
          ? '/api/Bindpay/updateWeChatInfo'
          : '/api/Bindpay/addWeChatPay'
      } else if (entryType === 'alipay') {
        data = this.apiAlipay
        data['app-name'] = this.postFormat['app-name']

        url += isbound === 'y'
          ? '/api/Bindpay/updateAlipayInfo'
          : '/api/Bindpay/addAliPay'
      } else {
        data = {}
      }

      data.token = sessionStorage.getItem('randomcode')
      post(url, data)
        .then(res => {
          sessionStorage.setItem('istrue', this.istrue.toString())
          this.showTopHint('保存成功', 1500)
          this.getUserMsg()
        })
        .catch(e => {
          console.log(e)
          this.showTopHint('网络错误5')
        })
    },

    getUserMsg () {
      const data = { token: sessionStorage.getItem('randomcode') }
      let url = this.$api.user
      axios.post(url + '/api/user/getUserInfo', data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            sessionStorage.setItem('userMsg', JSON.stringify(res.data.list))
            this.$router.go(-1)
          } else {
            this.showTopHint(res.msg)
          }
        })
        .catch(e => {
          console.log(e)
          this.showTopHint('网络错误4')
        })
    },

    jumpPayBound () {
      this.$router.push({ name: 'SettingBound' })
    },

    handleInput (e) {
      this.apiBank.bank_no = this.apiBank.bank_no.replace(/[^\d]/g, '')
      this.apiBank.bank_no = this.apiBank.bank_no.replace('.', '')
    },

    showTopHint (info) {
      if (info === 'close') {
        this.showHint = false
        return
      }
      this.textHint = info
      this.showHint = true
      if (this.timerHint) {
        clearTimeout(this.timerHint)
      }
      this.timerHint = setTimeout(() => {
        this.showHint = false
      }, 1500)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  background-color: #F5F5F5;
  .hint {
    margin-top: 58px;
    margin-left: 43px;
    font-size: 48px;
    color: #333333;
    font-family: SourceHanSansCN-Medium;
    font-weight: bold;
  }

  .note {
    margin-top: 64px;
    margin-left: 43px;
    padding-bottom: 14px;
    color: #FF4F4F;
    font-size: 24px;
    line-height: 48px;
  }

  main {
    padding: 0 76px;
    color: #6D778B;
    .item {
      margin-top: 50px;
      .name {
        color: #333333;
        font-size: 28px;
      }
      input::placeholder{
        color: #999999;
        opacity: 1;
        font-size: 32px;
      }
      input {
        width: 100%;
        color: #333333;
        font-size: 30px;
        padding-top: 36px;
        padding-bottom: 14px;
        border-bottom: 2px solid #E3E3E3;
        background-color: #F5F5F5;
      }
    }
  }

  .yyy {
    .upload {
      padding: 0 36px;
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
        display: block;
        margin: 0 auto;
        margin-top: 75px;
        width: 245px;
        height: 245px;
        border: 1px solid #9FA9BA;
        // background: url('~imgurl/upload.png') no-repeat;
        // background-size: 100%;
        .img-up {
          width: 100%;
          height: 100%;
        }
        .img-down {
          // width: 288px;
          // height: 288px;
          // border: 1px solid #9FA9BA;
        }
        .img-width {
          width: 245px;
        }
        .img-height {
          height: 245px;
        }
        .img-file {
          margin-top: -275px;
          width: 245px;
          height: 245px;
          opacity: 0;
          color: transparent;
        }
        .mask {
          margin-top: -245px;
          height: 245px;
          width: 245px;
          position: relative;
          text-align: center;
          background-color: rgba(0, 0, 0, .2);
          span {
            font-size: 24px;
            color: #ffffff;
          }
        }
      }
    }
  }

  footer {
    position: relative;
    margin-top: 56px;
    .buttons {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 620px;
      height: 88px;
      background: #E0E0E0;
      font-size: 28px;
      color: #ffffff;
      border-radius:49px;
    }
    .show-color {
      background: #1359D2;
    }
  }

  .popup-hint {
    width: 750px;
    height: 179px;
    line-height: 179px;
    font-size: 28px;
    text-align: center;
    color: #ffffff;
    border-bottom: 1px solid #06204E;
    background-color:#06204E;
    opacity: 0.85;
  }
}

</style>
