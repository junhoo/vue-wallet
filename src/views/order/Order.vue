<template>
  <div>
    <common-header :title="navTitle"></common-header>
    <van-tabs v-model="active" swipeable :line-width="'50%'">
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

// .van-tabs--line .van-tabs__wrap {
//   height: 180px;
// }
// .van-tabs--line {
//   .van-tabs__wrap {
//     height: 180px;
//   }
// }
.van-tabs__nav--line {
  height: 180px;
}

.item {
  height: 100px;
}
</style>
