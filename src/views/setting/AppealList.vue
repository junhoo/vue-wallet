<template>
  <div class="alistdetail-body">
    <common-header title="申诉管理"></common-header>s
    <div class="appeal-list">
      <div class="no-data" v-if="itemData.length == 0">
        <img src="~imgurl/no_order.png" alt="">
        <p>暂无记录</p>
        <!-- <div id="qrcode" @click="qrcode($event)" ref="qrcode">二维码位置</div>
        <p @click="downs">下 载</p> -->
      </div>
      <div v-else class="data-list">
        <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
          <div class="item" v-for="(item, index) in itemData" :key="index" @click="toADetail(item.complain_no)">
            <div class="m_left">
              <p>申诉单号：{{item.complain_no}}</p>
              <span class="m-time">{{item.add_time | formatDate}}</span>
            </div>
            <div class="m_right">
              <span :class="{'red':item.status == 1, 'yellow':item.status == 2, 'green':item.status == 3}">{{item.status|statusTxt}}</span>
              <i class="icon"></i>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import moment from 'moment'
import { post } from '@/assets/js/fetch'
import CommonHeader from 'common/header/Header'
export default {
  name: 'AppealList',
  components: {
    CommonHeader,
    QRCode
  },
  data () {
    return {
      noData: false,
      itemData: [],
      list: [],
      loading: false,
      finished: false,
      limit: 10,
      page: 1
    }
  },
  created () {
    this.getAppealMsg()
  },
  methods: {
    // 下载图片到本地
    qrcode (e) {
      let qrcode = new QRCode('qrcode', {
        width: 200,
        height: 200,
        text: 'http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg'
      })
      console.log(qrcode, 123)
      console.log(e.currentTarget.lastElementChild, '45')
    },
    downs () {
      var alink = document.createElement('a')
      let event = new MouseEvent('click')
      alink.href = this.imgs
      alink.download = '张三的二维码'
      alink.href = 'data:image/png;base64,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'
      alink.dispatchEvent(event)
    },
    // 获取申诉列表信息
    getAppealMsg () {
      var data = {
        token: sessionStorage.getItem('randomcode'),
        page: this.page,
        limit: this.limit
      }
      let url = this.$api.order + '/api/Complain/complainList'
      post(url, data)
        .then(res => {
          this.itemData = res.data.list
        })
        .catch(e => {
          console.log(e)
          console.log('getAppealMsg')
          this.$toast(e.msg)
        })
    },
    // 上拉加载
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    toADetail (id) {
      this.$router.push({
        name: 'AppealDetail',
        query: {
          complain_no: id
        }
      })
    }
  },
  filters: {
    statusTxt: function (value) {
      value = value.toString()
      if (value === '1') {
        value = '未处理'
      } else if (value === '2') {
        value = '处理中'
      } else {
        value = '已完成'
      }
      return value
    },
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD hh:mm')
    }
  }
}
</script>

<style lang="less" scoped>
.alistdetail-body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .appeal-list{
    position: fixed;
    top: 88px;
    background-color: #F5F8FA;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .no-data{
      padding-top: 79px; // 167px;
      text-align: center;
      img{
        width: 86px;
        margin-bottom: 65px
      }
      p{
        font-size: 28px;
        color: #BDBDBD
      }
    }
    .data-list{
      padding: 42px 30px;
      .item{
        background-color: #fff;
        border-radius: 20px;
        margin-bottom: 20px;
        padding: 41px 31px 31px;
        display: flex;
        .m_left{
          p{
            margin-bottom: 23px;
            font-size: 28px;
            color: #494949;
          }
          .m-time {
            float: left;
            font-size: 26px;
            color: #B2B2B2
          }
        }
        .m_right{
          flex: 1;
          position: relative;
          text-align: right;
          span{
            width: 100%;
            font-size: 28px;
            position: absolute;
            top: 15px;
            right: 40px;
          }
          i{
            position: absolute;
            top: 15px;
            right: 0px;
            display: inline-block;
            width: 15px;
            height: 28px;
            background: url('~imgurl/set_arrows.png') no-repeat center;
          }
          .red{
            color: #FB4242
          }
          .yellow{
            color: #FFC62E
          }
          .green{
            color: #2DD131
          }
        }
      }
    }
    .van-list{
      text-align: center
    }
  }
}
</style>
