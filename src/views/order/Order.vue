<template>
  <div>
    <common-header :title="navTitle"></common-header>
    <div class="fff">
      <van-tabs v-model="active" swipeable :line-width="'300px'">
        <van-tab
                v-for="(item, index) in titleList"
                :title="item"
                :key='index'>
          <div
            class="item">
            内容 {{ index }}
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import CommonHeader from 'common/header/Header'
export default {
  name: 'Order',
  components: {
    CommonHeader
  },
  data () {
    return {
      titleList: ['充值', '提现'],
      navTitle: '订单记录',
      active: 2
    }
  }
}
</script>

<style lang="less" scoped>

.item {
  height: 100px;
}
</style>

<style>
/* .van-tabs--line {
  padding-top: 88px;
}

.van-tabs--line .van-tabs__wrap {
  height: 88px;
}

.van-ellipsis {
  height: 88px;
  line-height: 88px;
  color: #000000;
  font-size: 30px;
  font-weight:bold;
} */
.van-tabs__line {
  height: 8px;
  background:#4264FB;
  border-radius: 4px;
  width: 50%;
}
</style>
