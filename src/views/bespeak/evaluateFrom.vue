<template>
  <div class="evaluateFrom">
    <!-- 顶部信息 -->
    <van-nav-bar title="安装信息" left-arrow fixed @click-left="onClickLeft"/>
    <!-- banner -->
    <div class="banner">已完成</div>
    <!-- 内容 -->
    <ul class="list">
      <li>
        <div class="container">
          <div class="proInfo">
            <p>
              <span>安装师傅: {{name}}</span>
              <span>联系电话: {{phone}}</span>
              <span>上门时间: {{timer}}</span>
              <span>订单号: {{orderNo}}</span>
              <span>服务地址: {{address}}</span>
            </p>
            <van-checkbox checked-color="#fb2812"></van-checkbox>
          </div>
        </div>
        <div class="remarks">
          <van-field
            v-model="message"
            type="textarea"
            placeholder="你的评价能帮助其他伙伴，描述具体情况有助于商家优化服务"
            rows="5"
            autosize
          />
        </div>
        <div class="rate">
          <p>评价安装员 {{name}}</p>
          <div class="rate-con">
            <img src="@/assets/images/install_img.png" alt>
            <van-rate v-model="rate" :size="25" color="#f44" void-icon="star" void-color="#eee"/>
          </div>
        </div>
      </li>
    </ul>
    <!-- 按钮 -->
    <div class="btn-ground">
      <van-button type="primary" size="large" class="btn-custom" @click="submitFun">提 交</van-button>
      <!-- <van-button size="large" class="cancelBtn">取消</van-button> -->
    </div>
    <!--  -->
    <!-- 预约成功 -->
    <van-popup v-model="isShowSuccess" class="success-mask" @click='isShowSuccess = false'>
      <van-icon name="checked" size="120px" color="#ff4e1f"/>
      <h3>评价成功</h3>
    </van-popup>
  </div>
</template>
<script>
import qs from "qs";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      dataList: [], //数据列表
      isShowSuccess: false,
      message: "",
      rate: 1,
      name: "",
      phone: "",
      timer: "",
      orderNo: "",
      address: ""
    };
  },
  mounted() {
    var _this = this;
    _this.getInfo();
  },
  methods: {
    // 确认
    confirmFn() {
      var _this = this;
      var idList = _this.dataList
        .filter(item => {
          return item.checked;
        })
        .map(item => {
          return item.id;
        });

      if (idList.length == 0) {
        _this.$dialog.alert({
          title: "提 示",
          message: "请选择商品~"
        });
        return false;
      }
      _this.$store.commit({
        type: "getOrdersId",
        installOrdersId: idList
      });
      _this.$router.go(-1);
    },
    // 返回按钮
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取信息
    getInfo() {
      var _this = this;
      var reqUrl = "/index/appointment/getInstallerInfo";
      var data = {
        id: _this.orderDetailsID
      };
      _this.$http.post(reqUrl, data).then(res => {
        _this.name = res.data.data.installer_name;
        _this.phone = res.data.data.installer_phone;
        _this.timer = res.data.data.install_time;
        _this.orderNo = res.data.data.orders_id;
        _this.address = res.data.data.install_address;
      });
    },
    // 评价
    submitFun() {
      var _this = this;
      var reqUrl = "/index/appointment/pingjia";
      var data = {
        id: _this.orderDetailsID,
        orders_id: _this.orderNo,
        pingjia: _this.message,
        star_point: _this.rate
      };
      _this.$http.post(reqUrl, data).then(res => {
        _this.isShowSuccess = true;
      });
    }
  },
  computed: {
    orderDetailsID() {
      return this.$store.state.installMode.orderDetailsID;
    }
  }
};
</script>
<style scoped lang="scss">
.evaluateFrom {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #ededed;
  padding-top: 46px;
  .banner {
    width: 100%;
    height: 75px;
    background-color: #ff9600;
    text-align: center;
    line-height: 75px;
    font-size: 25px;
    color: #ffffff;
  }
  .list {
    li {
      margin-top: 10px;
    }
    .container {
      padding: 0 13px;
      background-color: #ffffff;
      .info {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px #e0e0e0 solid;
        .info-right {
          margin-left: 15px;
          p {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #202020;
          }
          p:nth-child(2) {
            margin-top: 5px;
          }
        }
      }
      .proInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        p {
          font-size: 14px;
          color: #202020;
          span {
            display: block;
            margin-top: 5px;
          }
        }
      }
    }
    .remarks {
      background-color: #ffffff;
      min-height: 120px;
      border-top: 1px #e0e0e0 solid;
      border-bottom: 1px #e0e0e0 solid;
      margin-top: 10px;
      p {
        font-size: 14px;
        color: #e0e0e0;
      }
    }
    .rate {
      background-color: #ffffff;
      border-top: 1px #e0e0e0 solid;
      border-bottom: 1px #e0e0e0 solid;
      margin-top: 10px;
      padding: 13px;
      p {
        font-size: 14px;
        color: #808080;
      }
      img {
        margin-right: 20px;
      }
      .rate-con {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
    }
    .logistics {
      background-color: #ffffff;
      padding: 13px;
      border-top: 1px #e0e0e0 solid;
      border-bottom: 1px #e0e0e0 solid;
      margin-top: 10px;
      p {
        font-size: 14px;
        color: #e0e0e0;
      }
    }
  }
  .btn-ground {
    width: 350px;
    margin: 40px auto;
    .cancelBtn {
      margin-top: 20px;
    }
  }
  .success-mask {
    width: 80%;
    padding: 40px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
      font-size: 16px;
      color: #202020;
      margin-top: 10px;
    }
    .closeBtn {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>


