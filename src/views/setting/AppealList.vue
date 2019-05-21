<template>
  <div class="alistdetail-body">
    <common-header title="申诉管理"></common-header>s
    <div class="appeal-list">
      <div class="no-data" v-if="itemData.length == 0">
        <img src="~imgurl/no_order.png" alt="">
        <p>暂无记录</p>
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
import { post } from '@/assets/js/fetch'
import CommonHeader from 'common/header/Header'
export default {
  name: 'AppealList',
  components: {
    CommonHeader
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
