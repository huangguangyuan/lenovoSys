<template>
  <div class="bespeakDetails">
    <van-nav-bar title="预约详情" left-arrow fixed @click-left="onClickLeft"/>
    <ul class="container">
      <li v-for="item in dataList" :class="[item.install_type==1?'install':'repair']">
        <div class="timer">{{item.appoint_time}}</div>
        <div class="center">
          <span class="line"></span>
          <img src="@/assets/images/ico-repair.png" alt>
        </div>
        <div class="content">
          <h5>{{item.install_type==1?'安装':'维修'}}</h5>
          <div class="dial" @click="dialFun(item.id)">
            <van-icon name="phone"/>
            <span>拨 号</span>
          </div>
          <p>{{item.txt}}</p>
          <van-button
            class="btn-reset"
            plain
            size="small"
            @click="clickFun(item)"
          >{{item.install_status_words}}</van-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "bespeakDetails",
  data() {
    return {
      dataList: []
    };
  },
  mounted() {
    this.getDetailsFun();
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/bespeakList" });
    },
    getDetailsFun() {
      var _this = this;
      var reqUrl = "/index/appointment/myOrderList";
      var data = {};
      _this.$http.get(reqUrl, qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          _this.dataList = res.data.data.map(item => {
            switch (item.install_status) {
              case 0:
                item.install_status_words = "未受理";
                break;
              case 1:
                item.install_status_words = "已接单";
                break;
              case 2:
                item.install_status_words = "待评价";
                break;
              case 3:
                item.install_status_words = "已完成";
                break;
            }

            if (item.install_status == 0) {
              item.txt = "工作人员将于24小时内和您取得联系，请耐心等待...";
            } else {
              item.txt = `为您派送工程师${item.installer_name}  于${
                item.appoint_time
              }到${item.install_address}安装！`;
            }
            return item;
          });
        }
      });
    },
    clickFun(res) {
      var _this = this;
      _this.$store.commit({
        type: "getOrderID",
        orderID: res.id,
        orderDetailsID: res.id
      });
      switch (res.install_status) {
        case 0:
          _this.$router.push({ path: "/orderDetails" });
          break;
        case 1:
          _this.$router.push({ path: "/orderDetails" });
          break;
        case 2:
          _this.$router.push({ path: "/evaluateFrom" });
          break;
        case 3:
          // _this.$router.push({ path: "/orderDetails" });
          // break;
      }
    },
    // 拨号
    dialFun(id) {
      var _this = this;
      var reqUrl = "/index/appointment/userCallInstaller";
      var data = { id: id };
      _this.$http.post(reqUrl, data).then(res => {
        if (res.data.code == 200) {
          window.location.href = "tel:" + res.data.data.phone_x;
        } else {
          _this.$dialog.alert({ message: res.data.msg });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.bespeakDetails {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #ededed;
  padding-top: 46px;
  .container {
    background-color: #ffffff;
    border-bottom: 1px #e0e0e0 solid;
    border-top: 1px #e0e0e0 solid;
    padding: 20px 0;
    li {
      display: flex;
      box-sizing: border-box;
      padding: 0 10px;
      .timer {
        font-size: 12px;
        width: 160px;
        text-align: right;
      }
      .center {
        margin: 0 10px;
        position: relative;
        span {
          position: absolute;
          width: 2px;
          height: 100%;
          left: 50%;
          margin-left: -1px;
          top: 0;
          background-color: #e0e0e0;
        }
      }
      img {
        width: 23px;
        position: relative;
      }
      .content {
        padding-bottom: 30px;
        width: 500px;
        .dial {
          border-radius: 8px;
          font-size: 12px;
          margin: 10px 0;
          display: flex;
          justify-content: center;
          align-content: center;
          color: #fe491f;
          align-items: center;
          border: 1px #fe491f solid;
          width: 60px;
        }
        h5 {
          font-size: 14px;
        }
        p {
          font-size: 12px;
          margin: 10px 0;
        }
        .btn-reset {
          color: #fe491f;
          background-color: #f7f7f7;
          border-radius: 8px;
          border: 1px #ebebeb solid;
        }
      }
    }
  }
  .install {
    color: #808080;
  }
  .repair {
    color: #202020;
  }
}
</style>







