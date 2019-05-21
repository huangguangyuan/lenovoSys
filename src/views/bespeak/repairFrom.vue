<template>
  <div class="repairFrom">
    <van-nav-bar title="快速维修" left-arrow fixed @click-left="onClickLeft"/>
    <van-cell-group>
      <van-field
        label="报装人"
        placeholder="请填写报装人"
        v-model="info.username"
        v-validate="'required'"
        name="username"
        :error-message="errors.first('username')"
      />
      <van-field
        label="手机号"
        placeholder="请填写手机号"
        v-model="info.phone"
        v-validate="'required|mobile'"
        name="contactPhone"
        :error-message="errors.first('contactPhone')"
      />
      <van-field
        label="区域选择"
        placeholder="请选择省、市、区县"
        readonly
        @click="selectArea"
        v-model="info.area"
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
        v-validate="'required'"
        name="address"
        :error-message="errors.first('address')"
      />
      <van-field
        label="安装地址"
        type="textarea"
        rows="1"
        autosize
        placeholder="请填写安装地址"
        v-model="info.install_address"
        v-validate="'required'"
        name="install_address"
        :error-message="errors.first('install_address')"
      />
      <van-field
        label="商品详情"
        placeholder="请选择商品"
        readonly
        @click="saveInfo();$router.push({path:'/commodityDetails'})"
        v-model="info.install_orders_id.join(',')"
        v-validate="'required'"
        name="orders_id"
        :error-message="errors.first('orders_id')"
        v-if='isShowOrderId'
      >
        <van-icon slot="icon" name="arrow"/>
      </van-field>

      <van-field
        label="故障描述"
        placeholder="故障描述"
        readonly
        @click="saveInfo();$router.push({path:'/uploader3'})"
        v-model="faultInfo.remark"
        v-validate="'required'"
        name="remark"
        :error-message="errors.first('remark')"
      >
        <van-icon slot="icon" name="arrow"/>
      </van-field>
      <van-field
        label="预约时间"
        readonly
        placeholder="请选择预约时间"
        @click="timeParameter.isShowTime = true"
        v-model="info.appoint_time"
        v-validate="'required'"
        name="appoint_time"
        :error-message="errors.first('appoint_time')"
      >
        <van-icon slot="icon" name="arrow"/>
      </van-field>
    </van-cell-group>
    <div class="btn-ground">
      <van-button type="primary" size="large" class="btn-custom" @click="validatorFun">确认</van-button>
      <!-- <van-button size="large" class="cancelBtn">取消</van-button> -->
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
    <!-- 选择时间 -->
    <van-popup v-model="timeParameter.isShowTime" position="bottom">
      <van-datetime-picker
        v-model="timeParameter.currentDate"
        type="datetime"
        :min-date="timeParameter.minDate"
        :max-date="timeParameter.maxDate"
        title="预约时间"
        @cancel="timeParameter.isShowTime = false"
        @confirm="getTime"
      />
    </van-popup>
    <!-- 选择经销商 -->
    <van-popup v-model="isShowAgent" position="bottom">
      <van-picker
        show-toolbar
        :columns="agentList"
        @change="changeAgent"
        @cancel="onCancelAgent"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 预约成功 -->
    <van-popup v-model="isShowSuccess" class="success-mask">
      <!-- <van-icon name="cross" size='30px' color='#e0e0e0' class="closeBtn" /> -->
      <van-icon name="checked" size="120px" color="#ff4e1f"/>
      <h3>预约成功</h3>
    </van-popup>
    <loading v-if="isShowloading"></loading>
  </div>
</template>
<script>
import qs from "qs";
import areaList from "@/lib/ares.js";
import loading from "@/components/loading.vue";
export default {
  name: "repairFrom",
  data() {
    return {
      isShowArea: false,
      areaList: areaList,
      isShowOrderId: true,
      timeParameter: {
        isShowTime: false,
        minHour: 10,
        maxHour: 20,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        currentDate: new Date()
      },
      isShowSuccess: false, //是否显示成功
      isShowAgent: false, //是否显示经销商列表
      isShowloading: false, //是否显示loading页
      info: {
        username: "",
        phone: "",
        province: "",
        city: "",
        area: "",
        address: "",
        areaValue: "",
        install_address: "",
        install_orders_id: [],
        packingPic: ["", "", "", ""],
        appoint_time: ""
      }, //表单信息
      agentList: []
    };
  },
  mounted() {
    var _this = this;
    if (sessionStorage.getItem("isType") == "noband") {
      _this.isShowOrderId = false;
    }
    if (JSON.stringify(_this.formInfo) != "{}") {
      _this.info = _this.formInfo;
    }
    _this.info.packingPic = _this.faultInfo.picData;
    _this.info.install_orders_id = _this.ordersId;
  },
  methods: {
    // 顶部返回按钮
    onClickLeft() {
      this.$router.push({ path: "/bespeakList" });
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
      _this.info.province = res[0].name;
      _this.info.city = res[1].name;
      for (var i = 0; i < res.length; i++) {
        _this.info.area += res[i].name;
        _this.info.area += " ";
      }
      _this.info.areaValue = res[2].code;
    },
    // 获取时间
    getTime(res) {
      var _this = this;
      _this.timeParameter.isShowTime = false;
      _this.info.appoint_time = _this.$toolFn.timeFormat(res);
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
      _this.isShowloading = true;
      var reqUrl = "/index/appointment/repare";
      var data = {
        username: this.info.username,
        phone: this.info.phone,
        province: this.info.province,
        city: this.info.city,
        area: this.info.area,
        buy_agent: "广东省深圳市福田区赛格广场店",
        buy_agent_id: 1,
        install_address: this.info.install_address,
        appoint_time: this.info.appoint_time,
        baozhuang_img1: this.info.packingPic[0],
        baozhuang_img2: this.info.packingPic[1],
        baozhuang_img3: this.info.packingPic[2],
        baozhuang_img4: this.info.packingPic[3],
        description: this.faultInfo.remark,
        address: this.info.address,
        install_orders_id: this.info.install_orders_id
      };
      _this.$http.post(reqUrl, qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          _this.isShowloading = false;
          _this.isShowSuccess = true;
          _this.emptyFun();
          setTimeout(function() {
            _this.$router.push({ path: "/bespeakDetails" });
          }, 3000);
        } else {
          _this.$dialog.alert({ message: res.data.msg });
        }
      });
    },
    // 选择经销商
    changeAgent() {
      var _this = this;
      _this.isShowAgent = true;
    },
    // 选择经销商
    onCancelAgent() {
      this.isShowAgent = false;
    },
    // 取消
    onConfirm() {
      this.isShowAgent = false;
    },
    // 监听子数据返回数据
    listData(res) {
      console.log(res);
    },
    // 跳转页面保存信息
    saveInfo() {
      this.$store.commit({
        type: "saveFromData",
        fromData: this.info
      });
    },
    // 清空数据
    emptyFun() {
      this.$store.commit({
        type: "saveFromData",
        fromData: {
          username: "",
          phone: "",
          province: "",
          city: "",
          area: "",
          address: "",
          areaValue: "",
          install_address: "",
          install_orders_id: [],
          packingPic: ["", "", "", ""],
          appoint_time: ""
        }
      });
      this.$store.commit({
        type: "getOrdersId",
        installOrdersId: []
      });
      this.$store.commit({
        type: "saveFaultInfo",
        faultInfo: {
          type: "packing",
          picData: ["", "", "", ""],
          remark: ""
        }
      });
    }
  },
  computed: {
    formInfo() {
      return this.$store.state.installMode.fromData;
    },
    faultInfo() {
      return this.$store.state.installMode.faultInfo;
    },
    ordersId() {
      return this.$store.state.installMode.installOrdersId;
    }
  },
  components: {
    loading
  }
};
</script>
<style scoped lang="scss">
.repairFrom {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #ededed;
  padding-top: 46px;
  .btn-ground {
    width: 350px;
    margin: 40px auto 0;
  }
  .cancelBtn {
    margin-top: 20px;
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


