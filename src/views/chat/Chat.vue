<template>
  <div>
    <div class="live-retreat" v-if="show" @click="backPage">
      <img src="~imgurl/toLeftarrow.png">
    </div>
    <iframe id = "child" name = "child" class="live-chat" v-bind:src="reportUrl"
            width="auto" frameborder="0" scrolling="no">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data () {
    return {
      timer: null,
      show: false,
      reportUrl: 'http://api.pop800.com/chat/512351'
    }
  },
  mounted () {
    // const userinfo = JSON.parse(sessionStorage.getItem('userMsg'))
    // const pj = this.spliced((userinfo.id).toString())
    this.changeMobsfIframe()
    window.onresize = (() => {
      this.changeMobsfIframe()
    })
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
      mobsf.style.width = (Number(deviceWidth) - 0) + 'px'
      mobsf.style.height = (Number(deviceHeight) - 0) + 'px'
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
.live-retreat {
  position: fixed;
  top: 0;
  left: 0;
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
.live-chat {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
