<template>
  <div class="wrapper">
    <common-header :title="navTitle"></common-header>

    <main>
      <div class="top">
        <div class="hint">实名认证</div>
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
          <input type="text" placeholder="请输入真实姓名">
        </div>
        <div class="item">
          <div class="name">证件号码</div>
          <input type="text" placeholder="请输入证件号码">
        </div>
        <p class="note">注：请务必使用您本人的实名账户</p>
      </div>
      <div class="bottom">
        <p class="hint">上传{{pap}}照片</p>
        <div class="upload">
          <div class="imgs">
            <img v-if="liActive==1" src="~imgurl/card1-1.png" alt="">
            <img v-else-if="liActive==2" src="~imgurl/card1-2.png" alt="">
            <img v-else src="~imgurl/card1-3.png" alt="">
            <input class="inputpo1" type="file" @change="tirggerFile($event)">
          </div>
          <div class="imgs">
            <img v-if="liActive==1" src="~imgurl/card2-1.png" alt="">
            <img v-else-if="liActive==2" src="~imgurl/card2-2.png" alt="">
            <img v-else src="~imgurl/card2-3.png" alt="">
            <input class="inputpo2" type="file" @change="tirggerFile($event)">
          </div>
        </div>
        <p class="hint">上传手持{{pap}}照片</p>
        <div class="upload">
          <div class="imgs">
            <img v-if="liActive==1" src="~imgurl/card3-1.png" alt="">
            <img v-else-if="liActive==2" src="~imgurl/card3-2.png" alt="">
            <img v-else src="~imgurl/card3-3.png" alt="">
            <input class="inputpo3" type="file" @change="tirggerFile($event)">
          </div>
        </div>
        <div class="note2">注：上传图片内证件号、姓名等信息应确保清晰；切不可修改或覆盖</div>
      </div>
    </main>
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
      navTitle: '',
      pap: '身份证',
      chenckcard: 0,
      status: 0,
      liActive: 1
    }
  },
  methods: {
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
    tirggerFile (event) {
      var file = event.target.files
      console.log('tirggerFile')
      console.log(file)
      const data = { 'file': file }
      const url = 'http://user.service.168mi.cn'
      axios.post(url + '/api/Upload/uploadWeChatPayFile', data)
        .then(res => {
          res = res.data
          console.log(res)
          if (res.code === '10000') {
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
      const url = 'http://user.service.168mi.cn'
      if (this.entryType === '银行卡') {
        const data = this.requestBank
        console.log('绑定-银行卡', data)
        axios.post(url + '/api/Bindpay/addBankPay', data)
          .then(res => {
            res = res.data
            console.log(res)
            if (res.code === '10000') {
              const _obj = res.data.list
              this.headerInfo = _obj
            } else {
              this.$toast(res.msg)
            }
          })
          .catch(e => {
            console.log(e)
            this.$toast('网络错误')
          })
      } else if (this.entryType === '微信') {
        const data = {
          'merchant_type': '1',
          'merchant_code': '12345',
          'wechat_name': '测试姓名',
          'wechat_account': '12345666',
          'wechat_rq_code': '111111',
          'third_user_id': '1'
        }
        console.log('绑定-微信', data)
        axios.post(url + '/api/Bindpay/addWeChatPay', data)
          .then(res => {
            res = res.data
            console.log(res)
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
      }
    }
  }
}
</script>

<style lang="less">
.wrapper{
  main{
    padding-top: 60px;
    margin-bottom: 100px;
    .hint{
        font-size: 48px;
        color: #6D778B;
        font-weight: bold;
        margin-bottom: 48px;
      }
    .top{
      border-bottom: 12px solid #F4F4F4;
      padding: 0 70px 24px 30px;
      .item{
        position: relative;
        .name{
          font-size: 28px;
          font-weight: bold;
          color: #6D778B;
          margin-bottom: 8px;
        }
        input{
          width: 100%;
          color: #6D778B;
          font-size: 32px;
          background-color: transparent;
          border-bottom: 1px solid #E3E3E3;
          padding: 24px 5px;
          margin-bottom: 48px;
          &::placeholder{
            color: #9FA9BA;
          }
        }
        .btn{
          width: 100px;
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
      padding: 48px 30px 0;
      .upload{
        margin-bottom: 64px;
        display: flex;
        position: relative;
        .imgs{
          flex: 1;
          text-align: center;
          &:first-of-type{
            margin-right: 40px;
          }
          img{
            width: 310px;
            box-shadow: 0 0 20px -8px #666;
          }
          input{
            position: absolute;
            top: 0px;
            width: 280px;
            height: 230px;
            opacity: 0;
          }
          .inputpo1{
            left: 20px;
          }
          .inputpo2{
            right: 20px;
          }
          .inputpo3{
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .note2{
        font-size: 28px;
        color: #9299A7;
      }
    }
  }
  footer{
    padding: 0 65px 100px;
    button{
      width: 100%;
      background-color: #3B67E0;
      height: 88px;
      border-radius: 4px;
      font-size: 32px;
      color: #fff;
    }
  }
}
</style>
