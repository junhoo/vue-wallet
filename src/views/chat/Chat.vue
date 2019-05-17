<template>
  <div class="chat-body">
    <!-- <div class="live-retreat" v-if="show" @click="backPage">
      <img src="~imgurl/toLeftarrow.png">
    </div> -->
    <common-header :title="navTitle"></common-header>
    <!-- 修改会不可使用 -->
    <div class="demo-iframe-holder">
      <iframe id = "child" name = "child" class="live-chat" v-bind:src="reportUrl" width="100%" height="100%" >
      </iframe>
    </div>
  </div>
</template>

<script>
import CommonHeader from 'common/header/Header'
export default {
  name: 'Chat',
  components: {
    CommonHeader
  },
  data () {
    return {
      navTitle: '客服中心',
      timer: null,
      show: false,
      reportUrl: 'http://api.pop800.com/chat/512351'
    }
  },
  mounted () {
    // const userinfo = JSON.parse(sessionStorage.getItem('userMsg'))
    // const pj = this.spliced((userinfo.id).toString())
    // this.changeMobsfIframe()
    // window.onresize = () => {
    //   this.changeMobsfIframe()
    // }
    this.timer = setTimeout(() => {
      this.show = true
    }, 1000)
  },
  beforeDestroy () {
    this.timer && clearTimeout(this.timer)
  },
  methods: {
    // iframe宽高适应
    changeMobsfIframe () {
      const mobsf = document.getElementById('child')
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      mobsf.style.width = (Number(deviceWidth) / 75) + 'rem'
      mobsf.style.height = ((Number(deviceHeight) / 75) - 1.174) + 'rem'
      console.log(mobsf.style.width)
      console.log(mobsf.style.height)
    },
    spliced (val) {
      let str = val.substring(0, 6)
      str = str.split('')
      str.splice(0, 1, '5')
      let res = str.join('')
      return res
    },
    backPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.chat-body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .live-retreat {
    position: relative;
    z-index: 2000;
    width: 88px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    img{
      width: 30px;
      height: 40px;
    }
  }
  .demo-iframe-holder {
    position: fixed;
    top: 88px;
    left: 0;
    right: 0;
    bottom: 0;
    // overflow-y: scroll;
    white-space: nowrap;
    .live-chat {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
