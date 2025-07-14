<template>
  <div class="sidebar-container">
    <el-menu
        default-active="1"
        class="admin-menu"
        :collapse="false"
        @open="handleOpen"
        @close="handleClose">
      <el-menu-item index="1" @click="$router.push('/home/introduce')">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/home/person')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">人员管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/home/search')">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">图书管理</span>
      </el-menu-item>
      <el-menu-item index="4" @click="$router.push('/home/adminborrows')">
        <i class="el-icon-search"></i>
        <span slot="title">借阅记录</span>
      </el-menu-item>
      <el-menu-item index="5" @click="$router.push('/home/adminsubcribe')">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">预约记录</span>
      </el-menu-item>
      <el-menu-item index="7" @click="$router.push('/home/Entertainment')">
        <i class="el-icon-s-comment"></i>
        <span slot="title">娱乐</span>
      </el-menu-item>
      <el-menu-item index="8" @click="$router.push('/home/adminaddbooks')">
        <i class="el-icon-document-copy"></i>
        <span slot="title">添加图书</span>
      </el-menu-item>
      <el-submenu index="9">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item index="9-1" @click="toggleUser">
          <i class="el-icon-switch-button"></i>
          <span slot="title">退出账号</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AdminBanner",
  data() {
    return {
    };
  },
  methods: {
    handleOpen() { },
    handleClose() { },
    toggleUser() {
      this.$router.push("/LoginRegister");
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar-container {
  /* 修改点：增加了透明度 */
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  padding: 20px 0;
  height: auto;
  min-height: 85vh;
  float: left;
  margin-right: 40px;
  transition: all 0.3s ease;
}

.admin-menu:not(.el-menu--collapse) {
  width: 220px;
}

.admin-menu {
  border: none;
  background-color: transparent;

  .el-menu-item, .el-submenu__title {
    font-size: 15px;
    font-weight: 500;
    color: #495057;
    border-radius: 8px;
    margin: 8px 12px;
    transition: all 0.2s ease-in-out;

    i {
      color: #5c6ac4;
    }
  }

  .el-menu-item:hover, .el-submenu__title:hover {
    background-color: #f1f3f5;
    color: #343a40;
  }

  .el-menu-item.is-active {
    background-color: #5c6ac4;
    color: #ffffff !important;
    font-weight: 600;
    box-shadow: 0 4px 8px rgba(92, 106, 196, 0.2);

    i {
      color: #ffffff;
    }
  }

  .el-submenu .el-menu-item {
    min-width: unset;
    background-color: #fafbff;
    margin: 4px 12px;
  }

  .el-submenu .el-menu-item:hover {
    background-color: #e6e9f5;
  }
}
</style>