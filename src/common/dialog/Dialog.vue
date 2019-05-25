<template>
  <div v-if="show" class="dialog" @click.stop>
    <div class="mask" @click="cancel"></div>
    <div class="wrapper">
      <div class="title">{{ modal.title }}</div>
      <div class="text">{{ modal.text }}</div>
      <div class="dialog_btn">
        <template v-if="modal.buttonCount === 1">
          <div class="btn_common btn_common_max submit_box" @click="cancel">
            <button class="submit_btn">{{ modal.cancelButtonText }}</button>
          </div>
        </template>
        <template v-else>
          <div class="btn_common cancel_box" @click="cancel">
            <button class="cancel_btn">{{ modal.cancelButtonText }}</button>
          </div>
          <div class="btn_common submit_box" @click="submit">
            <button class="submit_btn">{{ modal.confirmButtonText }}</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    show: Boolean,
    dialogOption: Object
  },
  computed: {
    modal: function () {
      let options = this.dialogOption
      return {
        title: options.title || '提示',
        text: options.text,
        cancelButtonText: options.cancelButtonText
          ? options.cancelButtonText
          : '取消',
        confirmButtonText: options.confirmButtonText
          ? options.confirmButtonText
          : '确定',
        buttonCount: options.buttonCount
      }
    }
  },
  methods: {
    closeDiv () {
      this.$emit('update:show', false) // 触发 input 事件，并传入新值
    },
    submit () {
      this.$emit('dialogboxevent', true)
    },
    cancel () {
      this.closeDiv()
      this.$emit('dialogboxevent', false)
    }
  }
}
</script>

<style lang="less" scoped>
.dialog {
  position: relative;
  .wrapper {
    position: fixed;
    box-sizing: border-box;
    text-align: center;
    width: 568px;
    height: 330px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: #fff;
    color: #384253;
    border-radius:20px;
    z-index: 9999;
    .title {
      line-height: 80px;
      font-size: 36px;
      width: 100%;
    }
    .text {
      display: flex;
      justify-content: center;
      flex-direction: column;
      min-height: 120px;
      line-height: 2;
      font-size: 28px;
      padding: 0 30px;
      margin: 0 auto;
    }
    .dialog_btn {
      height: 98px;
      line-height: 98px;
      margin-top: 10px;
      overflow: hidden;
      .btn_common {
        display: inline-block;
        width: 49%;
        height: 98px;
        font-size: 30px;
        float: left;
      }
      .btn_common_max {
        width: 99.9%;
      }
      .cancel_box {
        color: #666;
        font-size: 26px;
        .cancel_btn {
          width: 180px;
          line-height: 70px;
          background: #d7d7d7;
          border-radius: 8px;
        }
      }
      .submit_box {
        font-size: 26px;
        color: #666;
        button {
          width: 180px;
          line-height: 70px;
          background:#4264FB;
          border-radius: 8px;
          color: #fff;
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.45);
  }
}
</style>
