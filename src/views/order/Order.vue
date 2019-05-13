<template>
  <div class="order-body">
    <!-- <div class="box">
      <div class="sma"></div>
    </div> -->
    <common-header :title="navTitle"></common-header>

    <div class="wrapper" ref="bar">
      <van-tabs v-model="active" @click="getOrderList" swipeable :line-height="8" :line-width="lineWidth">
        <van-tab
                v-for="(item, index) in titleList"
                :title="item"
                :key='index'>

          <div class="orderlist">
            <div
              v-for="(item, index) in orderList"
              :key="index">
              <div class="content">
                <div class="item" @click="todetail(item.order_no,item.status)">
                  <div class="item-top">
                    <p class="left">{{item.order_amount}}</p>
                    <p
                      class="right"
                      :class="{
                        'skyblue': item.status === 2 || item.status === 6,
                        'orange': item.status === 3 || item.status === 7,
                        'blue': item.status === 1 || item.status === 5,
                        'red': item.status === 4 || item.status === 8}">
                        {{item.status_str}}
                    </p>
                  </div>
                  <div class="item-bottom">
                    <p class="left">{{item.real_amount}}<span>CNY</span></p><p class="right">{{item.add_time}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="no-order-img" v-show="showNoImg"></div>
    <p class="no-order-text" v-show="showNoImg">暂无{{titleList[active]}}记录</p>
    <common-loading :show.sync='loadingVal'></common-loading>
    <van-popup v-model="showHint" position="top" :overlay="false">
      <p class="popup-hint" @click="showTopHint('close')">{{textHint}}</p>
    </van-popup>
  </div>
</template>

<script>
import { post } from '@/assets/js/fetch'
import CommonHeader from 'common/header/Header'
import CommonLoading from 'common/loading/Loading'
export default {
  name: 'Order',
  components: {
    CommonHeader,
    CommonLoading
  },
  data () {
    return {
      timer: null,
      showHint: false,
      showNoImg: false,
      loadingVal: false,
      textHint: '',
      titleList: ['充值', '提现'],
      navTitle: '订单记录',
      active: 2,
      lineWidth: 0,
      orderList: []
    }
  },
  created () {
    this.getOrderList(0)
  },
  mounted () {
    const { width } = this.$refs.bar.getBoundingClientRect()
    this.lineWidth = width / 2 - 2
  },
  watch: {
    active (val) {
      if (this.active === 0) {
        this.getOrderList(0)
      } else {
        this.getOrderList(1)
      }
    }
  },
  methods: {
    getOrderList (index) {
      this.orderList = []
      this.showNoImg = false
      this.loadingVal = true

      const data = {
        token: sessionStorage.getItem('randomcode'),
        order_type: index + 1
      }
      const url = this.$api.order + '/api/order/getOrderList'
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        post(url, data)
          .then(res => {
            let _list = res.data.list.list
            for (const val of _list) {
              if (val.status === 4 || val.status === 8) {
                val.status_str = '已取消'
              }
            }
            this.showNoImg = _list.length === 0
            this.orderList = _list
            this.loadingVal = false
          })
          .catch(e => {
            console.log(e)
            this.loadingVal = false
            this.showTopHint('网络错误，请重试')
          })
      }, 350)
    },
    showTopHint (info) {
      if (info === 'close') {
        this.showHint = false
        return
      }
      this.textHint = info
      this.showHint = true
      if (this.timerHint) {
        clearTimeout(this.timerHint)
      }
      this.timerHint = setTimeout(() => {
        this.showHint = false
      }, 1500)
    },
    todetail (id, status) {
      if (status === 1) {
        return false
      }
      if (this.active === 0) {
        this.$router.push({
          name: 'RechargeDetail',
          query: {
            order_no: id
          }
        })
      } else {
        this.$router.push({
          name: 'WithdrawalDetail',
          query: {
            order_no: id
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order-body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  .wrapper {
    position: relative;
    .orderlist {
      box-sizing: border-box;
      position: fixed;
      top: 176px;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 30px;
      overflow-y: scroll;
      .content {
        box-sizing: border-box;
        width: 100%;
        padding: 20px 0;
        .item {
          height: 145px;
          padding: 0 42px 0 31px;
          background-color: #ffffff;
          color: #B2B2B2;
          font-size: 26px;
          .item-top {
            display: flex;
            justify-content: space-between;
            height: 92px;
            line-height: 92px;
            .left {
              font-size:40px;
              font-weight:bold;
              color: #494949;
            }
            .right {
              font-size:28px;
            }
          }
          .item-bottom {
            display: flex;
            justify-content: space-between;
          }
          .red {
            color: #FF6B6B;
          }
          .blue {
            color: #4264FB;
          }
          .orange {
            color: #FF8C01;
          }
          .skyblue{
            color: #3EC0F1
          }
        }
      }
    }
  }

  .no-order-img {
    position: fixed;
    top: 350px;
    left: 50%;
    transform: translateX(-50%);
    right: 0;
    width: 86px;
    height: 91px;
    background: url('~imgurl/no_order.png') no-repeat center;
    background-size: 86px 91px;
  }
  .no-order-text {
    position: fixed;
    top: 506px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    color: #BDBDBD;
    text-align: center;
  }

  .popup-hint {
    width: 750px;
    height: 179px;
    line-height: 179px;
    font-size: 28px;
    text-align: center;
    color: #ffffff;
    border-bottom: 1px solid #06204E;
    background-color:#06204E;
    opacity: 0.85;
  }
}
</style>
<style lang="less">
// .box{
//   .sma{
//     border: 1px solid;
//     width: 444px;
//     height: 445px;
//     background: url('~imgurl/123.png') no-repeat;
//     animation: stepAn steps(36) 5s infinite;
//   }
//   @keyframes stepAn {
//     0% {
//       background-position: 0 0;
//     }
//     100% {
//       background-position: 0 bottom;
//     }
//   }
// }
</style>

<style>
.van-tabs--line {
  padding-top: 88px;
}

.van-tabs--line .van-tabs__wrap {
  height: 88px;
}

.van-tabs__nav {
  background-color: #f5f5f5;
}

.van-ellipsis {
  height: 88px;
  line-height: 88px;
  font-size: 30px;
  font-weight:bold;
}

.van-tabs__line {
  height: 8px !important;
  background:#4264FB;
  border-radius: 4px !important;
  width: 50% !important;
}
</style>
