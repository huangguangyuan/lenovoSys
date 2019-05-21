<template>
  <div class="orderList">
    <van-nav-bar title="服务管理" fixed border/>
    <van-tabs type="card" v-model="navActive" @change='tabFun'>
      <van-tab title="未完成">
        <ul class="list">
          <li v-for="item in noFinishList" @click="receiptFun(item.status,item.id)">
            <p>
              <span>客户姓名：</span>
              <span>{{item.username}}</span>
            </p>
            <p>
              <span>电 话：</span>
              <a href="javascript:;" @click.stop="dialFun(item.id)">
                <van-icon name="phone"/>拨号
              </a>
            </p>
            <p>
              <span>订单号：</span>
              <span>{{item.orders_id}}</span>
            </p>
            <p>
              <span>预约时间：</span>
              <span>{{item.appoint_time}}</span>
            </p>
            <p>
              <span>{{item.install_type==1?'安装地址：':'维修地址：'}}</span>
              <span>{{item.install_address}}</span>
            </p>
            <van-button
              plain
              type="primary"
              size="small"
              class="btn-custom2"
            >{{item.statusTxt}}</van-button>
          </li>
        </ul>
      </van-tab>
      <van-tab title="已完成">
        <ul class="list">
          <li v-for="item in finishList">
            <p>
              <span>客户姓名：</span>
              <span>{{item.username}}</span>
            </p>
            <p>
              <span>电 话：</span>
              <span>{{item.phone}}</span>
            </p>
            <p>
              <span>订单号：</span>
              <span>{{item.orders_id}}</span>
            </p>
            <p>
              <span>预约时间：</span>
              <span>{{item.appoint_time}}</span>
            </p>
            <p>
              <span>安装地址：</span>
              <span>{{item.install_address}}</span>
            </p>
            <van-button plain type="primary" size="small">{{item.statusTxt}}</van-button>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "orderList",
  data() {
    return {
      tabNav: ["未完成", "已完成"],
      noFinishList: [], //未完成数据列表
      finishList: [], //已完成数据列表
      navActive:0
    };
  },
  mounted() {
    this.getNoFinishList();
  },
  methods: {
    // 点击选项卡
    tabFun(index){
      var _this = this;
      if(index == 0){
        // 获取未完成列表
        this.getNoFinishList();
      }else{
        // 获取已完成列表
        this.getFinishList();
      }
    },
    // 获取未完成列表
    getNoFinishList() {
      var _this = this;
      var reqUrl = "/index/installer/getUnfinishOrderList";
      _this.$http.post(reqUrl, {}).then(res => {
        if (res.data.code == 200) {
          _this.noFinishList = res.data.data.map(item => {
            switch (item.status) {
              case -1:
                item.statusTxt = "已取消";
                break;
              case 0:
                item.statusTxt = "未接单";
                break;
              case 1:
                item.statusTxt = "已接单";
                break;
              case 2:
                item.statusTxt = "已完成";
                break;
            }
            return item;
          });
        } else {
          _this.$dialog.alert({message:res.data.msg});
        }
      });
    },
    // 获取已完成列表
    getFinishList() {
      var _this = this;
      var reqUrl = "/index/installer/getFinishOrderList";
      _this.$http.get(reqUrl, {}).then(res => {
        if (res.data.code == 200) {
          _this.finishList = res.data.data.map(item => {
            switch (item.status) {
              case -1:
                item.statusTxt = "已取消";
                break;
              case 0:
                item.statusTxt = "未接单";
                break;
              case 1:
                item.statusTxt = "已接单";
                break;
              case 2:
                item.statusTxt = "已完成";
                break;
            }
            return item;
          });
        }else{
          _this.$dialog.alert({message:res.data.msg});
        }
      });
    },
    //接单
    receiptFun(val, id) {
      var _this = this;
      if (val == 0 || val == 1) {
        _this.$store.commit({
          type: "getOrderID",
          orderID: id
        });
        _this.$router.push({ path: "/engOrderDetails" });
      }
    },
    // 拨号
    dialFun(id) {
      console.log(id);
      var _this = this;
      var reqUrl = "/index/installer/installerCallUser";
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
.orderList {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #ededed;
  padding-top: 46px;
  .van-nav-bar {
    z-index: 99;
  }
  .van-tabs {
    margin-top: 20px;
  }
  .list {
    li {
      padding: 13px;
      background-color: #ffffff;
      position: relative;
      margin: 10px auto 10px;
      p {
        display: flex;
        font-size: 14px;
        margin-top: 6px;
        justify-content: flex-start;
        align-items: center;
        span:nth-child(1) {
          width: 80px;
          text-align: right;
        }
        span:nth-child(2) {
          width: 205px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        a {
          padding: 3px 10px;
          background-color: #f7f7f7;
          border: 1px #ebebeb solid;
          border-radius: 8px;
          color: #8fc31f;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .van-button {
        position: absolute;
        bottom: 13px;
        right: 13px;
        background-color: #f7f7f7;border:1px #ececec solid;border-radius: 6px;
      }
    }
  }
}
</style>


