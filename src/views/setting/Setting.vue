<template>
  <div>
    <common-header :title="navTitle"></common-header>
    <main>
      <router-link to="/setting/pay">
        <div class="boxs boxs-pay" @click="jumpPayBound">
          <div class="icon default">绑定/修改</div>
        </div>
      </router-link>
      <div class="boxs boxs-real" @click="jumpRealBound">
        <div class="icon blue">审核中</div>
      </div>
    </main>
  </div>
</template>

<script>
import CommonHeader from 'common/header/Header'
export default {
  name: 'Setting',
  components: {
    CommonHeader
  },
  data () {
    return {
      navTitle: '设置'
    }
  },
  methods: {
    jumpPayBound () {
      this.$router.push({ path: '/setting/pay' })
    },
    jumpRealBound () {
      this.$router.push({ name: 'SettingPay' })
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
    height: 202.5px;
    padding: 20px 0px;
    .icon {
      position: absolute;
      top: 22px;
      right: 0;
      padding: 0 20px 0 34px;
      line-height: 48px;
      border-radius: 0px 16px 0px 48px;
      color: #fff;
    }
    .default {
      background-color: #637280;
    }
    .blue {
      background-color:#0078FF;
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
