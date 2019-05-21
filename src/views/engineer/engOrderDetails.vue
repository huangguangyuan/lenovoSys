z<template>
  <div class="orderDetails">
    <van-nav-bar title="订单详情" fixed border left-arrow @click-left="onClickLeft" />
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
        <span>产品型号：</span>
        <span>{{goods_name}}</span>
      </p>
      <p v-if='goods_color'>
        <span>颜 色：</span>
        <span>{{goods_color}}</span>
      </p>
      <p v-if='peijian'>
        <span>配 件：</span>
        <span>{{peijian}}</span>
      </p>
      <p>
        <span>订单号：</span>
        <span>{{orders_id}}</span>
      </p>
      <p>
        <span>订单时间：</span>
        <span>{{appoint_time}}</span>
      </p>
      <p>
        <span>收货地址：</span>
        <span>{{install_address}}</span>
      </p>
    </div>
    <h3 v-if="baozhuang_beizhu">包装图片备注：{{baozhuang_beizhu}}</h3>
    <h4 v-if='baozhuang_imgArr[0]'>包装图片：</h4>
    <div class="remarks" v-if='baozhuang_imgArr[0]'>
      <img :src="baozhuang_imgArr[0]" alt="" v-if='baozhuang_imgArr[0]'>
      <img :src="baozhuang_imgArr[1]" alt="" v-if='baozhuang_imgArr[1]'>
      <img :src="baozhuang_imgArr[2]" alt="" v-if='baozhuang_imgArr[2]'>
      <img :src="baozhuang_imgArr[3]" alt="" v-if='baozhuang_imgArr[3]'>
    </div>
    <h3 v-if="huanjing_beizhu">包装图片备注：{{huanjing_beizhu}}</h3>
    <h4 v-if='huanjing_imgArr[0]'>环境图片：</h4>
    <div class="remarks" v-if='huanjing_imgArr[0]'>
      <img :src="huanjing_imgArr[0]" alt="" v-if='huanjing_imgArr[0]'>
      <img :src="huanjing_imgArr[1]" alt="" v-if='huanjing_imgArr[1]'>
      <img :src="huanjing_imgArr[2]" alt="" v-if='huanjing_imgArr[2]'>
      <img :src="huanjing_imgArr[3]" alt="" v-if='huanjing_imgArr[3]'>
    </div>
    <div class="footer">
      <div :class="[orders_status >= 1?'already':'','item']" @click='receiptFun'>
        <van-icon name="sign" size='22px' />
        <span>确认接单</span>
      </div>
      <div class="item" @click='completeFun'>
        <van-icon name="completed" size='22px' />
        <span>完成安装</span>
      </div>
      <div class="item">
        <van-icon name="underway" size='22px' @click='noCompleteFun' />
        <span>未完成</span>
      </div>
    </div>
    <!-- 成功 -->
    <van-popup v-model="isShowSuccess" class="success-mask" @click='isShowSuccess = false'>
      <van-icon name="checked" size="120px" color="#ff4e1f"/>
      <h3>接单成功，请准时赴约</h3>
    </van-popup>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  name: "orderDetails",
  data() {
    return {
      isShowSuccess:false,//是否显示成功
      installType:'',//预约类型
      username:"",
      phone:"",
      orders_id:"",
      appoint_time:"",
      install_address:"",
      goods_name:"",
      goods_color:"",
      peijian:"",
      orders_status:"",
      baozhuang_beizhu:"",
      huanjing_beizhu:"",
      baozhuang_imgArr:['','','',''],
      huanjing_imgArr:['','','',''],
    };
  },
  mounted(){
    this.getOrderInfo();
  },
  methods:{
    // 返回
    onClickLeft(){
      this.$router.go(-1);
    },
    // 获取订单信息
    getOrderInfo(){
      var _this = this;
      var reqUrl = '/index/installer/ordersDetail';
      var data = {oid:_this.orderID}
      _this.$http.post(reqUrl,data).then(res => {
        console.log(res);
        _this.username = res.data.data.username,
        _this.phone = res.data.data.phone.substring(0,3)+"****"+res.data.data.phone.substring(8,11),
        _this.orders_id = res.data.data.orders_id;
        _this.appoint_time = res.data.data.appoint_time;
        _this.install_address = res.data.data.install_address;
        _this.goods_name = res.data.data.goods_name;
        _this.goods_color = res.data.data.goods_color;
        _this.peijian = res.data.data.peijian;
        _this.orders_status = res.data.data.orders_status;
        _this.installType = res.data.data.install_type;
        if(res.data.data.hasOwnProperty('baozhuang_img1')){
          _this.baozhuang_imgArr[0] = res.data.data.baozhuang_img1==''?'':'http://'+res.data.data.baozhuang_img1.slice(13)
          _this.baozhuang_imgArr[1] = res.data.data.baozhuang_img2==''?'':'http://'+res.data.data.baozhuang_img2.slice(13)
          _this.baozhuang_imgArr[2] = res.data.data.baozhuang_img3==''?'':'http://'+res.data.data.baozhuang_img3.slice(13)
          _this.baozhuang_imgArr[3] = res.data.data.baozhuang_img4==''?'':'http://'+res.data.data.baozhuang_img4.slice(13)
          _this.huanjing_imgArr[0] = res.data.data.huanjing_img1==""?'':'http://'+res.data.data.huanjing_img1.slice(13)
          _this.huanjing_imgArr[1] = res.data.data.huanjing_img2==""?'':'http://'+res.data.data.huanjing_img2.slice(13)
          _this.huanjing_imgArr[2] = res.data.data.huanjing_img3==""?'':'http://'+res.data.data.huanjing_img3.slice(13)
          _this.huanjing_imgArr[3] = res.data.data.huanjing_img4==""?'':'http://'+res.data.data.huanjing_img4.slice(13)
          _this.baozhuang_beizhu = res.data.data.baozhuang_beizhu;
          _this.huanjing_beizhu = res.data.data.huanjing_beizhu;
        }
      })
    },
    // 接单
    receiptFun(){
      var _this = this;
      if(_this.orders_status>=1){
        _this.$dialog.alert({
          title:'提 示',
          message:'该订单已接~'
        });
        return false;
      }
      var reqUrl = '/index/installer/jiedan';
      var data = {oid:_this.orderID}
      _this.$http.post(reqUrl,data).then(res => {
        _this.isShowSuccess = true;
        setTimeout(function(){
          _this.$router.push({path:'/orderList'});
        },3000);
      })
    },
    // 完成接单
    completeFun(){
      var _this = this;
      if(_this.installType == 1){
        _this.$router.push({path:'/installUploader'});
      }else if(_this.installType == 2){
        _this.$router.push({path:'/repairUploader'});
      }
    },
    // 未完成
    noCompleteFun(){
      var _this = this;
      _this.$router.push({path:'/noFinish'});
    }
  },
  computed:{
    orderID(){
      return this.$store.state.orderModule.orderID;
    }
  }
};
</script>

<style scoped lang="scss">
.orderDetails{
    position: absolute;width: 100%;top:0;left: 0;box-sizing: border-box;background-color: #ededed;padding-top:46px;padding-bottom: 60px;min-height: 100vh;
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


