<template>
  <div class="wrapper">
    <common-header :title="navTitle"></common-header>
    <main>
      <div class="top" :class="{'topBorder': userCertifyMsg.status == 1}">
        <div class="hint">实名认证</div>
        <div class="note2">*请务必使用您本人的实名账户*</div>

        <p v-if="userCertifyMsg.status == 2" class="note0 note1">实名认证不通过，请修改后再尝试！</p>
        <p v-if="userCertifyMsg.status == 1" class="note0 note3">审核已通过！</p>
        <p v-if="userCertifyMsg.status == 0 && !firstUpload" class="note0 note4">已提交审核，您仍然可以修改！</p>
        <div class="item">
          <div class="name">证件类型</div>
          <input readonly type="text" :value="pap">
          <div class="btn" @click="selectcard()"><i ></i></div>
          <template v-if="chenckcard">
              <ul>
                <li @click="selecitem(1)" :class="{'liActive':liActive==1}">身份证</li>
                <li @click="selecitem(2)" :class="{'liActive':liActive==2}">护照</li>
                <li @click="selecitem(3)" :class="{'liActive':liActive==3}">港澳通行证</li>
              </ul>
          </template>
        </div>
        <div class="item">
          <div class="name">真实姓名</div>
          <input v-model="username" type="text" placeholder="请输入真实姓名">
        </div>
        <div class="item">
          <div class="name">证件号码</div>
          <input v-model="userNo" type="text" placeholder="请输入证件号码">
        </div>
        <!-- <p v-if="userCertifyMsg.status != 1" class="note">注：请务必使用您本人的实名账户</p> -->
      </div>
      <div v-if="userCertifyMsg.status != 1" class="bottom">
        <p class="bottom-hint">上传{{pap}}照片</p>
        <div class="upload">
          <div class="imgs">
            <div v-show="cardUrl1 !== ''">
              <div class="mask">
                <img  ref="cardimg" :class="[istrue1 ? 'img-width':'img-height']" :src="cardUrl21" alt="">
                <i>已上传</i>
              </div>
            </div>
            <div v-show="cardUrl1 === ''">
              <div v-if="firstUpload" class="picture-top">
                <img class="img imgG"  v-if="liActive==1" src="~imgurl/card1-1.png" alt="">
                <img class="img imgG"  v-else-if="liActive==2" src="~imgurl/card1-2.png" alt="">
                <img class="img imgG"  v-else src="~imgurl/card1-3.png" alt="">
              </div>
              <div v-else>
                <img class="img" :class="[istrue1 ? 'img-width':'img-height']" :src="userCertifyMsg.credentials_asurface" alt="">
              </div>
            </div>
            <input class="inputpo1" type="file" accept="image/png, image/jpeg, image/jpg" @change="tirggerFile($event,1)">
          </div>
          <div class="imgs">
            <div v-show="cardUrl2 !== ''">
              <div class="mask">
                <img :src="cardUrl22" :class="[istrue2 ? 'img-width':'img-height']" alt="">
                <i>已上传</i>
              </div>
            </div>
            <div v-show="cardUrl2 === ''">
              <div v-if="firstUpload" class="picture-mid">
                <img class="img imgG" v-if="liActive==1" src="~imgurl/card2-1.png" alt="">
                <img class="img imgG" v-else-if="liActive==2" src="~imgurl/card2-2.png" alt="">
                <img class="img imgG" v-else src="~imgurl/card2-3.png" alt="">
              </div>
              <div v-else>
                <img class="img" :class="[istrue2 ? 'img-width':'img-height']" :src="userCertifyMsg.credentials_bsurface" alt="">
              </div>
            </div>
            <input class="inputpo2" type="file" @change="tirggerFile($event,2)">
          </div>
        </div>
        <!-- <p class="hint">上传手持{{pap}}照片</p> -->
        <div class="upload">
          <div class="imgs">
            <template v-if="cardUrl3">
              <div class="mask mask1">
                <img :src="cardUrl23" :class="[istrue3 ? 'img-width':'img-height']" alt="">
                <i>已上传</i>
              </div>
            </template>
            <template v-else>
              <div v-if="firstUpload">
                <img class="img imgG" v-if="liActive==1" src="~imgurl/card3-1.png" alt="">
                <img class="img imgG" v-else-if="liActive==2" src="~imgurl/card3-2.png" alt="">
                <img class="img imgG" v-else src="~imgurl/card3-3.png" alt="">
              </div>
              <div v-else>
                <img class="img" :class="[istrue3 ? 'img-width':'img-height']" :src="userCertifyMsg.hold_certificates" alt="">
              </div>
            </template>
            <input class="inputpo3" type="file" @change="tirggerFile($event,3)">
          </div>
        </div>
        <div class="note-down">注:上传图片内证件号，姓名等信息应确保清晰，切不可修改或覆盖；</div>
      </div>
    </main>
    <footer>
      <button v-if="userCertifyMsg.status != 1" :class="{'show-color': hasData}" @click="submit(0)">提交审核</button>
      <button v-else @click="submit(1)">开始使用</button>
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
      postFormat: {},
      firstUpload: true,
      navTitle: '',
      pap: '身份证',
      chenckcard: 0,
      status: 0,
      liActive: 1,
      username: '',
      userNo: '',
      cardUrl1: '',
      cardUrl2: '',
      cardUrl3: '',
      cardUrl21: '',
      cardUrl22: '',
      cardUrl23: '',
      istrue1: true,
      istrue2: true,
      istrue3: true,
      userCertifyMsg: {}
    }
  },
  computed: {
    hasData () {
      const pools = [this.username, this.userNo, this.cardUrl1, this.cardUrl2, this.cardUrl3]
      for (const item of pools) {
        if (item === '') {
          return false
        }
      }
      this.canSubmit = true
      return true
    }
  },
  created () {
    const format = sessionStorage.getItem('reqformat')
    this.postFormat = JSON.parse(format)
    this.getUserInfo()
  },
  methods: {
    // 获取用户实名认证信息
    getUserInfo () {
      // const data = {
      //   'app-name': '123',
      //   'merchant_type': '1', // 1:A端
      //   'merchant_code': '12345',
      //   'third_user_id': '1'
      // }
      let data = this.postFormat

      let url = this.$api.user
      axios.post(url + '/api/Authentication/getAuthenticationLists', data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            this.istrue1 = JSON.parse(sessionStorage.getItem('istrue1'))
            this.istrue2 = JSON.parse(sessionStorage.getItem('istrue2'))
            this.istrue3 = JSON.parse(sessionStorage.getItem('istrue3'))
            if (res.data.list.length === 0) {
              return false
            }
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
    // 选择证件类型
    selectcard () {
      this.chenckcard = !this.chenckcard
    },
    selecitem (idx) {
      this.liActive = idx
      if (idx === 1) {
        this.pap = '身份证'
      } else if (idx === 2) {
        this.pap = '护照'
      } else {
        this.pap = '港澳通行证'
      }
      this.chenckcard = !this.chenckcard
    },
    // event上传图片
    tirggerFile (event, i) {
      var that = this
      let file = event.target.files[0]
      var reads = new FileReader()
      let param = new FormData()
      reads.readAsDataURL(file)
      reads.onload = function (e) {
        if (i === 1) {
          that.cardUrl21 = this.result
          let img = new Image()
          img.src = e.target.result
          img.onload = function () {
            that.istrue1 = this.width > this.height
            console.log(self.istrue)
          }
        } else if (i === 2) {
          that.cardUrl22 = this.result
          let img = new Image()
          img.src = e.target.result
          img.onload = function () {
            that.istrue2 = this.width > this.height
            console.log(self.istrue)
          }
        } else {
          that.cardUrl23 = this.result
          let img = new Image()
          img.src = e.target.result
          img.onload = function () {
            that.istrue3 = this.width > this.height
            console.log(self.istrue)
          }
        }
      }
      param.append('file', file, file.name)
      param.append('type', '1')
      let url = this.$api.user
      if (this.liActive === 1) {
        url += '/api/Upload/uploadIdCardFile'
      } else if (this.liActive === 2) {
        url += '/api/Upload/uploadPassportFile'
      } else {
        url += '/api/Upload/uploadHMpassFile'
      }
      axios.post(url, param)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            const imgurl = res.data.list.url
            if (imgurl) {
              if (i === 1) {
                this.cardUrl1 = imgurl
              } else if (i === 2) {
                this.cardUrl2 = imgurl
              } else {
                this.cardUrl3 = imgurl
              }
            } else {
              this.$toast('上传路径消失~')
            }
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误')
        })
    },
    submit (index) {
      if (index === 1) {
        this.$router.go(-1)
        return false
      }
      if (this.username === '') {
        this.$toast('请填写真实姓名')
        return false
      }
      if (this.userNo === '') {
        this.$toast('请填写证件号码')
        return false
      }
      if (this.cardUrl1 === '') {
        this.$toast('请上传证件正面照')
        return false
      }
      if (this.cardUrl2 === '') {
        this.$toast('请上传证件背面照')
        return false
      }
      if (this.cardUrl3 === '') {
        this.$toast('请上传手持证件照')
        return false
      }
      const url = this.$api.user
      var url1 = '/api/Authentication/addAuthentication'
      if (!this.firstUpload) {
        url1 = '/api/Authentication/updateAuthentication'
      }
      // const data = {
      //   'app-name': '123',
      //   'merchant_type': '1', // 1:A端
      //   'merchant_code': '12345',
      //   'third_user_id': '1',
      //   'name': this.username,
      //   'credentials_no': this.userNo,
      //   'credentials_asurface': this.cardUrl1, // 正面照
      //   'credentials_bsurface': this.cardUrl2, // 背面照
      //   'hold_certificates': this.cardUrl3, // 手持照
      //   'credentials_type': this.liActive
      // }
      let data = this.postFormat
      data.name = this.username
      data.credentials_no = this.userNo
      data.credentials_asurface = this.cardUrl1 // 正面照
      data.credentials_bsurface = this.cardUrl2 // 背面照
      data.hold_certificates = this.cardUrl3 // 手持照
      data.credentials_type = this.liActive

      axios.post(url + url1, data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            sessionStorage.setItem('istrue1', JSON.stringify(this.istrue1))
            sessionStorage.setItem('istrue2', JSON.stringify(this.istrue2))
            sessionStorage.setItem('istrue3', JSON.stringify(this.istrue3))
            this.getUserMsg()
            this.$toast(res.msg)
            this.$router.go(-1)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误')
        })
    },

    // 获取用户信息
    getUserMsg () {
      let data = this.postFormat
      let url = this.$api.user
      axios.post(url + '/api/user/getUserInfo', data)
        .then(res => {
          res = res.data
          if (res.code === 10000) {
            this.userMsg = res.data.list
            this.boundState = this.userMsg.pay_info
            this.selectIconVal1 = this.boundState.ali_pay
            this.selectIconVal2 = this.boundState.bank_pay
            this.selectIconVal3 = this.boundState.wechat_pay
            sessionStorage.setItem('userMsg', JSON.stringify(this.userMsg))
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误4')
        })
    }
  }
}
</script>

<style lang="less">
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  overflow-y: scroll;
  main {
    box-sizing: border-box;
    padding-top: 60px;
    // margin-bottom: 100px;
    .hint{
      font-size: 48px;
      color: #333333;
      font-weight: bold;
      margin-bottom: 38px;
    }
    .note2{
      font-size:24px;
      color: #FF4F4F;
      padding-bottom: 25px;
    }
    .topBorder{
      border-bottom: none !important;
    }
    .top{
      position: relative;
      padding: 0 70px 0 30px;
      .note0{
        font-size: 24px;
        position: absolute;
        top: 60px;
      }
      .note1{
        color: #FF7777;
      }
      .note4{
        color: #3B67E0;
      }
      .note3{
        color: #4BC766;
      }
      .item{
        position: relative;
        margin-top: 47px;
        .name{
          font-size: 28px;
          font-weight: bold;
          color: #333333;
          margin-bottom: 8px;
        }
        input{
          width: 100%;
          color: #333333;
          font-size: 30px;
          background-color: transparent;
          border-bottom: 1px solid #E3E3E3;
          padding: 23px 5px 15px 5px;
          &::placeholder{
            color: #999999;
          }
        }
        .btn{
          width: 50%;
          height: 50px;
          position: absolute;
          bottom: 50px;
          right: 10px;
          text-align: right;
          i{
            display: inline-block;
            width: 28px;
            height: 16px;
            background: url("~imgurl/todownarrow.png") center / 100% no-repeat;
          }
        }
        ul{
          background-color: #F3F4F7;
          position: absolute;
          top: 122px;
          width: 100%;
          z-index: 222;
          li{
            font-size: 32px;
            color: #6D778B;
            padding: 25px 18px;
          }
          .liActive{
            background-color: #3B67E0;
            color: #fff;
          }
        }
      }
      .note{
        font-size: 24px;
        color: #FFA55A;
        font-weight: bold;
      }
    }
    .bottom{
      padding: 91px 45px 312px 45px;
      .bottom-hint {
        color: #333333;
        font-size: 42px;
        font-weight: bold;
      }
      .upload{
        position: relative;
        .imgs{
          text-align: center;
          height: 277px;
          padding-top: 60px;
          &:first-of-type{
          }
          .mask{
            height: 277px;
            width: 280px;
            position: relative;
            i{
              display: inline-block;
              height: 100%;
              width: 280px;
              background-color: rgba(0, 0, 0, .4);
              position: absolute;
              top: 50%;
              left: 50%;
              line-height: 240px;
              transform: translateX(-50%) translateY(-50%);
              font-size: 24px;
              color: #fff;
            }
            .img-width{
              width: 280px;
            }
            .img-height{
              height: 277px;
            }
          }
          .picture-top {

          }
          .picture-mid {

          }
          .mask1{
            left: 50%;
            transform: translateX(-50%);
          }
          img{
            box-shadow: 0 0 20px -8px #666;
          }
          .img{
            box-shadow: 0 0 20px -8px #d2d2d2;
          }
          .imgG{
            width: 370px;
            height: 277px;
          }
          .img-width{
              width: 280px;
          }
          .img-height{
            height: 260px;
          }
          input{
            margin-top: -295px;
            width: 370px;
            height: 277px;
            opacity: 0;
          }
        }
      }
      .note-down{
        font-size: 24px;
        color: #FF4F4F;
        margin-top: 88px;
      }
    }
  }
  footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 62px 68px;
    background: #fff;
    button {
      width: 100%;
      height: 95px;
      font-size: 32px;
      color: #fff;
      border-radius:47px;
      background: #E0E0E0;
    }
    .show-color {
      background: #1359D2;
    }
  }
}
</style>
