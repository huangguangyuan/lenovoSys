import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 安装预约
let installMode = {
  state: {
    orderID:0,//订单ID号
    orderDetailsID:0,
    installOrdersId: [],//商品订到号ID
    fromData: {},//快速报装信息
    parkingInfo: {
      type: 'packing',
      picData: ['', '', '', ''],
      remark: ''
    },//包装图片信息
    installInfo: {
      type: 'packing',
      picData: ['', '', '', ''],
      remark: '',
      long:'',
      wide:''
    },//安装环境图片信息
    faultInfo: {
      type: 'packing',
      picData: ['', '', '', ''],
      remark: ''
    },//故障图片信息
    evaluateInfo:{}//评价信息
  },
  mutations: {
    getOrdersId(state, payload) {
      state.installOrdersId = payload.installOrdersId;
    },
    saveFromData(state, payload) {
      state.fromData = payload.fromData;
    },
    // 保存上传的图片
    saveParkingInfo(state, payload) {
      state.parkingInfo = payload.parkingInfo
    },
    // 保存上传安装的图片
    saveInstallInfo(state, payload) {
      state.installInfo = payload.installInfo
    },
    // 保存上传故障的图片
    saveFaultInfo(state, payload) {
      state.faultInfo = payload.faultInfo
    },
    saveEvaluateInfo(state, payload){
      state.evaluateInfo = payload.evaluateInfo
    },
    getOrderID(state, payload){
      state.orderID = payload.orderID;
      state.orderDetailsID = payload.orderDetailsID;
    },
  }
}
// 工程师接单
let orderModule = {
  state:{
    orderID:0,//订单ID号
    uploadImg:{
      beforeImg:'',
      afterImg:'',
      codeImg:''
    }//上传图片
  },
  mutations:{
    getOrderID(state, payload){
      state.orderID = payload.orderID;
    },
    // 保存上传图片
    saveUploadImg(state, payload){
      state.uploadImg = payload.uploadImg
    }
  }
}
export default new Vuex.Store({
  modules: {
    installMode,
    orderModule
  }
})
