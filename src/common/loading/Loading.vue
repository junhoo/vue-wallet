<template>
  <div v-if="show" @click.stop>
      <div class="loading_mask">
          <div class="loading_box">
            <div class="loading-icon"></div>
            <div class="loading-text">正在加载...</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    show: Boolean
  }
}
</script>

<style lang="less" scoped>
.loading_mask {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 102;
    .loading_box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      background: rgba(0, 0, 0, .7);
      border-radius: 10.5px;
      .loading-icon {
        position: relative;
        width: 160px;
        height: 100px;
        line-height: 100px;
        background: url('~imgurl/loading.gif') no-repeat center;
        background-size: 50px 50px;
      }
      .loading-text {
        margin-top: -25px;
        height: 70px;
        line-height: 70px;
        color: #ffffff;
        font-size: 24px;
      }
    }
}
</style>
