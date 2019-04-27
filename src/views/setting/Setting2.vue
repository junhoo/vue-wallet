<template>
  <div>
    <common-header :title="navTitle"></common-header>
    <div class="wrapper">
      <ul>
        <li>
          <div class="boxs">
            <span class="text-left">实名认证</span>
            <span class="text-right">{{authState}}</span>
          </div>
        </li>
        <li>
          <div class="boxs" @click="jumpPayBound()">
            <span class="text-left">绑定支付</span>
            <span class="text-right">{{boundState}}</span>
          </div>
        </li>
      </ul>

      <ul>
        <li>
          <div class="boxs">
            <span class="text-left">申诉管理</span>
            <span class="text-right"></span>
          </div>
        </li>
        <li>
          <div class="boxs">
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
      navTitle: '设置',
      authState: '未认证', // 审核中 未通过  已认证
      boundState: '未认证' // 绑定/修改
    }
  },
  methods: {
    jumpPayBound () {
      this.$router.push({ path: '/setting/pay' })
    }
  }
}
</script>

<style lang="less" scoped>
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
      font-weight:400;
      .boxs {
        display: flex;
        justify-content: space-between;
        padding-right: 67px;
        border-bottom: 1px solid #E9E9E9;
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
</style>
