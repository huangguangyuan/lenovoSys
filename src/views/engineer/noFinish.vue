z<template>
  <div class="noFinish">
    <van-nav-bar title="安装管理" fixed border left-arrow @click-left="onClickLeft"/>
    <div class="banner">未完成</div>
    <div class="describe">
      <van-field v-model="describe" type="textarea" placeholder="问题描述" rows="4" autosize/>
    </div>
    <div class="content-wrap">
      <div class="container">
        <van-uploader :after-read="onRead1">
          <van-icon name="photograph" color="#d8d7d7" size="22px"/>
          <p>添加包装图片</p>
        </van-uploader>
        <img :src="imgSrc1" alt v-show="isShowImg1">
        <van-icon name="clear" class="my-clear" v-show="isShowImg1" @click='clearFun(1)' />
      </div>
      <div class="container">
        <van-uploader :after-read="onRead2">
          <van-icon name="photograph" color="#d8d7d7" size="22px"/>
          <p>添加包装图片</p>
        </van-uploader>
        <img :src="imgSrc2" alt v-show="isShowImg2">
        <van-icon name="clear" class="my-clear" v-show="isShowImg2" @click='clearFun(2)' />
      </div>
    </div>
    <div class="btn-wrap">
      <van-button type="default" class="btn-custom" size="large" @click="confirmFun">确认提交</van-button>
    </div>
    <!-- 成功 -->
    <van-popup v-model="isShowSuccess" class="success-mask" @click="isShowSuccess = false">
      <van-icon name="checked" size="120px" color="#ff4e1f"/>
      <h3>接单成功，请准时赴约</h3>
    </van-popup>
  </div>
</template>
<script>
import lrz from "lrz";
export default {
  name: "noFinish",
  data() {
    return {
      isShowSuccess: false, //是否显示成功
      describe: "",
      imgSrc1: "",
      imgSrc2: "",
      isShowImg1: false,
      isShowImg2: false,
      
    };
  },
  mounted() {},
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 上传图片1
    onRead1(file, detail) {
      var _this = this;
      _this.runAsync(file.content).then(res => {
        _this.imgSrc1 = res.base64;
        _this.isShowImg1 = true;
      });
    },
    // 上传图片2
    onRead2(file, detail) {
      var _this = this;
      _this.runAsync(file.content).then(res => {
        _this.imgSrc2 = res.base64;
        _this.isShowImg2 = true;
      });
    },
    // 异步获取返回压缩后的图片
    runAsync(fileData) {
      var p = new Promise((resolve, reject) => {
        resolve(lrz(fileData, { width: 340, quality: 0.6 }));
      });
      return p;
    },
    // 确认提交
    confirmFun() {
      var _this = this;
      var reqUrl = "/index/installer/unFinishOrder";
      var data = {
        oid: _this.orderID,
        describe: _this.describe,
        unfinish_img1: _this.imgSrc1,
        unfinish_img2: _this.imgSrc2
      };
      _this.$http.post(reqUrl, data).then(res => {
        if (res.data.code == 200) {
          _this.$dialog.alert({ message: "提交成功~" }).then(()=>{
            _this.$router.push({path:'/orderList'});
          });
        }
      });
    },
    // 清除图片
    clearFun(res) {
      var _this = this;
      if(res == 1){
        _this.imgSrc1 = '';
        _this.isShowImg1 = false;
      }else if(res == 2){
        _this.imgSrc2 = '';
        _this.isShowImg2 = false;
      }
    }
  },
  computed: {
    orderID() {
      return this.$store.state.orderModule.orderID;
    }
  }
};
</script>

<style scoped lang="scss">
.noFinish {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #ededed;
  padding-top: 46px;
  padding-bottom: 50px;
  min-height: 100vh;
  .banner {
    width: 375px;
    height: 75px;
    margin: 0 auto;
    background-color: #ff9600;
    text-align: center;
    font-size: 25px;
    color: #ffffff;
    line-height: 75px;
  }
  .describe {
    margin-top: 15px;
  }
  .content-wrap {
    width: 350px;
    display: flex;
    justify-content: space-around;
    margin: 20px auto 0;
    .container {
      width: 140px;
      height: 140px;
      box-sizing: border-box;
      border-radius: 8px;
      background-color: #f7f7f7;
      border: 1px #e1e1e1 solid;
      margin-top: 10px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #e0e0e0;
      text-align: center;
      margin-bottom: 10px;
      font-size: 14px;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 8px;
      }
      .my-clear{position: absolute;top:0px;right: 0;z-index: 3;color: #ff8181;font-size: 23px;}
    }
  }
  .btn-wrap {
    width: 350px;
    margin: 30px auto 20px;
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


