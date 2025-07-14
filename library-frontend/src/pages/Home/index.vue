<template>
  <div class="home-bg clearfix" :style="pageStyle">
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
  name: 'HomePage',
  data() {
    return {
      // 直接将API链接赋值给backgroundImageUrl
      backgroundImageUrl: 'https://hefollo.com/apis.php?type=喵糖映画套图'
    }
  },
  computed:{
    ...mapState({
      isAdmin(state){
        return state.User.isAdmin
      }
    }),
    pageStyle(){
      return {
        backgroundImage: `url(${this.backgroundImageUrl})`
      }
    }
  }
};
</script>
<style lang="less" scoped>
.home-bg {
  min-height: 100vh;
  padding-bottom: 1px;
  /* 动态背景图样式 */
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  transition: background-image 0.5s ease-in-out;
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
    /* 修改点：调整透明度以获得更好效果 */
    background: rgba(255, 255, 255, 0.7);
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
  /* 修改点：调整透明度以获得更好效果 */
  background: rgba(255, 255, 255, 0.8);
  min-height: 490px;
  margin-bottom: 34px;
}
</style>