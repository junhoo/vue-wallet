<template>
  <div>

    <!-- 头部-金额区 -->
    <header class="header">
      <div class="bars clearfix">
        <div class="left" @click="jumpSetPage()"><p>设置</p></div>
        <div class="title">资产</div>
        <div class="right"><p>申诉</p></div>
      </div>

      <div class="boxs">
        <div class="boxs-top">
          <div class="money-state-box">
            <div class="money-state-a" v-show="moneyShow">
               {{headerInfo.operating_amount}}<span>积分</span>
            </div>
            <div class="money-state-b" v-show="!moneyShow">
               <p class="hine-sum">****</p>
               <p class="hine-text">积分</p>
            </div>
          </div>
          <p class="text">冻结{{headerInfo.freezing_amount}}</p>
          <button @click="hideMoney()">
            <div class="hide-icon"></div>
            <span class="hide-text">隐藏</span>
          </button>
        </div>

        <div class="down clearfix">
          <div class="down-default" :class="{'down-active': buttonVal === '充值'}">
            <button @click="selectBtnType()">
              <div class="btn-icon"></div>
              <div class="btn-text">充值</div>
            </button>
          </div>
          <div class="down-default" :class="{'down-active': buttonVal === '提现'}">
            <button  @click="selectBtnType()">
              <div class="btn-icon"></div>
              <div class="btn-text">提现</div>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="bg-wrapper">
      <p class="blank"></p>

      <!-- 中间-金额区 -->
      <main>
        <div class="main-top">
          <p v-show="buttonVal === '充值'">充值积分</p>
          <p v-show="buttonVal === '提现'">提现积分</p>
          <input type="text"
                 v-model="keyword"
                 placeholder="请输入积分数量"
                 onKeyUp="value=value.replace(/[^\d]/g,'')"
                 onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))">
        </div>
        <div class="main-mid">
          <div class="main-imgs">
            <div class="item item-wx"></div>
            <div class="item item-ali-no"></div>
            <div class="item item-bank-no"></div>
          </div>
          <p v-show="buttonVal === '充值'">额外扣除服务10%，实际到账5000</p>
          <p v-show="buttonVal === '提现'">资产余额1000积分，<span>全部提现</span></p>
        </div>
        <button class="main-down" @click="changeValue()">提交订单</button>
      </main>

      <div class="text-boxs">
        <p class="hint">温馨提示：</p>
        <div>
          <p>1、单笔最小充值额为100CNY，最大充值额为5万CNY。</p>
          <p>2、每次只能用时进行一笔充值，成功完成单笔充值后才可发起下笔充值。</p>
        </div>
      </div>

      <!-- order -->
      <home-list ref="dialog" :list="orderList" v-on:tabevent='onTabEvent' ></home-list>
      <dialog-order :show.sync='dialogOrderVal' :text='dialogText'></dialog-order>
      <dialog-box
                :show.sync='dialogBoxVal'
                :dialog-option="dialogOption"
                v-on:dialogboxEvent='onDialogBox'>
      </dialog-box>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HomeList from './components/List'
import DialogOrder from 'common/order_dialog/Dialog'
import DialogBox from 'common/dialog/Dialog'
// import { encrypt, decrypt } from '@/assets/utils.js'
export default {
  name: 'Home',
  data () {
    return {
      timer: 0,
      keyword: '',
      visibleMoney: '',
      moneyShow: true, // 显示金额
      dialogBoxVal: false, // 显示对话框
      dialogOrderVal: false, // 显示
      buttonVal: '充值',
      dialogText: '订单匹配中，请稍后...',
      orderState: '已提交',
      headerInfo: {},
      mainInfo: {
        state: '充值积分',
        text: ''
      },
      orderList: [],
      postOrderData: {
        'app-name': '123',
        'merchant_type': '1', // 1:A端 2:B端
        'merchant_code': '12345',
        'pay_type': '1', // 1支付宝，2微信支付，3银行
        'third_user_id': '1'
      },
      dialogOption: {
        title: '提示',
        text: '请先完成实名认证再进行交易',
        cancelButtonText: '取消',
        confirmButtonText: '去实名'
      }
    }
  },
  components: {
    DialogBox,
    DialogOrder,
    HomeList
  },
  created () {
    // let name = '123123'
    // 加密
    // let a = encrypt(name)
    // // 解密
    // let b = decrypt(a)

    // console.log('加密', a)
    // console.log('解密', b)
    this.getHomeInfo()
    this.getOrderInfo('1')
    if (!JSON.parse(localStorage.getItem('visibleMoney'))) {
      this.moneyShow = false
    }
  },
  methods: {
    getHomeInfo () {
      const data = {
        'app-name': 'app_name1',
        'uid': 1
      }
      const url = 'http://wallet.service.168mi.cn'
      axios.post(url + '/api/wallet/user_wallet', data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            console.log('获取首页', res)
            const _obj = res.data.list
            // "id": 7,
            // "user_id": 1,
            // "order_number": "",
            // "operating_amount": "1.00", // 盈利
            // "freezing_amount": "1.00", // 冻结
            // "wallet_type": 0,
            // "operation_type": 1,
            // "remarks_info": "测试数据",
            // "amount_income": "1.00",
            // "add_time": 1554361663,
            // "add_date": "2019-04-04 15:07:43",
            // "operation_type_str": "充值"
            this.headerInfo = _obj
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误')
        })
    },

    // 选择- 充值 / 提现
    selectBtnType () {
      this.buttonVal = this.buttonVal === '充值' ? '提现' : '充值'
      if (this.buttonVal === '充值') {
        this.mainInfo = {
          state: '充值积分',
          text: '额外扣除服务10%，实际到账5000'
        }
      } else {
        this.mainInfo = {
          state: '提现积分',
          text: '资产余额1000积分，'
        }
      }
      this.$refs.dialog.selectTab('未完成')
      console.log(this.buttonVal)
    },

    // 验证窗口
    changeValue () {
      const types = '' // 付款-类型
      const inputs = this.keyword
      if (types === '') {
        this.dialogOption = {
          title: '提示',
          text: '未绑定该支付方式，是否为去绑定？',
          cancelButtonText: '取消',
          confirmButtonText: '去绑定'
        }
        this.dialogBoxVal = true
      } else if (inputs === '') {
        var exp = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/
        if (!exp.test(inputs)) {
          this.$toast('请输入充值数量')
        }
      } else {
        // 提交订单-充值
        if (this.buttonVal === '充值') {
          this.submitOrderA()

          // this.timer = setInterval(() => {
          //   if (this.timer === 3000) {
          //     this.dialogText = '订单匹配成功，买家正在付款'
          //   } else
          //   if (this.timer === 8000) {
          //     this.dialogText = '买家已付款，请你确认收款'
          //     if (this.timer) {
          //       clearTimeout(this.timer)
          //     }
          //   }
          //   console.log(this.timer)
          //   console.log(this.dialogText)
          //   this.timer += 1000
          // }, 2000)

        // 提交订单-提现
        } else {
          this.submitOrderB()
        }
      }
    },

    // 提交订单
    submitOrderA () {
      console.log('点击充值')
      this.postOrderData.order_amount = this.keyword
      const data = this.postOrderData
      const url = 'http://order.service.168mi.cn'
      axios.post(url + '/api/order/recharge', data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            console.log(res.data)
            this.dialogOrderVal = !this.dialogOrderVal
          } else {
            this.$toast(res.msg)
          }
          console.log('点击充值', res)
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误')
        })
    },

    submitOrderB () {
      console.log('点击提现')
      this.postOrderData.order_amount = this.keyword
      const data = this.postOrderData
      const url = 'http://order.service.168mi.cn'
      axios.post(url + '/api/order/draw', data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            console.log(res.data)
            this.dialogOrderVal = !this.dialogOrderVal
          } else {
            this.$toast(res.msg)
          }
          console.log('点击提现', res)
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误')
        })
    },

    // type = 1未完成, 2已完成, 3已取消
    onTabEvent (type) {
      this.getOrderInfo(type)
    },

    onDialogBox (type) {
      console.log(type)
      if (this.dialogOption.confirmButtonText === '去实名') {
        // 点击去实名认证
      } else {
        // 点击去绑定支付
      }
    },

    // 获取充值订单列表
    getOrderInfo (type) {
      console.log(type + '获取充值订单列表')
      const data = {
        'app-name': '123',
        'merchant_type': '1', // 1:A端
        'merchant_code': '12345',
        'type': type, // 1未完成, 2已完成, 3已取消
        'third_user_id': '1',
        'page': '1',
        'limit': '10'
      }
      const name = this.buttonVal === '充值' ? 'getRechangeLists' : 'getDrawLists'
      console.log('请求 ' + name)
      const url = 'http://order.service.168mi.cn'
      axios.post(url + '/api/order/' + name, data)
        .then(res => {
          res = res.data
          if (res.code === '10000') {
            console.log('获取订单', res)
            const _list = res.data.list.list
            const _total = res.data.list.total
            const stateCode = ['已提交', '待付款', '未到账', '已取消', '已完成', '已匹配', '待确认']

            // 测试数据
            // const _mock = {
            //   'user_id': 7241671554258922, // 用户user_id
            //   'status': 1, // A端订单状态 1 已提交 2 待付款 3 未到账 4 已取消 5 已完成 6已匹配 7 待确认
            //   'seller_status': 0, // 'B端订单状态   1 已接单 2 待付款 3 未到账 4 待确认 5 已完成 6 已取消'
            //   'buyer_id': 0, //  买入id
            //   'seller_id': 7241671554258922, // 提交用户id
            //   'order_amount': '100.00', // 提现金额
            //   'order_no': 2615981554295497, // 订单号
            //   'pay_type': 1, // 支付方式1支付宝，2微信支付，3银行
            //   'order_type': 2, // 订单充值类别 1 充值 2提现
            //   'add_time': 1554295497, // 时间戳
            //   'pay_prove_pic': null, // 支付凭证
            //   'add_time_str': '2019-04-03 20:44:57' // 时间
            // }
            // _list.push(_mock)
            // 测试数据

            _list.forEach(i => {
              i.title_type = this.buttonVal
              i.status_text = stateCode[i.status - 1]
            })
            console.log('获取订单', _list, _total)

            this.orderList = _list
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(e => {
          console.log(e)
          this.$toast('网络错误')
        })
    },
    hideMoney () {
      this.moneyShow = !this.moneyShow
      if (this.moneyShow) {
        localStorage.setItem('visibleMoney', true)
      } else {
        localStorage.setItem('visibleMoney', false)
      }
    },
    jumpSetPage () {
      this.$router.push({ name: 'Setting' })
    }
  }
}
</script>

<style lang="less" scoped>
@white: #ffffff;
@bgColor: #f8f8f8;

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
  border-radius: 28px;
  text-align: center;
  color: #727272;
  border:2px solid #656565;
  background: #ffffff;
  .btn-icon {
    display: inline-block;
    margin-top: -1px;
    width: 120px;
    height: 60px;
    float: left;
  }
  .btn-text {
    display: inline-block;
    margin-top: -1px;
    width: 50px;
    line-height: 60px;
    float: left;
    text-align: left;
    margin-left: 11.5px;
  }
};

@btnIcon: {
   display: inline-block;
  width: 38px;
  height: 35px;
  background: url('~imgurl/moneyActive-icon.png') no-repeat;
  background-size: 100%;
  background-position: center;
  margin-right: 2px;
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
        font-size: 72px;
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        color: #2F2D2D;
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
          .hine-sum {
            display: inline-block;
            position: absolute;
            top: 77px;
            right: 292px;
          }
          .hine-text {
            display: inline-block;
            position: absolute;
            top: 98px;
            right: 221px;
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
        .hide-icon{
          width: 39px;
          height: 28px;
          position: absolute;
          left: 21px;
          top: 15px;
          background: url('~imgurl/look-icon.png') no-repeat;
          background-size: 100%;
          background-position: center;
        }
      }
    }
    .down {
      height: 189px;
      .down-default {
        @buttonBox();
        button {
          @buttonColor();
          .btn-icon {
            background: url('~imgurl/money-icon.png') no-repeat right 11.5px center;
            background-size: 38px 35px;
          }
        }
      }
      .down-active {
        @buttonBox();
        button {
          @buttonColor();
          color: @white;
          background: #0078FF;
          border:2px solid #0078FF;
          .btn-icon {
            background: url('~imgurl/moneyActive-icon.png') no-repeat right 11.5px center;
            background-size: 38px 35px;
          }
        }
      }
    }
  }
}

.bg-wrapper {
  background: @bgColor;
  .blank {
    height: 223px;
  }

  main {
    box-sizing: border-box;
    height: 384px;
    margin: 0 32px;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.2);
    background: #f8f8f8;
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
          background-color: #0078FF;
          margin-left: 50px;
          border-radius: 10px;
        }
        .item-wx {
          background: url('~imgurl/wx_icon_active.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-ali {
          background: url('~imgurl/ali_icon_active.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-bank {
          background: url('~imgurl/bank_icon_active.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-wx-no {
          background: url('~imgurl/wx_icon_no.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-ali-no {
          background: url('~imgurl/ali_icon_no.png') no-repeat right 0 center;
          background-size: 100%
        }
        .item-bank-no {
          background: url('~imgurl/bank_icon_no.png') no-repeat right 0 center;
          background-size: 100%
        }
      }
      p {
        margin-top: 46px;
        font-size: 24px;
        text-align: center;
        span {
          color: #0078FF;
        }
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

}
</style>
