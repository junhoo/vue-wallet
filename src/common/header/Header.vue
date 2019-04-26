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

<style lang="less" >
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.header {
  position: fixed;
  width: 100%;
  height: 164px;
  z-index: 100;
  padding-top: 20px;
  box-sizing: border-box;
  background-color: #fff;
  .back {
    z-index: 102;
    width: 164px;
    height: 164px;
    float: left;
    line-height: 164px;
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
    height: 164px;
    line-height: 164px;
    text-align: center;
    font-size: 33px;
    color: #2C3249;
    font-family: SourceHanSansCN-Medium;
    font-weight: 500;
  }
}
</style>
