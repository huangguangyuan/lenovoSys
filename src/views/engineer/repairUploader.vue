<template>
    <div class="repairUploader">
        <van-nav-bar title="安装管理" left-arrow fixed @click-left="onClickLeft"/>
        <div class="upload-wrap">
            <h5>上传智能门全景照片</h5>
            <p>（示例图片）</p>
            <div class="content-wrap">
                <div class="container">
                    <van-uploader :after-read="onReadBefore">
                        <van-icon name="photograph" color="#d8d7d7" />
                        <p>添加包装图片</p>
                    </van-uploader>
                    <img :src="beforeSrc" alt="" v-show='isShowBeforeImg'>
                </div>
                <div class="container">
                    <van-uploader :after-read="onReadAfter">
                        <van-icon name="photograph" color="#d8d7d7" />
                        <p>添加包装图片</p>
                    </van-uploader>
                    <img :src="afterSrc" alt="" v-show='isShowAfterImg'>
                </div>
            </div>
            
            <!-- <van-button type="default" class="btn-custom" style="width:171px;">确认上传</van-button> -->
        </div>
        <div class="upload-wrap">
            <h5>上传设备显示识别码图片</h5>
            <p>（示例图片）</p>
            <div class="container">
                <van-uploader name='code' :after-read="onRead2">
                    <van-icon name="photograph" color="#d8d7d7" />
                    <p>添加包装图片</p>
                </van-uploader>
                <img :src="codeSrc" alt="" v-show='isShowCode'>
            </div>
            <!-- <van-button type="default" class="btn-custom" style="width:171px;">确认上传</van-button> -->
        </div>
        <div class="btn-wrap">
            <van-button type="default" class="btn-custom" size='large' @click='confirmFun'>确认上传</van-button>
        </div>
    </div>
</template>
<script>
import lrz from 'lrz';
export default {
    name:'repairUploader',
    data(){
        return{
            isShowBeforeImg:false,//是否显示维修前图片
            isShowAfterImg:false,//是否显示维修后图片
            isShowCode:false,//是否显示识别码图片
            codeSrc:'',//识别码图片
            beforeSrc:'',//维修前图片
            afterSrc:'',//维修后图片
        }
    },
    methods:{
        // 返回
        onClickLeft(){
            this.$router.go(-1);
        },
        // 维修前图片
        onReadBefore(file, detail) {
            var _this = this;
            _this.runAsync(file.content).then(res => {
                _this.beforeSrc = res.base64;
                _this.isShowBeforeImg = true;
            })
            
        },
        // 维修后图片
        onReadAfter(file, detail) {
            var _this = this;
            _this.runAsync(file.content).then(res => {
                _this.afterSrc = res.base64;
                _this.isShowAfterImg = true;
            })
            
        },
        // 读取图片
        onRead2(file, detail) {
            var _this = this;
            _this.runAsync(file.content).then(res => {
                _this.codeSrc = res.base64;
                _this.isShowCode = true;
            })
            
        },
        // 异步获取返回压缩后的图片
        runAsync(fileData){
            var p = new Promise((resolve,reject)=>{
                resolve(lrz(fileData,{width:340,quality:0.6}));
            })
            return p;
        },
        // 确认上传
        confirmFun(){
            var _this = this;
            if(_this.beforeSrc == '' || _this.afterSrc == '' || _this.codeSrc == ''){
                _this.$dialog.alert({
                    title:'提 示',
                    message:'请上传全景图片和识别码图片~'
                })
            }else{
                var uploadImg = {
                    beforeImg:_this.beforeSrc,
                    afterImg:_this.afterSrc,
                    codeImg:_this.codeSrc
                }
                _this.$store.commit({
                    type:"saveUploadImg",
                    uploadImg:uploadImg
                })
                
                _this.$router.push({path:'/installForm'})
            }
        }
    },
    
}
</script>
<style scoped lang="scss">
.repairUploader{
    position: absolute;width: 100%;height: 100%;top:0;left: 0;box-sizing: border-box;background-color: #f7f7f7;padding-top:46px;
    .upload-wrap{
        width: 350px;height: 270px;box-sizing: border-box;border:1px #efefef solid;border-radius: 8px;margin:0 auto 15px;
        background-color: #ffffff;display: flex;flex-direction: column;justify-content: center;align-items: center;
        h5{font-size: 16px;font-weight: 500;}
        p{font-size: 12px;color: #fb2812;margin-top: 10px;}
        .container{
            width: 171px;height: 171px;box-sizing: border-box;border-radius: 8px;background-color: #f7f7f7;border:1px #e1e1e1 solid;margin-top: 10px;position: relative;display: flex;justify-content: center;align-items: center;color: #e0e0e0;text-align: center;margin-bottom: 10px;
            p{color: #e0e0e0;}
            img{position: absolute;width: 100%;height: 100%;top:0;left: 0;}
        }
        .content-wrap{
            width: 100%;display: flex;justify-content: space-around;
            .container{
                width: 140px;height: 140px;
            }
        }
    }
    .btn-wrap{width: 350px;margin: 20px auto 20px;}
}
</style>


