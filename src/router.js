import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    // /* ================================================*//
    // <=====================预约安装========================>
    // /* ================================================*//
    // 绑定账号
    {
      path:'/bespeakBinding',
      name:'bespeakBinding',
      meta:{
        index:1,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/Binding.vue')
    },
    // 快速预约
    {
      path:'/bespeakList',
      name:'bespeakList',
      meta:{
        index:2,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/bespeakList.vue')
    },
    // 快速预约/报装（表单）
    {
      path:'/bespeakFrom',
      name:'bespeakFrom',
      meta:{
        index:3,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/bespeakFrom.vue')
    },
    // 快速预约/报装2（表单）
    {
      path:'/bespeakFrom2',
      name:'bespeakFrom2',
      meta:{
        index:3,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/bespeakFrom2.vue')
    },
    // 维修预约表单
    {
      path:'/repairFrom',
      name:'repairFrom',
      meta:{
        index:3,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/repairFrom.vue')
    },
    // 商品详情
    {
      path:'/commodityDetails',
      name:'commodityDetails',
      meta:{
        index:4,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/commodityDetails.vue')
    },
    // 预约详情
    {
      path:'/bespeakDetails',
      name:'bespeakDetails',
      meta:{
        index:4,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/bespeakDetails.vue')
    },
    // 图片上传
    {
      path:'/uploader',
      name:'uploader',
      meta:{
        index:4,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/uploader.vue')
    },
    // 图片上传
    {
      path:'/uploader2',
      name:'uploader2',
      meta:{
        index:4,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/uploader2.vue')
    },
    // 图片上传
    {
      path:'/uploader3',
      name:'uploader3',
      meta:{
        index:4,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/uploader3.vue')
    },
    // 图片上传
    {
      path:'/evaluateFrom',
      name:'evaluateFrom',
      meta:{
        index:5,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/evaluateFrom.vue')
    },
    // 预约详情
    {
      path:'/orderDetails',
      name:'orderDetails',
      meta:{
        index:5,
        title:'快速预约'
      },
      component: () => import('./views/bespeak/orderDetails.vue')
    },
    // /* ===================================================*//
    // <=====================工程师接单========================>
    // /* ===================================================*//
    // 绑定账号
    {
      path:'/engineerBinding',
      name:'engineerBinding',
      meta:{
        index:1,
        title:'安装管理'
      },
      component: () => import('./views/engineer/Binding.vue')
    },
    // 订单列表
    {
      path:'/orderList',
      name:'orderList',
      meta:{
        index:1,
        title:'安装管理'
      },
      component: () => import('./views/engineer/orderList.vue')
    },
    // 订单详情
    {
      path:'/engOrderDetails',
      name:'engOrderDetails',
      meta:{
        index:2,
        title:'安装管理'
      },
      component: () => import('./views/engineer/engOrderDetails.vue')
    },
    // 安装上传图片
    {
      path:'/installUploader',
      name:'installUploader',
      meta:{
        index:3,
        title:'安装管理'
      },
      component: () => import('./views/engineer/installUploader.vue')
    },
    // 维修上传图片
    {
      path:'/repairUploader',
      name:'repairUploader',
      meta:{
        index:4,
        title:'安装管理'
      },
      component: () => import('./views/engineer/repairUploader.vue')
    },
    // 安装完成表单
    {
      path:'/installForm',
      name:'installForm',
      meta:{
        index:4,
        title:'安装管理'
      },
      component: () => import('./views/engineer/installForm.vue')
    },
    // 未安装完成表单
    {
      path:'/noFinish',
      name:'noFinish',
      meta:{
        index:4,
        title:'安装管理'
      },
      component: () => import('./views/engineer/noFinish.vue')
    }

  ]
});


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
