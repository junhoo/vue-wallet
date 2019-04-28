<template>
  <div class="header clearfix">
    <div class="button">
      <div @click="backPage" class="back">
        <img src="~imgurl/toLeftarrow.png" alt="">
      </div>
    </div>
    <div class="title">{{this.title}}</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  },
  methods: {
    backPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.header {
  position: fixed;
  width: 100%;
  height: 88px;
  z-index: 100;
  box-sizing: border-box;
  background-color: #fff;
  top: 0;
  left: 0;
  .back {
    z-index: 102;
    width: 88px;
    height: 88px;
    float: left;
    line-height: 88px;
    text-align: center;
    img{
      width: 20px;
    }
  }
  .button {
    float: left;
    width: 33.333333%;
  }
  .title {
    z-index: 101;
    box-sizing: border-box;
    width: 33.333333%;
    float: left;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 34px;
    color: #384253;
    font-family: SourceHanSansCN-Medium;
    font-weight: 500;
  }
}
</style>
