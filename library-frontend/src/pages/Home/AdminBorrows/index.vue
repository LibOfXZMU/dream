<template>
  <div
      v-loading.fullscreen.lock="loading"
      :element-loading-text="loadingtext"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="beautify-adminborrows"
  >
    <el-input
        placeholder="请输入您要查找的用户姓名/图书名称"
        prefix-icon="el-icon-search"
        @keyup.enter.native="searchInfo"
        @blur="clear"
        v-model="info"
        class="search-input"
    ></el-input>
    <el-table
        :data="flag == 0 ? borrowsList : searchMessage"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        class="beautify-table"
        border
        stripe
        highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="借阅日期：">
              <span>{{ props.row.borrowDate }}</span>
            </el-form-item>
            <el-form-item label="图书 ID：">&nbsp;
              <span>{{ props.row.bookId }}</span>
            </el-form-item>
            <el-form-item label="图书名称：">
              <span>{{ props.row.bookName }}</span>
            </el-form-item>
            <el-form-item label="读者编号：">
              <span>{{ props.row.readerId }}</span>
            </el-form-item>
            <el-form-item label="读者姓名：">
              <span>{{ props.row.readerName }}</span>
            </el-form-item>
            <el-form-item label="应还日期：">
              <span>{{ props.row.returnDate }}</span>
            </el-form-item>
            <el-form-item label="实际日期：">
              <span>{{ props.row.realDate }}</span>
              <el-button
                  style="float: right; margin-right: 40px"
                  size="mini"
                  type="warning"
                  plain
                  @click="openNotificationDialog(props.row)"
              >发送通知</el-button
              >
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="借阅日期" sortable prop="borrowDate">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.borrowDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图书名称" sortable prop="bookName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>编号: {{ scope.row.bookId }}</p>
            <p>名称: {{ scope.row.bookName }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.bookName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="读者姓名" sortable prop="readerName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>编号: {{ scope.row.readerId }}</p>
            <p>姓名: {{ scope.row.readerName }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.readerName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)"
          >删除记录</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="发送通知" :visible.sync="notificationDialogVisible" width="30%">
      <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入通知内容"
          v-model="notificationMessage">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="notificationDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendNotification">发 送</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteBorrow, searchBorrow, sendNotification } from "@/api";
import qs from "qs";
export default {
  name: "AdminBorrows",
  data() {
    return {
      loading: false,
      loadingtext: "查询中...",
      info: "",
      searchMessage: [],
      flag: 0,
      notificationDialogVisible: false,
      notificationMessage: '',
      currentRow: null
    };
  },
  computed: {
    ...mapState({
      borrowsList(state) {
        return state.Borrows.borrowsList;
      },
    }),
  },
  methods: {
    handleDelete(index, row) {
      let borrowObj = {
        readerId: row.readerId,
        bookId: row.bookId,
        borrowDate: row.borrowDate,
      };
      deleteBorrow(qs.stringify(borrowObj)).then(
          (res) => {
            this.$message({
              showClose: true,
              message: "删除借阅记录成功！",
              type: "success",
            });
            this.$store.dispatch("initBorrowsList");
          },
          (err) => {
            console.log(err.message);
          }
      );
    },
    searchInfo(e) {
      this.loading = true;
      searchBorrow(qs.stringify({ info: this.info })).then(
          (res) => {
            this.loading = false;
            e.target.blur();
            this.searchMessage = res.data;
            this.flag = 1;
            if (res.status == 0) {
              this.$message({
                showClose: true,
                message: "查询结果为空！",
                type: "error",
              });
            }
          },
          (err) => {
            this.loading = false;
            console.log(err.message);
          }
      );
    },
    clear() {
      this.flag = 0;
      this.searchMessage = [];
    },
    openNotificationDialog(row){
      this.currentRow = row;
      this.notificationMessage = `读者您好，请尽快归还您借阅的书籍：《${row.bookName}》！`;
      this.notificationDialogVisible = true;
    },
    sendNotification(){
      if(!this.notificationMessage){
        this.$message({
          showClose: true,
          message: "通知内容不能为空！",
          type: "warning",
        });
        return
      }
      let infoObj = {
        readerId: this.currentRow.readerId,
        message: this.notificationMessage
      }
      sendNotification(qs.stringify(infoObj)).then(res=>{
        this.$message({
          showClose: true,
          message: res.msg,
          type: res.status == 200? "success":"error",
        });
        if(res.status == 200){
          this.notificationDialogVisible = false;
          this.notificationMessage = '';
        }
      })
    }
  },
  mounted(){
    this.$store.dispatch('initBorrowsList')
  }
};
</script>

<style lang="less" scoped>
.beautify-adminborrows {
  background: #f4faff;
  border-radius: 14px;
  padding: 32px 24px 20px 24px;
  box-shadow: 0 4px 24px 0 rgba(30, 144, 255, 0.12);
}
.beautify-table {
  margin-top: 20px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.search-input {
  width: 340px;
  margin-bottom: 22px;
  border-radius: 8px;
  border: 1.5px solid #c1e1fe;
  background: #fff;
  font-size: 16px;
}
.el-table th, .el-table td {
  background: #f7fbfd;
  color: #5082ad;
  font-size: 15px;
}
.el-button {
  border-radius: 7px;
  font-weight: 500;
  transition: all .2s;
}
.el-button--danger {
  background: linear-gradient(90deg, #ffb5af 0%, #ec407a 100%);
  border: none;
  color: #fff;
}
.el-button--danger:hover {
  background: linear-gradient(90deg, #ec407a 0%, #ffb5af 100%);
}
.el-button--warning {
  background: linear-gradient(90deg,#fffde7,#ffe082 100%);
  color: #ff9800;
  border: none;
}
.el-popconfirm__main {
  color: #1976d2;
  font-size: 14px;
}
</style>