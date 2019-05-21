<template>
    <div class="loading">
        <img src="@/assets/images/17.gif" alt="">
    </div>
</template>
<style scoped lang="scss">
.loading{
    position: absolute;width: 100%;height: 100%;top:0;left: 0;background-color: rgba(0, 0, 0, 0.8);z-index: 99;
    img{
        position: absolute;width: 40px;height: 40px;left: 50%;top:50%;transform: translate3d(-50%,-50%,0);
    }
}
</style>

