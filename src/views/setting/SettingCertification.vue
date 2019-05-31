<template>
  <div class="cert-body">
    <div class="wrapper">
      <common-header :title="navTitle"></common-header>
      <main>
        <div class="top" :class="{'topBorder': userCertifyMsg.status == 1}">
          <div class="hint">实名认证</div>
          <!-- <div class="note2">*请务必使用您本人的实名账户*</div> -->
          <div class="note2" v-show="userCertifyMsg.status != 0 && userCertifyMsg.status != 1 && userCertifyMsg.status != 2">*请务必使用您本人的实名账户*</div>
          <p v-if="userCertifyMsg.status == 2" class="note0 note1">实名认证不通过，请修改后再尝试！</p>
          <p v-if="userCertifyMsg.status == 1" class="note0 note3">审核已通过！</p>
          <p v-if="userCertifyMsg.status == 0 && !firstUpload" class="note0 note4">已提交审核，您仍然可以修改！</p>
          <div class="item">
            <div class="name">证件类型</div>
            <input class="icon-type" @click="selectcard()" readonly type="text" :value="pap">
            <!-- <div class="btn" @click="selectcard()"><i ></i></div> -->
            <!-- 选择证件类型 -->
            <van-popup v-model="chenckcard" position="bottom" :close-on-click-overlay="false">
              <h3>选择证件类型</h3>
              <ul>
                <li @click="selecitem(1)"><span>身份证</span><i :class="{'liActive':liActive==1}"></i></li>
                <li @click="selecitem(2)"><span>护照</span><i :class="{'liActive':liActive==2}"></i></li>
                <li @click="selecitem(3)"><span>港澳通行证</span><i :class="{'liActive':liActive==3}"></i></li>
              </ul>
              <p><span @click="selectcard()">确定</span></p>
            </van-popup>
          </div>
          <div class="item">
            <div class="name">真实姓名</div>
            <input v-model="username" type="text" placeholder="请输入真实姓名">
          </div>
          <div class="item">
            <div class="name">证件号码</div>
            <input v-model="userNo" type="text" placeholder="请输入证件号码" maxlength="18" @input="handleInput">
          </div>
          <!-- <p v-if="userCertifyMsg.status != 1" class="note">注：请务必使用您本人的实名账户</p> -->
        </div>
        <div v-if="userCertifyMsg.status != 1" class="bottom">
          <p class="bottom-hint">上传{{pap}}照片</p>
          <div class="upload">
            <div class="imgs">
              <div v-show="cardUrl1 !== ''">
                <div class="mask">
                  <!--  :class="[istrue1 ? 'img-width':'img-height']" -->
                  <img class="xxx" ref="cardimg" :src="cardUrl21" alt="">
                  <div class="icon-box"></div>
                  <div class="icon-bg"></div>
                  <div class="icon-text">重新上传</div>
                </div>
              </div>
              <div v-show="cardUrl1 === ''">
                <div v-if="firstUpload" class="picture-top">
                  <img class="img imgG"  v-if="liActive==1" src="~imgurl/card1-1.png" alt="">
                  <img class="img imgG"  v-else-if="liActive==2" src="~imgurl/card1-2.png" alt="">
                  <img class="img imgG"  v-else src="~imgurl/card1-3.png" alt="">
                </div>
                <div v-else>
                  <img class="img" :src="userCertifyMsg.credentials_asurface" alt="">
                </div>
              </div>
              <input class="inputpo1" type="file" accept="image/png, image/jpeg, image/jpg" @change="tirggerFile($event,1)">
            </div>
            <div class="imgs">
              <div v-show="cardUrl2 !== ''">
                <div class="mask">
                  <!--  :class="[istrue2 ? 'img-width':'img-height']" -->
                  <img :src="cardUrl22" alt="">
                  <div class="icon-box"></div>
                  <div class="icon-bg"></div>
                  <div class="icon-text">重新上传</div>
                </div>
              </div>
              <div v-show="cardUrl2 === ''">
                <div v-if="firstUpload" class="picture-mid">
                  <img class="img imgG" v-if="liActive==1" src="~imgurl/card2-1.png" alt="">
                  <img class="img imgG" v-else-if="liActive==2" src="~imgurl/card2-2.png" alt="">
                  <img class="img imgG" v-else src="~imgurl/card2-3.png" alt="">
                </div>
                <div v-else>
                  <img class="img" :src="userCertifyMsg.credentials_bsurface" alt="">
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
                  <!-- :class="[istrue3 ? 'img-width':'img-height']"  -->
                  <img :src="cardUrl23" alt="">
                  <div class="icon-box"></div>
                  <div class="icon-bg"></div>
                  <div class="icon-text">重新上传</div>
                </div>
              </template>
              <template v-else>
                <div v-if="firstUpload">
                  <img class="img imgG" v-if="liActive==1" src="~imgurl/card3-1.png" alt="">
                  <img class="img imgG" v-else-if="liActive==2" src="~imgurl/card3-2.png" alt="">
                  <img class="img imgG" v-else src="~imgurl/card3-3.png" alt="">
                </div>
                <div v-else>
                  <img class="img" :src="userCertifyMsg.hold_certificates" alt="">
                </div>
              </template>
              <input class="inputpo3" type="file" @change="tirggerFile($event,3)">
            </div>
          </div>
          <div class="note-down">注:上传图片内证件号，姓名等信息应确保清晰，切不可修改或覆盖；</div>
        </div>
      </main>
      <footer>
        <div v-show="hasData">
          <button v-if="userCertifyMsg.status != 1" :class="{'show-color': hasData}" @click="submit(0)">提交审核</button>
          <button v-else @click="submit(1)">开始使用</button>
        </div>
        <div v-show="!hasData">
          <button>提交审核</button>
        </div>
      </footer>
      <common-loading :show.sync='loadingVal' :mask="true"></common-loading>
    </div>
  </div>
</template>

<script>
import CommonLoading from 'common/loading/Loading'
import { post } from '@/assets/js/fetch'
import { compress, convertBase64UrlToBlob } from '@/assets/js/fileTools'
import CommonHeader from 'common/header/Header'
export default {
  name: 'SettingBound',
  components: {
    CommonHeader,
    CommonLoading
  },
  data () {
    return {
      oldVal: '',
      hasInfo: true,
      postFormat: {},
      firstUpload: true,
      navTitle: '',
      pap: '身份证',
      chenckcard: false,
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
      userCertifyMsg: {},
      loadingVal: false
    }
  },
  computed: {
    hasData () {
      if (this.hasInfo) { // 有数据
        // const _info = this.userCertifyMsg
        // const pools = [this.username, this.userNo, _info.credentials_asurface, _info.credentials_bsurface, _info.hold_certificates]
        // if (pools.toString() === this.oldVal) {
        //   return false
        // }
        return true
      } else {
        const pools = [this.username, this.userNo, this.cardUrl21, this.cardUrl22, this.cardUrl23]
        for (const item of pools) {
          if (item === '') {
            return false
          }
        }
        return true
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户实名认证信息
    getUserInfo () {
      let data = this.postFormat
      data.token = sessionStorage.getItem('randomcode')
      let url = this.$api.user
      post(url + '/api/Authentication/getAuthenticationLists', data)
        .then(res => {
          this.istrue1 = JSON.parse(sessionStorage.getItem('istrue1'))
          this.istrue2 = JSON.parse(sessionStorage.getItem('istrue2'))
          this.istrue3 = JSON.parse(sessionStorage.getItem('istrue3'))
          if (res.data.list.length === 0) {
            this.hasInfo = false
            return false
          }
          this.firstUpload = false
          const _data = res.data.list
          this.userCertifyMsg = _data
          this.userNo = _data.credentials_no
          this.username = _data.name
          this.pap = _data.credentials_type_str
          const pools = [this.username, this.userNo, _data.credentials_asurface, _data.credentials_bsurface, _data.hold_certificates]
          this.oldVal = pools.toString()
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
    },
    // event上传图片
    tirggerFile (event, i) {
      var that = this
      let file = event.target.files[0]
      var reads = new FileReader()
      reads.readAsDataURL(file)
      reads.onload = function (e) {
        if (i === 1) {
          that.cardUrl21 = this.result
          let img = new Image()
          img.src = e.target.result
          img.onload = function () {
            that.istrue1 = this.width > this.height
          }
        } else if (i === 2) {
          that.cardUrl22 = this.result
          let img = new Image()
          img.src = e.target.result
          img.onload = function () {
            that.istrue2 = this.width > this.height
          }
        } else {
          that.cardUrl23 = this.result
          let img = new Image()
          img.src = e.target.result
          img.onload = function () {
            that.istrue3 = this.width > this.height
          }
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
            that.updateInfo(formData, i)
          }
        }
      } else {
        let param = new FormData()
        param.append('file', file, file.name)
        param.append('type', '1')
        that.updateInfo(param, i)
      }
    },
    updateInfo (param, i) {
      let url = this.$api.user
      if (this.liActive === 1) {
        url += '/api/Upload/uploadIdCardFile'
      } else if (this.liActive === 2) {
        url += '/api/Upload/uploadPassportFile'
      } else {
        url += '/api/Upload/uploadHMpassFile'
      }
      post(url, param)
        .then(res => {
          const imgurl = res.data.list.url
          if (res.code === 10000) {
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
          this.$toast(e.msg)
        })
    },
    submit (index) {
      this.loadingVal = true
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
      if (this.liActive === 1 && this.userNo.length < 15) {
        this.$toast('请填写至少15位身份证号')
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
      let data = this.postFormat
      data.name = this.username
      data.token = sessionStorage.getItem('randomcode')
      data.credentials_no = this.userNo
      data.credentials_asurface = this.cardUrl1 // 正面照
      data.credentials_bsurface = this.cardUrl2 // 背面照
      data.hold_certificates = this.cardUrl3 // 手持照
      data.credentials_type = this.liActive
      post(url + url1, data)
        .then(res => {
          this.loadingVal = false
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
          this.loadingVal = false
          this.$toast(e.msg)
        })
    },

    // 获取用户信息
    getUserMsg () {
      let data = this.postFormat
      data.token = sessionStorage.getItem('randomcode')
      let url = this.$api.user
      post(url + '/api/user/getUserInfo', data)
        .then(res => {
          if (res.code === 10000) {
            console.log()
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
    },

    handleInput (e) {
      this.userNo = this.userNo.replace(/[^\w\\/]/ig, '')
      this.userNo = this.userNo.replace('.', '')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-popup--top {
  background: rgba(0, 32, 78, .9);
}

.cert-body{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  overflow-y: scroll;
  .wrapper {
    position: relative;
    main {
      box-sizing: border-box;
      padding-top: 60px;
      .hint{
        font-size: 48px;
        color: #333333;
        font-weight: bold;
        padding-bottom: 38px;
      }
      .note2{
        font-size:24px;
        color: #FF4F4F;
      }
      .topBorder{
        border-bottom: none !important;
      }
      .top{
        position: relative;
        padding: 0 70px 0 30px;
        .note0{
          font-size: 24px;
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
          }
          input{
            width: 100%;
            color: #333333;
            font-size: 30px;
            height: 70px;
            line-height: 70px;
            background-color: transparent;
            border-bottom: 1.2px solid #E3E3E3;
            padding: 0 5px;
            padding-top: 12px;
            &::placeholder{
              color: #999999;
            }
          }
          .icon-type {
            background: url("~imgurl/s_right.png") center right 10px no-repeat;
            background-size: 15px 28px;
          }
          .btn{
            position: absolute;
            bottom: 20px;
            right: 10px;
            text-align: right;
            i{
              display: inline-block;
              width: 15px;
              height: 28px;
              background: url("~imgurl/todownarrow.png") center no-repeat;
              background-size: 15px 28px;
            }
          }
          .van-overlay{
            background-color: rgba(49, 49, 109, .25) !important;
          }
          ul{
            background-color: #fff;
            li{
              font-size: 28px;
              color: #000;
              padding: 41px 56px 42px 49px;
              border-bottom: 1px solid #F5F4F4;
              display: flex;
              justify-content: space-between;
              i{
                display: inline-block;
                height: 38px;
                width: 38px;
                background: url('~imgurl/radio-0-icon.png') center / 100% no-repeat
              }
            }
            .liActive{
              background: url('~imgurl/radio-1-icon.png') center / 100% no-repeat
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
        padding: 91px 45px 312px 30px;
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
              position: relative;
              height: 277px;
              font-size: 24px;
              color: #fff;
              .icon-box {
                display: inline-block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                background-color: rgba(0, 0, 0, .4);
                display: inline-block;
                height: 100%;
                width: 370px;
                height: 277px;
              }
              .icon-bg {
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translateX(-50%);
                width: 26px;
                height: 32px;
                background: url('~imgurl/s_upload_again.png') no-repeat center;
                background-size: 26px 32px;
              }
              .icon-text {
                position: absolute;
                top: 55%;
                left: 50%;
                transform: translateX(-50%);
              }
              .img-width{
                width: 280px;
              }
              .img-height{
                height: 277px;
              }
            }
            .mask1 {
              left: 50%;
              transform: translateX(-50%);
            }
            img{
              box-shadow: 0 0 20px -8px #666;
              height: 277px;
              width: 370px;
              border-radius: 8px;
            }
            .img{
              box-shadow: 0 0 20px -8px #d2d2d2;
              width: 370px;
              height: 277px;
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
          line-height: 30px;
        }
      }
    }
    footer{
      position: absolute;
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
}
/deep/ .van-overlay{
  background-color: rgba(49, 49, 109, .25) !important;
}
/deep/ .van-popup--bottom{
  border-radius: 20px 20px 0 0;
  h3{
    color: #010101;
    font-size: 28px;
    height: 105px;
    line-height: 105px;
    text-align: center;
    border-bottom: 1px solid #F5F4F4
  }
  p{
    padding: 50px 66px 77px;
    span{
      border-radius: 49px;
      height: 97px;
      line-height: 97px;
      font-size: 28px;
      color: #2A2A2A;
      text-align: center;
      width: 100%;
      display: inline-block;
      background:url('~imgurl/bg-border.png') center / 100% no-repeat;
    }
  }
}
</style>
