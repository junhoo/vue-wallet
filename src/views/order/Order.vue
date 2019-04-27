<template>
  <div>
    <common-header :title="navTitle"></common-header>
    <van-tabs v-model="active" swipeable>
      <van-tab
              v-for="index in 3"
              :title="'选项 ' + index"
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
.van-tabs--line {
  .van-tabs__wrap {
    height: 180px;
  }
}

.item {
  height: 100px;
}
</style>
