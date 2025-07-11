<template>
    <div class="home-bg clearfix">
        <header>
            <img src="./images/library.jpeg" alt="">
        </header>
        <el-row :gutter="20" class="main-content">
            <el-col :span="6">
                <AdminBanner v-if="isAdmin"/>
                <ReaderBanner v-else/>
            </el-col>
            <el-col :span="14">
                <div class="tablemain">
                    <router-view />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name: 'Home',
    computed:{
        ...mapState({
            isAdmin(state){
                return state.User.isAdmin
            }
        })
    }
};
</script>
<style lang="less" scoped>
.home-bg {
    min-height: 100vh;
    padding-bottom: 1px;
    /* 渐变背景+装饰 */
    background: linear-gradient(135deg, #e3f0fd 0%, #f9e6fd 100%);
    background-image:
        radial-gradient(circle at 85% 15%, #bbdefb55 14%, transparent 60%),
        radial-gradient(circle at 15% 90%, #ffe0824d 18%, transparent 60%);
    /* 柔和淡色渐变与圆形点缀 */
}

header{
    text-align: center;
    color: rgb(16, 148, 93);
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    img{
        height: 120px;
        border-radius: 14px;
        box-shadow: 0 4px 28px 0 rgba(16,100,180,0.10);
        margin: 24px 0 12px 0;
        background: #fff;
    }
}
.main-content {
    min-height: 80vh;
    margin-top: 15px;
}
.tablemain{
    box-shadow: 0 6px 28px 0 rgba(40, 130, 170, 0.11);
    border: 1px solid #e8eaf6;
    border-radius: 14px;
    padding: 32px 26px 26px 26px;
    background: #fff;
    min-height: 490px;
    margin-bottom: 34px;
    /* 渐变边框（可选） */
    /* border-image: linear-gradient(90deg, #b2ebf2 0%, #fce4ec 100%) 1; */
}
</style>