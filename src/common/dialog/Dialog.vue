<template>
  <div v-if="show" class="dialog" @click.stop>
    <div class="mask"></div>
    <div class="wrapper">
      <!-- <p>默认初始值是{{show}}，所以是显示的</p> -->
      <button @click.stop="closeDiv">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: ['show'],
  data () {
    return {
    }
  },
  methods: {
    closeDiv () {
      this.$emit('update:show', false) // 触发 input 事件，并传入新值
    }
  }
}
</script>

<style lang="less" scoped>
.dialog {
  position: relative;
  .wrapper {
    position: fixed;
    top: 464px;
    left: 50%;
    transform: translateX(-50%);
    width: 567px;
    height: 402px;
    background: #ffffff;
    z-index: 2000
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
