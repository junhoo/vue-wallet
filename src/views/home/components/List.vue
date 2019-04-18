<template>
  <!-- 底部-列表 -->
  <div class="orders">
    <div class="tabs">
      <ul>
        <li v-for="(item, index) in tabTitle"
            :key="index"
            class="tabs-li"
            @click="selectTab(item.title)"
            :class="selectTitle === item.title ? 'tabs-li-select' : ''">
          {{item.title}}
        </li>
      </ul>
    </div>

    <div class="lists">
      <ul>
        <li
            class="has-boxs"
            v-for="(item, index) in list"
            :key="index"
            @click="jumpDetail(item.order_type,item.status,item.order_no)">
          <div class="li-tab-box">
            <div class="li-tab-text">{{item.title_type}}</div>
            <div class="li-tab-time">{{item.add_time_str}}</div>
            <!-- 1 已提交 2 待付款 3 未到账 4 已取消 5 已完成 6已匹配 7 待确认 -->
            <div
                class="li-tab-status"
                :class="{
                  'li-tab-orange': item.status === 2 || item.status === 6,
                  'li-tab-blue': item.status === 1 || item.status === 5,
                  'li-tab-red': item.status === 3 || item.status === 4 || item.status === 7
                }"
            >{{stateText(item.status_text)}}</div>
          </div>

          <div class="li-money">
            <div class="left">金额</div>
            <div class="right">￥{{resMoney(item)}}</div>
          </div>

          <div class="li-money">
            <div class="left">积分</div>
            <div class="right">{{item.order_amount}}</div>
          </div>
        </li>
        <li  v-show="!hasList" class="no-data">
          <div class="icon"></div>
          <p class="text">您还没有相关的订单</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomeList',
  props: {
    list: Array
  },
  data () {
    return {
      selectTitle: '未完成',
      tabTitle: [
        {
          title: '未完成'
        },
        {
          title: '已完成'
        },
        {
          title: '已取消'
        }
      ]
    }
  },
  computed: {
    hasList () {
      return this.list.length
    }
  },
  methods: {
    resMoney (item) {
      if (item.title_type === '充值') {
        return item.order_amount
      }
      return item.real_amount
    },
    stateText (str) {
      let text = str
      if (text === '已匹配') {
        text = '待付款'
      }
      if (text === '待确认') {
        text = '未到账'
      }
      return text
    },
    selectTab (title) {
      switch (title) {
        case '未完成':
          this.selectTitle = '未完成'
          break
        case '已完成':
          this.selectTitle = '已完成'
          break
        case '已取消':
          this.selectTitle = '已取消'
          break
        default:
          this.selectTitle = '未完成'
          break
      }
      const titleCode = { '未完成': '1', '已完成': '2', '已取消': '3' }
      this.$emit('tabevent', titleCode[this.selectTitle])
    },
    jumpDetail (ordeType, status, orderId) {
      // 1充值，2提现
      if (ordeType === 1) {
        this.$router.push({
          name: 'DetailRecharge',
          query: {
            orderid: orderId,
            status: status
          }
        })
      } else {
        this.$router.push({
          name: 'Detail',
          query: {
            orderid: orderId,
            status: status
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@white: #ffffff;

.orders {
  margin: 0 32px;
  padding-bottom: 72px;
  .tabs {
    margin: 0 65px;
    width:560px;
    ul {
      display: flex;
      position: relative;
      width: 560px;
      border: 2px solid #0078FF;
      border-radius: 10px;
      .tabs-li:nth-child(1) {
        border-left: 0px solid #0078FF;
      }
      .tabs-li {
        width: 186px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        color: #0078FF;
        border-left: 2px solid #0078FF;
        background: #ffffff;
        &:first-of-type{
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        &:last-of-type{
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
      .tabs-li-select {
        color: @white;
        background: #0078FF;
      }
    }
  }
  .lists {
    position: relative;
    ul {
      .has-boxs {
        margin-top: 28px;
        padding-left: 20px;
        padding-right: 26px;
        height: 244px;
        box-shadow: 0px 3px 5px 0px rgba(149,149,149,0.25);
        border-radius: 10px;
        background: #f8f8f8;
        .li-tab-box {
          display: flex;
          height: 86px;
          border-bottom: 2px solid #F8F8F8;
          .li-tab-text {
            color: #60C064;
            font-size: 30px;
            line-height: 86px;
          }
          .li-tab-time {
            flex: 1;
            font-size: 28px;
            line-height: 86px;
            text-align: center;
            margin-right: -90px;
            color: #999999;
          }
          .li-tab-status {
            font-size: 30px;
            line-height: 86px;
            width: 129px;
            background: url('~imgurl/arrow-right.png') no-repeat right 0 center;
            background-size: 16px 28px;
          }
          .li-tab-orange {
            color: #FF8C01;
          }
          .li-tab-blue {
            color: #0568EE;
          }
          .li-tab-red {
            color: #FE4A57;
          }
        }
        .li-money {
          display: flex;
          justify-content: space-between;
          line-height: 69px;
          border-bottom: 2px solid #F8F8F8;
          .left {
            color: #999999;
            font-size: 30px;
          }
          .right {
            color: #333333;
            font-size: 28px;
          }
        }
        .li-time {
          color: #2D79F1;
          font-size: 28px;
          text-align: right;
          margin-right: 26px;
          font-family:MicrosoftYaHei;
          font-weight:bold;
        }
      }
      .no-data {
        margin-top: 91px; // +28
        text-align: center;
        background: #f8f8f8;
        .icon {
          width: 100%;
          height: 148px;
          background: url('~imgurl/no_data.png') no-repeat center;
          background-size: 80px 100px;
        }
        .text {
          font-size: 24px;
          line-height: 33px;
        }
      }
    }
  }
}
</style>
