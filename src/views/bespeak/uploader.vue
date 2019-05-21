<template>
  <div class="uploader">
    <van-nav-bar title="包装图片" left-arrow fixed @click-left="onClickLeft"/>
    <ul class="picture-list">
      <li v-for="(item, index) in pictureSrc" :key="index">
        <van-uploader :name="item.num" :after-read="onRead">
          <van-icon name="photograph" color="#d8d7d7"/>
          <p>{{item.txt}}</p>
        </van-uploader>
        <img :src="item.src" alt v-show="item.isShow">
        <van-icon name="clear" class="my-clear" v-show="item.isShow" @click='clearFun(item)' />
      </li>
    </ul>
    <!-- 备注 -->
    <div class="remarks">
      <van-field
        label="备注："
        type="textarea"
        placeholder="门锁故障、锁体、侧面板、门扣"
        rows="1"
        autosize
        v-model="infoData.remark"
      />
    </div>
    <div class="btn-ground">
      <van-button type="primary" size="large" class="btn-custom" @click="saveFun">保 存</van-button>
    </div>
  </div>
</template>
<script>
import lrz from 'lrz';
export default {
  name: "uploader",
  data() {
    return {
      pictureSrc: [
        { num: "0", src: "", isShow: false,txt:'原门锁，门前照片' },
        { num: "1", src: "", isShow: false,txt:'原门锁，门后照片' },
        { num: "2", src: "", isShow: false,txt:'原门锁，门前照片' },
        { num: "3", src: "", isShow: false,txt:'原门锁，门后照片' }
      ],
      infoData: {
        type: "packing",
        picData: ["", "", "", ""],
        remark: ""
      }
    };
  },
  mounted(){
      var _this = this;
      console.log(_this.packingInfo);
      _this.initializationFun();
  },
  methods: {
    // 初始化
    initializationFun(){
      for(var i = 0;i<this.pictureSrc.length;i++){
        this.pictureSrc[i].src = this.packingInfo.picData[i];
        this.infoData.picData[i] = this.packingInfo.picData[i];
        if(this.pictureSrc[i].src != ''){
          this.pictureSrc[i].isShow = true;
        }
      }
      this.infoData.remark = this.packingInfo.remark;
    },
    // 读取图片
    onRead(file, detail) {
      var _this = this;
      _this.runAsync(file.content).then(res => {
        _this.pictureSrc[parseInt(detail.name)].src = res.base64;
        _this.pictureSrc[parseInt(detail.name)].isShow = true;
        _this.infoData.picData[parseInt(detail.name)] = res.base64;
      });
    },
    // 异步获取返回压缩后的图片
    runAsync(fileData) {
      var p = new Promise((resolve, reject) => {
        resolve(lrz(fileData, { width: 340, quality: 0.6 }));
      });
      return p;
    },
    // 保存图片
    saveFun() {
      var _this = this;
      if(_this.infoData.picData[0] == "" && _this.infoData.picData[2] == ""){
        _this.$dialog.alert({message:'请上传：原门锁，门前照片'});
        return false;
      }else if(_this.infoData.picData[1] == "" && _this.infoData.picData[3] == ""){
        _this.$dialog.alert({message:'请上传：原门锁，门后照片'});
        return false;
      }else if(_this.infoData.remark == ""){
        _this.$dialog.alert({message:'请填写备注'});
        return false;
      }
      _this.$store.commit({
        type: "saveParkingInfo",
        parkingInfo: _this.infoData
      });
      _this.$router.push({ path: "/bespeakFrom2" });
    },
    // 清除图片
    clearFun(res){
      var _this = this;
      _this.pictureSrc[parseInt(res.num)].src = '';
      _this.pictureSrc[parseInt(res.num)].isShow = false;
      _this.infoData.picData[parseInt(res.num)] = '';
    },
    // 顶部返回按钮
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  computed: {
    packingInfo() {
      return this.$store.state.installMode.parkingInfo;
    }
  }
};
</script>

<style scoped lang="scss">
.uploader {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #ededed;
  padding-top: 46px;
  .picture-list {
    width: 350px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;
    li {
      width: 170px;
      height: 170px;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px #ededed solid;
      background-color: #ffffff;
      margin-top: 10px;
      text-align: center;
      position: relative;
      p {
        text-align: center;
        font-size: 16px;
        color: #d8d7d7;
        margin-top: 5px;
      }
      img {
        position: absolute;
        width: 170px;
        height: 170px;
        border-radius: 10px;
        background-color: #ffffff;
      }
      .my-clear{position: absolute;top:0px;right: 0;z-index: 3;color: #ff8181;}
    }
  }
  .remarks {
    padding: 0 13px;
    border-top: 1px #e0e0e0 solid;
    border-bottom: 1px #e0e0e0 solid;
    background-color: #ffffff;
    margin-top: 20px;
  }
  .btn-ground {
    width: 350px;
    margin: 40px auto 0;
    .cancelBtn {
      margin-top: 20px;
    }
  }
}
</style>





