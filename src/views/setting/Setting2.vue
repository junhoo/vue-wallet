<template>
  <div class="set-body">
    <common-header :title="navTitle"></common-header>
    <div class="wrapper">
      <ul>
        <li>
          <div class="boxs" @click="jumpIn(1)">
            <span class="text-left">实名认证</span>
            <span class="text-right">{{userMsg | is_realname}}</span>
          </div>
        </li>
        <li>
          <div class="boxs" @click="jumpIn(2)">
            <span class="text-left">绑定支付</span>
            <span class="text-right">{{userMsg | filterBound}}</span>
          </div>
        </li>
      </ul>

      <ul>
        <li>
          <div class="boxs" @click="jumpIn(3)">
            <span class="text-left">申诉管理</span>
            <span class="text-right"></span>
          </div>
        </li>
        <li>
          <div class="boxs" @click="jumpIn(4)">
            <span class="text-left">在线客服</span>
            <span class="text-right"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommonHeader from 'common/header/Header'
export default {
  name: 'Setting2',
  components: {
    CommonHeader
  },
  data () {
    return {
      userMsg: {},
      navTitle: '设置',
      authState: '未认证', // 审核中 未通过  已认证
      boundState: '未认证' // 绑定/修改
    }
  },
  created () {
    this.userMsg = JSON.parse(sessionStorage.getItem('userMsg'))
  },
  methods: {
    jumpIn (i) {
      if (i === 1) {
        this.$router.push({ path: '/setting/settingCertification' })
      } else if (i === 2) {
        this.$router.push({ path: '/setting/pay' })
      } else if (i === 3) {
        this.$router.push({ path: '/appealList' })
      } else if (i === 4) {
        this.$router.push({ name: 'Chat' })
      } else {
      }
    }
  },
  filters: {
    filterBound (value) {
      const info = value.pay_info
      const hasList = [info.ali_pay, info.bank_pay, info.wechat_pay]
      const lastList = hasList.filter(bol => bol === true)
      if (lastList.length >= 1) {
        return '绑定/修改'
      }
      return '未绑定'
    },
    is_realname (value) {
      const info = value.is_realname
      if (info === 0) {
        value = '未认证'
      } else if (info === 1) {
        value = '已认证'
      } else if (info === 2) {
        value = '认证失败'
      } else if (info === 3) {
        value = '审核中'
      } else {
        value = '未认证'
      }
      return value
    }
  }
}
</script>

<style lang="less" scoped>
.set-body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .wrapper {
    position: fixed;
    top: 88px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    box-sizing: border-box;
    ul {
      margin-top: 24px;
      background-color: #ffffff;
      li {
        height: 92px;
        line-height: 92px;
        padding-left: 48px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        .boxs {
          display: flex;
          justify-content: space-between;
          padding-right: 67px;
          border-bottom: 1px solid #e9e9e9;
          font-size: 28px;
          background: url('~imgurl/set_arrows.png') no-repeat right 28px center;
          background-size: 15px 25px;
          .text-left {
            color: #000000;
          }
          .text-right {
            color: #959595;
          }
        }
      }
    }
  }
}
</style>
