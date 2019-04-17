<template>
  <div class="wrapper">
    <common-header :title="navTitle"></common-header>

    <main>
      <div class="hint">请输入您的信息</div>

      <ul v-if="entryType === 'bank'">
        <li class="item">
          <div class="name">姓名</div>
          <input type="text" placeholder="请输入您的姓名" v-model="apiBank.bank_name">
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
          <input type="text" placeholder="请输入您的姓名" v-model="apiAlipay.alipay_name">
        </li>
        <li class="item">
          <div class="name">支付宝账号</div>
          <input type="text" placeholder="请输入支付宝账号" v-model="apiAlipay.alipay_account">
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
      </ul>

      <p class="note">注：请务必使用您本人的实名账户</p>
    </main>

    <div class="yyy" v-if="entryType === 'alipay' || entryType === 'wechat'">
      <p class="blank"></p>
      <div class="upload">
        <p class="name">请上传收款二维码</p>
        <div class="imgs">
          <template v-if="entryIsbound === 'n'">
            <img v-if="preview !== ''"
                class="img-down"
                :src="preview">
            <img
                v-else
                class="img-up"
                src="~imgurl/upload.png">
          </template>
          <template v-else>
            <img v-if="preview !== ''"
                class="img-down"
                :src="preview">
            <img
                v-else
                class="img-down"
                :src="qrcodeUrl">
          </template>
          <input type="file" @change="uploadFile($event)">
        </div>
      </div>
    </div>

    <footer>
      <button v-show="!hasData" class="buttons">确定</button>
      <button v-show="hasData" class="buttons show-color" @click="boundBank()">确定</button>
    </footer>

    <dialog-box
                :show.sync='dialogBoxVal'
                :dialog-option="dialogOption"
                v-on:dialogboxEvent='onDialogBox'>
      </dialog-box>
  </div>
</template>

<script>
import axios from 'axios'
import DialogBox from 'common/dialog/Dialog'
import CommonHeader from 'common/header/Header'
export default {
  name: 'SettingBound',
  components: {
    CommonHeader,
    DialogBox
  },
  data () {
    return {
      postFormat: {},
      preview: '',
      entryType: '',
      entryIsbound: '',
      navTitle: '设置',
      qrcodeUrl: '', // https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1671789140,435698588&fm=26&gp=0.jpg
      apiBank: {
        'app-name': '',
        'merchant_type': '1', // 1 A端
        'merchant_code': '12345', // 商户渠道
        'third_user_id': '1', // 第三方平台
        'bank_name': '', // 银行名字
        'bank_address': '', // 开户银行
        'bank_sub_branch': '', // 开户支行
        'bank_no': '' // 银行卡号
      },
      apiAlipay: {
        'app-name': '',
        'merchant_type': '1',
        'merchant_code': '12345',
        'alipay_name': '',
        'alipay_account': '',
        'alipay_rq_code': '',
        'third_user_id': '1'
      },
      apiWechat: {
        'app-name': '',
        'merchant_type': '1',
        'merchant_code': '12345',
        'wechat_name': '',
        'wechat_account': '',
        'wechat_rq_code': '',
        'third_user_id': '1'
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
        const pools = [this.apiBank.alipay_name, this.apiBank.alipay_no, this.apiBank.alipay_address, this.apiBank.alipay_sub_branch]
        for (const item of pools) {
          if (item === '') {
            return false
          }
        }
      }
      if (this.entryType === 'wechat') {
        const pools = [this.apiWechat.wechat_name, this.apiWechat.wechat_no, this.apiWechat.wechat_address, this.apiWechat.wechat_sub_branch]
        for (const item of pools) {
          if (item === '') {
            return false
          }
        }
      }
      return true
    }
  },
  methods: {
    // event上传图片
    uploadFile (event) {
      let file = event.target.files[0]
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('type', '1')

      let url = this.$api.user
      const entryType = this.$route.query.type
      if (entryType === 'wechat') {
        url += '/api/Upload/uploadWeChatPayFile'
      } else {
        url += '/api/Upload/uploadAliPayFile'
      }
      axios.post(url, param)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            const imgurl = res.data.list.url
            console.log(imgurl)
            if (imgurl) {
              if (entryType === 'wechat') {
                this.apiWechat.wechat_rq_code = imgurl
              } else {
                this.apiAlipay.alipay_rq_code = imgurl
              }
              var reads = new FileReader()
              reads.readAsDataURL(file)
              let self = this
              reads.onload = function (e) {
                self.preview = this.result
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

    // 获取绑定信息
    getListInfo (type, isbound) {
      if (isbound !== 'y') return
      // const data = {
      //   'app-name': '',
      //   'merchant_type': '1',
      //   'merchant_code': '12345',
      //   'third_user_id': '1'
      // }
      let data = this.postFormat

      let url = this.$api.user
      if (type === 'bank') {
        url += '/api/Bindpay/getBankLists'
      } else if (type === 'alipay') {
        url += '/api/Bindpay/getAliPayLists'
      } else if (type === 'wechat') {
        url += '/api/Bindpay/getWeChatLists'
      }
      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            const _info = res.data.list
            if (type === 'bank') {
              this.apiBank.bank_name = _info.bank_name
              this.apiBank.bank_address = _info.bank_address
              this.apiBank.bank_sub_branch = _info.bank_sub_branch
              this.apiBank.bank_no = _info.bank_no
            } else if (type === 'alipay') {
              this.apiAlipay.alipay_name = _info.alipay_name
              this.apiAlipay.alipay_account = _info.alipay_account
              this.apiAlipay.alipay_rq_code = _info.alipay_rq_code
              this.qrcodeUrl = _info.alipay_rq_code
            } else if (type === 'wechat') {
              this.apiWechat.wechat_name = _info.wechat_name
              this.apiWechat.wechat_account = _info.wechat_account
              this.apiWechat.wechat_rq_code = _info.wechat_rq_code
              this.qrcodeUrl = res.data.list.wechat_rq_code
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

    boundBank () {
      const type = this.entryType
      const pool = {
        'bank': this.apiBank,
        'alipay': this.apiAlipay,
        'wechat': this.apiWechat
      }
      const _obj = pool[type]
      if (_obj[`${type}_name`] === '') {
        this.$toast('请填写姓名')
        return
      }
      if (type === 'alipay' || type === 'wechat') {
        if (_obj[`${type}_account`] === '') {
          this.$toast('请填写账号')
          return
        }
        if (_obj[`${type}_rq_code`] === '') {
          this.$toast('请上传二维码')
          return
        }
      } else {
        if (_obj[`${type}_no`] === '') {
          this.$toast('请填写银行卡号')
          return
        }
        if (_obj[`${type}_address`] === '') {
          this.$toast('请填写开户银行')
          return
        }
        if (_obj[`${type}_sub_branch`] === '') {
          this.$toast('请填写开户支行')
          return
        }
      }
      this.dialogBoxVal = true
    },

    onDialogBox (res) {
      const type = this.entryType
      const isbound = this.entryIsbound
      if (!res) return
      let data = null
      let url = this.$api.user
      const entryType = type

      if (entryType === 'bank') {
        data = this.apiBank
        url += isbound === 'y'
          ? '/api/Bindpay/bankInfoUpdate'
          : '/api/Bindpay/addBankPay'
      } else if (entryType === 'wechat') {
        data = this.apiWechat
        url += isbound === 'y'
          ? '/api/Bindpay/updateWeChatInfo'
          : '/api/Bindpay/addWeChatPay'
      } else if (entryType === 'alipay') {
        data = this.apiAlipay
        url += isbound === 'y'
          ? '/api/Bindpay/updateAlipayInfo'
          : '/api/Bindpay/addAliPay'
      } else {
        data = {}
      }

      axios.post(url, data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            this.getUserInfo()
            this.$toast('保存成功', 1000)
            this.$router.go(-1)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误')
        })
    },

    getUserInfo () {
      let data = this.postFormat
      let url = this.$api.user
      axios.post(url + '/api/Authentication/getAuthenticationLists', data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            this.firstUpload = false
            const _data = res.data.list
            this.userCertifyMsg = _data
            this.userNo = _data.credentials_no
            this.username = _data.name
            this.pap = _data.credentials_type_str
          } else if (res.code === '14003') {
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问')
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
      display: block;
      margin: 0 auto;
      margin-top: 74px;
      width: 288px;
      height: 288px;
      // background: url('~imgurl/upload.png') no-repeat;
      // background-size: 100%;
      .img-up {
        width: 100%;
        height: 100%;
      }
      .img-down {
        width: 288px;
        height: 288px;
        border: 1px solid #9FA9BA;
      }
      input {
        border: 1px red solid;
        margin-top: -288px;
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
  margin-top: 90px;
  .buttons {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 620px;
    height: 88px;
    background: #E0E0E0;
    border-radius: 10px;
    font-size:32px;
    color: #ffffff;
  }
  .show-color {
    background: #0078FF;
  }
}
</style>
