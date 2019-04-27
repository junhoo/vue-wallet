<template>
  <div class="AppealList">
    <common-header title="申诉管理"></common-header>
    <div class="noData" v-if="noData">
      <img src="~imgurl/no_data.png" alt="">
      <p>暂无记录</p>
    </div>
    <div class="dataList">
      <div class="item" v-for="(item, index) in itemData" :key="index" @click="toADetail()">
        <div class="m_left">
          <p>申诉单号：{{item.orderid}}</p>
          <span>{{item.time}}</span>
        </div>
        <div class="m_right">
          <span :class="{'red':item.status == 1, 'yellow':item.status == 2, 'green':item.status == 3}">{{item.status|statusTxt}}</span>
          <i class="icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from 'common/header/Header'
export default {
  name: 'AppealList',
  components: {
    CommonHeader
  },
  data () {
    return {
      noData: false,
      itemData: [
        {
          orderid: '1521',
          time: '2019-03-09 12:21',
          status: 1 // 1未处理 2处理中 3已完成
        },
        {
          orderid: '1521',
          time: '2019-03-09 12:21',
          status: 2
        },
        {
          orderid: '1521',
          time: '2019-03-09 12:21',
          status: 3
        }
      ]
    }
  },
  created () {
  },
  methods: {
    toADetail () {
      this.$router.push({name: 'AppealDetail'})
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
.AppealList{
  position: fixed;
  background-color: #F5F8FA;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .noData{
    padding-top: 167px;
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
  .dataList{
    padding: 118px 30px;
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
        span{
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
          background: url('~imgurl/set_arrows.png')
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
}
</style>
