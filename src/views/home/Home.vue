<template>
  <div>

    <!-- 头部-金额区 -->
    <header class="header">
      <div class="bars clearfix">
        <div class="left"><p>设置</p></div>
        <div class="title">我的钱包</div>
        <div class="right"><p>申诉</p></div>
      </div>

      <div class="boxs">
        <div class="boxs-top">
          <div class="money-state-box">
            <div class="money-state-a" v-show="moneyShow">
               1000<span>积分</span>
            </div>
            <div class="money-state-b" v-show="!moneyShow">
               <p class="qian">****</p>
               <p class="ziti">积分</p>
            </div>
          </div>
          <p class="text">冻结0</p>
          <button>
            <span class="hide-icon"></span>
            <span class="hide-text" @click="hideMoney()">隐藏</span>
          </button>
        </div>

        <div class="down clearfix">
          <div class="down-left">
            <button>
              <span class="btn-icon"></span>
              <span class="btn-text">充值</span>
            </button>
          </div>
          <div class="down-right">
            <button>
              <span class="btn-icon"></span>
              <span class="btn-text">提现</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <p class="blank"></p>

    <!-- 中间-金额区 -->
    <main>
      <div class="main-top">
        <p>充值积分</p>
        <input placeholder="请输入积分数量"/>
      </div>
      <div class="main-mid">
        <div class="main-imgs">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <p>付款金额：500CNY</p>
      </div>
      <button class="main-down" @click="changeValue">提交订单</button>
      <myComponent :show.sync='valueChild'></myComponent>
    </main>

    <div class="text-boxs">
      <p class="hint">温馨提示：</p>
      <div>
        <p>1、单笔最小充值额为100CNY，最大充值额为5万CNY。</p>
        <p>2、每次只能用时进行一笔充值，成功完成单笔充值后才可发起下笔充值。</p>
      </div>
    </div>

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
              v-for="(item, index) in orderList"
              :key="index"
              @click="jumpDetail()">
            <div class="li-tab-box">
              <div class="li-tab-text">{{item.充值}}</div>
              <div class="li-tab-time">2019-03-18 18:28:22</div>
              <div
                  class="li-tab-status"
                  :class="{
                    'li-tab-orange': item.状态 === '待付款',
                    'li-tab-blue': item.状态 === '已提交',
                    'li-tab-red': item.状态 === '未到账'
                  }"
              >{{item.状态}}</div>
            </div>

            <div class="li-money">
              <div class="left">金额</div>
              <div class="right">￥{{item.金额}}</div>
            </div>

            <div class="li-money">
              <div class="left">积分</div>
              <div class="right">{{item.积分}}</div>
            </div>

            <p class="li-time">
              剩余：{{item.剩余时间}}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import myComponent from 'common/dialog/Dialog'
export default {
  name: 'Home',
  data () {
    return {
      visibleMoney: '',
      valueChild: false,
      moneyShow: true,
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
      ],
      orderList: [
        {
          '充值': '充值',
          '时间': '2019-03-18 18:28:22',
          '状态': '待付款',
          '金额': '111',
          '积分': '111',
          '剩余时间': '29分59秒'
        },
        {
          '充值': '充值',
          '时间': '2019-03-18 18:28:22',
          '状态': '已提交',
          '金额': '222',
          '积分': '222',
          '剩余时间': '29分59秒'
        },
        {
          '充值': '充值',
          '时间': '2019-03-18 18:28:22',
          '状态': '未到账',
          '金额': '333',
          '积分': '333',
          '剩余时间': '29分59秒'
        }
      ]
    }
  },
  components: {
    myComponent
  },
  methods: {
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
    },
    changeValue () {
      this.valueChild = !this.valueChild
    },
    hideMoney () {
      this.moneyShow = !this.moneyShow
      if (this.editLeft) {
        this.visibleMoney = '1000'
      } else {
        this.visibleMoney = '****'
      }
    },
    jumpDetail () {
      this.$router.push({ name: 'Detail' })
    }
  }
}
</script>

<style lang="less" scoped>
@white: #ffffff;

@buttonBox: {
  position: relative;
  display: inline-block;
  float: left;
  height: 189px;
  width: 50%;
};

@buttonColor: {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 240px;
  height: 60px;
  background:#0078FF;
  border-radius: 28px;
  color: @white;
  .btn-text {
    float: right;
    margin-right: 59px;
  }
};

.clearfix:after {
    content: '';
    display: block;
    clear: both;
}

header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 303px;
  background: linear-gradient(0deg,rgba(75, 146, 254, 1),rgba(29, 64, 228, 1));
  .bars {
    position: relative;
    height: 88px;
    .left {
        float: left;
        width: 33.333333%;
        p {
            margin-left: 33px;
            height: 88px;
            line-height: 88px;
            font-size: 32px;
            color: @white;
        }
    }
    .title {
        float: left;
        width: 33.333333%;
        height: 88px;
        line-height: 88px;
        font-size: 34px;
        text-align: center;
        color: @white;
    }
    .right {
        float: left;
        width: 33.333333%;
        p {
            margin-right: 33px;
            height: 88px;
            line-height: 88px;
            font-size: 32px;
            color: @white;
            text-align: right;
        }
    }
  }
  .boxs {
    position: absolute;
    top: 106px;
    left: 41px;
    right: 41px;
    height: 386px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.2);
    .boxs-top {
      position: relative;
      height: 189px;
      text-align: center;
      .money-state-box {
        height: 189px;
        color: #2F2D2D;
        font-size: 72px;
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        .money-state-a {
          line-height: 189px;
          span {
            display: inline-block;
            color: #666666;
            font-size: 26px;
            margin-left: 6px;
          }
        }
        .money-state-b {
          .qian {
            display: inline-block;
            position: absolute;
            top: 77px;
            right: 292px;
          }
          .ziti {
            display: inline-block;
            position: absolute;
            top: 100px;
            right: 220px;
            color: #666666;
            font-size: 26px;
            margin-left: 6px;
          }
        }
      }
      .text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 6px;
        height:25px;
        font-size:26px;
        color: #999999;
      }
      button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        color: @white;
        width: 146px;
        height: 57px;
        background:#0078FF;
        border-radius: 29px 0px 0px 29px;
        .hide-text {
          float: right;
          margin-right: 20px;
        }
      }
    }
    .down {
      height: 189px;
      .down-left {
        @buttonBox();
        button {
          @buttonColor();
        }
      }
      .down-right {
        @buttonBox();
        button {
          @buttonColor();
          background: #ffffff;
          color: #727272;
          border:2px solid #656565;
        }
      }
    }
  }
}

.blank {
  height: 223px;
}

main {
  box-sizing: border-box;
  // border: 1px solid salmon;
  height: 384px;
  margin: 0 32px;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.2);
  .main-top {
    height: 91px;
    margin: 0 21px;
    border-bottom: 2px solid #D4D4D4;
    p {
      display: inline-block;
      height: 91px;
      line-height: 91px;
      color: #384253;
      font-size: 32px;
    }
    input {
      display: inline-block;
      width: 500px;
      float: right;
      height: 91px;
      line-height: 91px;
      text-align: right;
      font-size: 30px;
    }
  }
  .main-mid {
    height: 178px;
    border: 1px #ffffff solid;
    .main-imgs {
      display: flex;
      margin-top: 27px;
      .item {
        width:160px;
        height:54px;
        border: 1px orangered solid;
        margin-left: 50px;
      }
    }
    p {
      margin-top: 46px;
      font-size: 24px;
      text-align: center;
    }
  }
  .main-down {
    display: block;
    width:600px;
    height:80px;
    background: #0078FF;
    border-radius: 10px;
    font-size:32px;
    color: @white;
    margin: 0 auto;
  }
}

.text-boxs {
  height: 239px;
  margin: 0 32px;
  p {
    font-size: 24px;
    color: #999999;
    line-height: 33px;
  }
  .hint {
    margin: 21px 0;
  }
}

.orders {
  margin: 0 32px;
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
      li:last-child {
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
      }
      li {
        margin-top: 28px;
        height: 275px;
        box-shadow: 0px 3px 5px 0px rgba(149,149,149,0.25);
        .li-tab-box {
          display: flex;
          height: 86px;
          .li-tab-text {
            color: #60C064;
            font-size: 30px;
            line-height: 86px;
            margin-left: 20px;
          }
          .li-tab-time {
            flex: 1;
            font-size:22px;
            line-height: 86px;
            text-align: center;
            margin-right: -90px;
          }
          .li-tab-status {
            font-size: 30px;
            line-height: 86px;
            width: 155px;
            background: url('~imgurl/mine_more.png') no-repeat right 26px center;
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
          .left {
            color: #999999;
            margin-left: 20px;
            font-size: 30px;
          }
          .right {
            color: #333333;
            margin-right: 26px;
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
    }
  }
}
</style>
