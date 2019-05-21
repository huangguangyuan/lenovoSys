<template>
  <div class="installForm">
    <van-nav-bar title="安装管理" left-arrow fixed @click-left="onClickLeft"/>
    <van-cell-group>
      <van-field
        label="S N 码"
        placeholder="请填写SN码"
        v-model="info.sn"
        left-icon="graphic"
        v-validate="'required'"
        name="sn"
        :error-message="errors.first('sn')"
      />
      <van-field
        label="姓 名"
        placeholder="请填写客户姓名"
        v-model="info.username"
        left-icon="user-o"
        v-validate="'required'"
        name="username"
        :error-message="errors.first('username')"
      />
      <van-field
        label="手  机"
        placeholder="请填写客户手机号"
        v-model="info.userphone"
        left-icon="phone-o"
        v-validate="'required|mobile'"
        name="userphone"
        :error-message="errors.first('userphone')"
      />
      <van-field
        label="辖  区"
        placeholder="请选择省、市、区县"
        readonly
        @click="selectArea"
        v-model="info.area"
        left-icon="hotel-o"
        v-validate="'required'"
        name="area"
        :error-message="errors.first('area')"
      >
        <van-icon slot="icon" name="arrow"/>
      </van-field>
      <van-field
        label="详细地址"
        type="textarea"
        rows="1"
        autosize
        placeholder="请填写详细地址"
        v-model="info.address"
        left-icon="location-o"
        v-validate="'required'"
        name="address"
        :error-message="errors.first('address')"
      />
    </van-cell-group>
    <div class="btn-ground">
      <van-button
        type="primary"
        size="large"
        :class="[isFillIn?'btn-custom':'btn-gray']"
        @click="validatorFun"
      >确认</van-button>
    </div>
    <!-- 选择省、市、区 -->
    <van-popup v-model="isShowArea" position="bottom">
      <van-area
        :area-list="areaList"
        :value="info.areaValue"
        title="区域选择"
        @confirm="getArea"
        @cancel="isShowArea = false"
      />
    </van-popup>
    <!-- 预约成功 -->
    <van-popup v-model="isShowSuccess" class="success-mask">
      <!-- <van-icon name="cross" size='30px' color='#e0e0e0' class="closeBtn" /> -->
      <!-- <van-icon name="checked" size='60px' color='#ff4e1f' /> -->
      <h3>已完成安装</h3>
      <van-button
        type="primary"
        class="btn-custom"
        @click="isShowSuccess = false"
        style="margin-top:20px;"
      >客户确认完成</van-button>
    </van-popup>
  </div>
</template>
<script>
import qs from "qs";
import areaList from "@/lib/ares.js";
export default {
  data() {
    return {
      isShowArea: false,
      areaList: areaList,
      isShowSuccess: false, //是否显示成功
      info: {
        sn: "",
        username: "",
        userphone: "",
        area: "",
        address: ""
      } //表单信息
    };
  },
  mounted() {
    var _this = this;
  },
  methods: {
    // 顶部返回按钮
    onClickLeft() {
      this.$router.go(-1);
    },
    // 选择省市区
    selectArea() {
      var _this = this;
      _this.isShowArea = true;
    },
    // 获取地区
    getArea(res) {
      var _this = this;
      _this.isShowArea = false;
      _this.info.area = "";
      for (var i = 0; i < res.length; i++) {
        _this.info.area += res[i].name;
        _this.info.area += " ";
      }
    },
    // 校验数据
    validatorFun() {
      var _this = this;
      _this.$validator.validateAll().then(result => {
        if (result) {
          //axios提交
          _this.submitFn();
        }
      });
    },
    // 提交表单
    submitFn() {
      var _this = this;
      var reqUrl = "/index/installer/finishOrder";
      var data = {
        oid: _this.orderID,
        door_img1: _this.uploadImg.beforeImg,
        door_img2: _this.uploadImg.afterImg,
        code_img: _this.uploadImg.codeImg,
        sn: _this.info.sn,
        username: _this.info.username,
        userphone: _this.info.userphone,
        area: _this.info.area,
        address: _this.info.address
      };
      _this.$http.post(reqUrl, qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          _this.isShowSuccess = true;
          setTimeout(function() {
            _this.$router.push({ path: "/orderList" });
          }, 3000);
        } else {
          _this.$dialog.alert({ message: res.data.msg });
        }
      });
    }
  },
  computed: {
    //获取上传的图片
    uploadImg() {
      return this.$store.state.orderModule.uploadImg;
    },
    //获取订单ID号
    orderID() {
      return this.$store.state.orderModule.orderID;
    },
    isFillIn() {
      var isFillIn;
      if (
        this.info.sn != "" &&
        this.info.username != "" &&
        this.info.userphone != "" &&
        this.info.area != "" &&
        this.info.address != ""
      ) {
        isFillIn = true;
      } else {
        isFillIn = false;
      }
      return isFillIn;
    }
  }
};
</script>
<style scoped lang="scss">
.installForm {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #ededed;
  padding-top: 46px;
  .btn-ground {
    width: 350px;
    margin: 40px auto 0;
  }
  .btn-gray {
    background-color: #cccccc;
    border: 1px #cccccc solid;
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






