<template>
  <div>
    <common-header :title="navTitle"></common-header>
    <main>
      <div class="boxs boxs-pay" @click="jumpPayBound">
        <div class="icon default">绑定/修改</div>
      </div>
      <div class="boxs boxs-real" @click="jumpRealBound">
        <div class="icon blue" :class="{'red':userMsg.is_realname==2,'default':userMsg.is_realname==0,'green':userMsg.is_realname==1}">{{userMsg.is_realname | certistatusText}}</div>
       </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import CommonHeader from 'common/header/Header'
export default {
  name: 'Setting',
  components: {
    CommonHeader
  },
  data () {
    return {
      navTitle: '设置',
      userMsg: {}
    }
  },
  created () {
    this.getUserMsg()
  },
  methods: {
    jumpPayBound () {
      this.$router.push({ path: '/setting/pay' })
    },
    jumpRealBound () {
      this.$router.push({
        path: '/setting/settingCertification',
        query: this.userCertifyMsg
      })
    },
    // 获取用户实名认证信息
    getUserMsg () {
      const data = {
        'app-name': '123',
        'merchant_type': '1', // 1:A端
        'merchant_code': '12345',
        'third_user_id': '1'
      }
      let url = 'http://user.service.168mi.cn'
      axios.post(url + '/api/user/getUserInfo', data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            this.userMsg = res.data.list
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          this.$toast('网络错误，不能访问')
        })
    }
  },
  filters: {
    certistatusText: function (value) {
      // value = value.toString()
      if (value === 0) {
        value = '未认证'
      } else if (value === 1) {
        value = '已认证'
      } else if (value === 2) {
        value = '未通过'
      } else {
        value = '审核中'
      }
      return value
    }
  }
}
</script>

<style lang="less" scoped>
@shareBox: {
.boxs {
  position: relative;
  height: 242.5px;
  padding: 20 0px;
  .icon {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 20px 0 34px;
    line-height: 48px;
    background:#0078FF;
    border-radius: 0px 16px 0px 48px;
  }
}
};

main {
  box-sizing: border-box;
  margin: 0 20px;
  .boxs {
    position: relative;
    height: 191px;
    margin-top: 49px;
    .icon {
      position: absolute;
      right: 0;
      padding: 0 20px 0 34px;
      line-height: 48px;
      border-radius: 0px 16px 0px 48px;
      color: #fff;
      background-color:#0078FF;
    }
    .default {
      background-color: #637280;
    }
    .green {
      background-color: #52C75A;
    }
    .red {
      background-color: #FF6C6C;
    }
  }
  .boxs-pay {
    background: url('~imgurl/bound_pay.png') center no-repeat;
    background-size: 100%;
  }
  .boxs-real {
    background: url('~imgurl/bound_real.png') center no-repeat;
    background-size: 100%;
  }
}
</style>
