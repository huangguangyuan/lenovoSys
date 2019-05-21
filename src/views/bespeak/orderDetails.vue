<template>
  <div class="orderDetails">
    <van-nav-bar title="预约详情" fixed border left-arrow @click-left="onClickLeft" />
    <div class="banner">
      未完成
    </div>
    <div class="message">
      <p>
        <span>客户姓名：</span>
        <span>{{username}}</span>
      </p>
      <p>
        <span>电 话：</span>
        <span>{{phone}}</span>
      </p>
      <p v-if='goods_name'>
        <span>产品名：</span>
        <span>{{goods_name}}</span>
      </p>
      <p v-if='goods_color'>
        <span>颜 色：</span>
        <span>{{goods_color}}</span>
      </p>
      <p v-if='pro_size'>
        <span>型 号：</span>
        <span>{{pro_size}}</span>
      </p>
      <!-- <p>
        <span>配 件：</span>
        <span>{{peijian}}</span>
      </p> -->
      <!-- <p>
        <span>订单号：</span>
        <span>{{orders_id}}</span>
      </p> -->
      <p>
        <span>订单时间：</span>
        <span>{{appoint_time}}</span>
      </p>
      <p>
        <span>收货地址：</span>
        <span>{{install_address}}</span>
      </p>
      <div class="modifyTime">
          <van-button type="primary" size='small' class="btn-custom" @click='timeParameter.isShowTime=true'>修改时间</van-button>
      </div>
    </div>
    <h4 v-if='baozhuang_imgArr[0]'>包装图片</h4>
    <div class="remarks" v-if='baozhuang_imgArr[0]'>
      <img :src="baozhuang_imgArr[0]" alt="" v-if='baozhuang_imgArr[0]'>
      <img :src="baozhuang_imgArr[1]" alt="" v-if='baozhuang_imgArr[1]'>
      <img :src="baozhuang_imgArr[2]" alt="" v-if='baozhuang_imgArr[2]'>
      <img :src="baozhuang_imgArr[3]" alt="" v-if='baozhuang_imgArr[3]'>
    </div>
    <h3 v-if='baozhuang_beizhu'>包装图片备注：{{baozhuang_beizhu}}</h3>
    <h4 v-if='huanjing_imgArr[0]'>环境图片</h4>
    <div class="remarks" v-if='huanjing_imgArr[0]'>
      <img :src="huanjing_imgArr[0]" alt="" v-if='huanjing_imgArr[0]'>
      <img :src="huanjing_imgArr[1]" alt="" v-if='huanjing_imgArr[1]'>
      <img :src="huanjing_imgArr[2]" alt="" v-if='huanjing_imgArr[2]'>
      <img :src="huanjing_imgArr[3]" alt="" v-if='huanjing_imgArr[3]'>
    </div>
    <h3 v-if='huanjing_beizhu'>包装图片备注：{{huanjing_beizhu}}</h3>
    <!-- 成功 -->
    <van-popup v-model="isShowSuccess" class="success-mask" @click='isShowSuccess = false'>
      <van-icon name="checked" size="120px" color="#ff4e1f"/>
      <h3>接单成功，请准时赴约</h3>
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
  </div>
</template>
<script>
export default {
  name: "orderDetails",
  data() {
    return {
      isShowSuccess:false,//是否显示成功
      username:"",
      phone:"",
      orders_id:"",
      appoint_time:"",
      new_appoint_time:"",
      install_address:"",
      goods_name:"",
      goods_color:"",
      peijian:"",
      orders_status:"",
      pro_size:'',
      baozhuang_imgArr:['','','',''],
      huanjing_imgArr:['','','',''],
      timeParameter: {
        isShowTime: false,
        minHour: 10,
        maxHour: 20,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        currentDate: new Date()
      },
      baozhuang_beizhu:'',
      huanjing_beizhu:'',

    };
  },
  mounted(){
    this.getOrderInfo();
  },
  methods:{
    // 返回
    onClickLeft(){
      this.$router.push({path:'/bespeakDetails'});
    },
    // 获取订单信息
    getOrderInfo(){
      var _this = this;
      var reqUrl = '/index/appointment/myOrderDetail';
      var data = {oid:_this.orderID}
      _this.$http.post(reqUrl,data).then(res => {
        _this.username = res.data.data.username;
        _this.phone = res.data.data.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
        _this.goods_name = res.data.data.goods_name;
        _this.goods_color = res.data.data.color;
        _this.pro_size = res.data.data.pro_size;
        _this.appoint_time = res.data.data.appoint_time;
        _this.install_address = res.data.data.install_address;
        if(res.data.data.hasOwnProperty('baozhuang_img1')){
          _this.baozhuang_imgArr[0] = res.data.data.baozhuang_img1==''?'':'http://'+res.data.data.baozhuang_img1.slice(13)
          _this.baozhuang_imgArr[1] = res.data.data.baozhuang_img2==''?'':'http://'+res.data.data.baozhuang_img2.slice(13)
          _this.baozhuang_imgArr[2] = res.data.data.baozhuang_img3==''?'':'http://'+res.data.data.baozhuang_img3.slice(13)
          _this.baozhuang_imgArr[3] = res.data.data.baozhuang_img4==''?'':'http://'+res.data.data.baozhuang_img4.slice(13)
          _this.huanjing_imgArr[0] = res.data.data.huanjing_img1==""?'':'http://'+res.data.data.huanjing_img1.slice(13)
          _this.huanjing_imgArr[1] = res.data.data.huanjing_img2==""?'':'http://'+res.data.data.huanjing_img2.slice(13)
          _this.huanjing_imgArr[2] = res.data.data.huanjing_img3==""?'':'http://'+res.data.data.huanjing_img3.slice(13)
          _this.huanjing_imgArr[3] = res.data.data.huanjing_img4==""?'':'http://'+res.data.data.huanjing_img4.slice(13)
          _this.baozhuang_beizhu = res.data.data.baozhuang_beizhu
          _this.huanjing_beizhu = res.data.data.huanjing_beizhu
        }
        
      })
    },
    // 获取时间
    getTime(res) {
      var _this = this;
      _this.timeParameter.isShowTime = false;
      _this.appoint_time = _this.$toolFn.timeFormat(res);
      var reqUrl = '/index/appointment/resetInstallTime';
      var data = {
          id:_this.orderID,
          appoint_time:res
      }
      _this.$http.post(reqUrl,data).then(res => {
          _this.$dialog.alert({
            message: res.data.data
          });
      })
    },
  },
  computed:{
    orderID(){
      return this.$store.state.installMode.orderID;
    }
  }
};
</script>

<style scoped lang="scss">
.orderDetails{
    position: absolute;width: 100%;top:0;left: 0;box-sizing: border-box;background-color: #ededed;padding-top:46px;padding-bottom: 50px;min-height: 100vh;
    .banner{width: 375px;height: 75px;margin: 0 auto;background-color: #ff9600;text-align: center;font-size: 25px;color: #ffffff;
    line-height: 75px;}
    .message{
      width: 375px;box-sizing: border-box;padding: 20px 13px;border-top:2px #f0f0f0 solid;border-bottom:2px #f0f0f0 solid;
      margin-top: 10px;background-color: #ffffff;position: relative;
      p{
        display: flex;margin: 3px auto;justify-content: flex-start;
        span{font-size: 14px;}
        span:nth-child(1){width: 70px;;text-align: right;}
        span:nth-child(2){width: 205px;box-sizing: border-box;}
      }
      .modifyTime{position: absolute;bottom: 20px;right: 20px;}
    }
    h3{
      padding:0 13px;font-size: 16px;margin-top: 10px;font-weight: 500;
    }
    h4 {
        padding:0 13px;font-size: 16px;margin-top: 10px;font-weight: 500;
      }
    .remarks{
      width: 375px;box-sizing: border-box;padding: 20px 13px;border-top:2px #f0f0f0 solid;border-bottom:2px #f0f0f0 solid;
      margin-top: 10px;background-color: #ffffff;display: flex;flex-flow: wrap;justify-content: space-between;
      img{width: 160px;height: 160px;border-radius: 8px;margin: 2px 2px 10px;}
      p{flex: 1;width: 375px;}
    }
    .footer{
      width: 375px;height: 50px;position: fixed;left: 50%;margin-left: -187.5px;bottom: 0;background-color: #ffffff;display: flex;
      .item{
        flex: 1;display: flex;flex-direction: column;font-size: 12px;color: #fb2812;justify-content: center;align-items: center;;
      }
      .already{
        color: #cccccc;
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


