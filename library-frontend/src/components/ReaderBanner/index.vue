<template>
  <div class="sidebar-container">
    <el-menu
        default-active="1"
        class="reader-menu"
        :collapse="false"
        @open="handleOpen"
        @close="handleClose">
      <el-menu-item index="1" @click="$router.push('/home/introduce')">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/home/search')">
        <i class="el-icon-search"></i>
        <span slot="title">查询图书</span>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/home/readerreserve')">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">预约记录</span>
      </el-menu-item>
      <el-menu-item index="4" @click="$router.push('/home/readerborrows')">
        <i class="el-icon-document-copy"></i>
        <span slot="title">借阅记录</span>
      </el-menu-item>
      <el-menu-item index="5" @click="$router.push('/home/readernotifications')">
        <i class="el-icon-message-solid"></i>
        <span slot="title">我的通知</span>
        <el-badge class="mark" :hidden="unreadCount === 0" :value="unreadCount" />
      </el-menu-item>
      <el-menu-item index="6" @click="$router.push('/home/Entertainment')">
        <i class="el-icon-s-comment"></i>
        <span slot="title">娱乐</span>
      </el-menu-item>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item index="7-1" @click="toggleUser">
          <i class="el-icon-switch-button"></i>
          <span slot="title">退出账号</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
  name: "ReaderBanner",
  data() {
    return {
    };
  },
  computed:{
    ...mapState({
      readerId(state){
        return state.User.readerInfo.readerId
      }
    }),
    ...mapGetters('Notification', ['unreadCount'])
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    toggleUser() {
      this.$router.push("/LoginRegister");
    }
  },
  mounted() {
    if(this.readerId){
      this.$store.dispatch('Notification/updateUnreadCount', { readerId: this.readerId });
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar-container {
  background: linear-gradient(135deg, #fdf6f9 0%, #e8dff5 100%);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  padding: 20px 0;
  height: auto;
  min-height: 85vh;
  float: left;
  margin-right: 40px;
  transition: all 0.3s ease;
}

.reader-menu:not(.el-menu--collapse) {
  width: 220px;
}

.reader-menu {
  border: none;
  background-color: transparent;

  .el-menu-item {
    position: relative;
  }

  .el-menu-item .mark {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .el-menu-item, .el-submenu__title {
    font-size: 15px;
    font-weight: 500;
    color: #6a5a75;
    border-radius: 8px;
    margin: 8px 12px;
    transition: all 0.2s ease-in-out;

    i {
      color: #d65e7b;
    }
  }

  .el-menu-item:hover, .el-submenu__title:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: #b54f6c;
  }

  .el-menu-item.is-active {
    background-color: #d65e7b;
    color: #ffffff !important;
    font-weight: 600;
    box-shadow: 0 4px 8px rgba(214, 94, 123, 0.25);

    i {
      color: #ffffff;
    }
  }

  // Submenu styling
  .el-submenu .el-menu-item {
    min-width: unset;
    background-color: rgba(255, 255, 255, 0.4);
    margin: 4px 12px;
  }

  .el-submenu .el-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
}
</style>