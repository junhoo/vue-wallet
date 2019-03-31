<template>
  <div>
    <header class="header">
      <!-- 标题栏 -->
      <div class="bars clearfix">
        <div class="left"><p>设置</p></div>
        <div class="title">我的钱包</div>
        <div class="right"><p>申诉</p></div>
      </div>

      <div class="boxs">
        <!-- 金额区 -->
        <div class="boxs-top">
          <div class="money">100000<span>积分</span></div>
          <p class="text">冻结0</p>
          <button>
            <span class="hide-icon"></span>
            <span class="hide-text">隐藏</span>
          </button>
        </div>

        <!-- 按钮区 -->
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

    <main>
      <div class="a">
        <p>充值积分</p>
        <input placeholder="请输入积分数量"/>
      </div>
      <div class="b">
        <div class="b-top">
          <div class="img"></div>
          <div class="img"></div>
          <div class="img"></div>
        </div>
        <div class="b-down"></div>
      </div>
      <div class="c"></div>
    </main>
  </div>
</template>

<script>
export default {
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
      .money {
        line-height: 189px;
        color: #2F2D2D;
        font-size: 72px;
        span {
          color: #666666;
          font-size: 26px;
          margin-left: 6px;
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
  .a {
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
  .b {
    height: 178px;
    border: 1px black solid;
    .b-top {
      display: flex;
      margin-top: 27px;
      .img {
        width:160px;
        height:54px;
        border: 1px orangered solid;
        margin-left: 50px;
      }
    }
    .b-down {
    }
  }
}
</style>
