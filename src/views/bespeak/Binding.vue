<template>
  <div class="binding">
    <!-- <van-nav-bar title="手机绑定" fixed @click-left="onClickLeft"/> -->
    <!-- <h5>绑定信息</h5> -->
    <img src="@/assets/images/logo-buoy.png" alt="" class="logo-buoy">
    <div class="bindingFrom">
      <div>
        <span>+86</span>
        <input type="text" placeholder="请输入手机号" v-model="phone">
      </div>
      <div>
        <input type="text" placeholder="请输入短信验证码" v-model="SMS">
        <p @click="getCode" class="seedCode">{{countDownTxt}}</p>
      </div>
      <van-button type="default" size="large" class="btn-custom" @click="bingFn">绑 定</van-button>
    </div>
    <div class="tips">
      <p>*预约安装和查询进度前，请首先绑定手机号。</p>
      <i>(注: 这里的手机号须与您下订单时填写的收货人手机号一致)</i>
    </div>
    <div class="footerInfo">
      全国服务热线:
      <a href="tel:4001368968">400-136-8968</a>
    </div>
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
export default {
  data() {
    return {
      phone: "",
      SMS: "",
      isClick:false,//是否已点击获取验证码
      countDownTxt:'发送验证码',
    };
  },
  mounted(){
    
  },
  methods: {
    // 返回按钮
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取验证码
    getCode() {
      var _this = this;
      if(_this.isClick){
        return false;
      }
      _this.$http
        .post("/index/applogin/getSmsCode", {
          phone: _this.phone
        })
        .then(res => {
          if (res.data.code == 200) {
            _this.isClick = true;
            _this.countDownFun();
            _this.$dialog.alert({
              title: "发送成功",
              message: "发送信息成功，请注意接收验证码~"
            });
          } else {
            _this.$dialog.alert({
              title: "发送失败",
              message: res.data.msg
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 倒计时
    countDownFun(){
      var _this = this;
      var num = 60;
      var timer = setInterval(function(){
        if(num<=0){
          clearInterval(timer);
          _this.countDownTxt = '发送验证码';
          _this.isClick = false;
          return false;
        }
        num --;
        _this.countDownTxt = num+'(s)'
      },1000);
    },
    // 绑定
    bingFn() {
      var _this = this;
      var reqUrl = "/index/applogin/login";
      var data = {
        phone: _this.phone,
        code: _this.SMS
      };
      _this.$http
        .post(reqUrl, data)
        .then(res => {
          if (res.data.code == 200) {
            sessionStorage.setItem("isType", res.data.data.user_type);
            _this.$dialog
              .alert({
                title: "提 示",
                message: "绑定成功！"
              })
              .then(res => {
                _this.$router.push({path:'/bespeakList'});
              });
          }else{
            _this.$dialog.alert({
              title: "绑定失败",
              message: res.data.msg
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.binding {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 14px;
  background-color: #ededed;
  .logo-buoy{
    display: block;
  }
  h5 {
    font-size: 19px;
    font-weight: 500;
  }
  .bindingFrom {
    margin: 20px auto 0;
    div {
      display: flex;
      height: 51px;
      background-color: #ffffff;
      border-radius: 6px;
      width: 330px;
      align-items: center;
      margin: 20px auto 0;
      span {
        width: 50px;
        height: 40px;
        font-size: 16px;
        text-align: center;
        display: block;
        box-sizing: border-box;
        border-right: 1px #e0e0e0 solid;
        line-height: 40px;
      }
      input {
        width: 280px;
        font-size: 16px;
        height: 40px;
        border: 0;
        display: block;
        box-sizing: border-box;
        padding: 0 10px;
      }
      p {
        width: 130px;
        height: 40px;
        font-size: 16px;
        text-align: center;
        box-sizing: border-box;
        border-left: 1px #e0e0e0 solid;
        line-height: 40px;
        font-size: 14px;
      }
    }
    .btn-custom {
      margin-top: 30px;
      display: block;
    }
  }
  .tips {
    margin: 60px auto 0;
    p {
      font-size: 14px;
      color: #fb2812;
    }
    i {
      display: block;
      font-size: 12px;
      color: #808080;
      margin-top: 5px;
    }
  }
  .footerInfo {
    position: fixed;
    width: 100%;
    text-align: center;
    font-size: 12px;
    bottom: 20px;
    left: 0;
    color: #808080;
    a {
      color: #fb2812;
    }
  }
}
</style>


