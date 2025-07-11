<template>
  <div class="beautify-readerreserve">
    <el-table
      :data="reserve"
      style="width: 100%"
      height="450"
      v-loading.fullscreen.lock="loading"
      element-loading-text="正在处理..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="beautify-table"
      border
      stripe
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="预约日期：">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="书籍名称：">
              <span>{{ props.row.bookName }}</span>
            </el-form-item>
            <el-form-item label="图书作者：">
              <span>{{ props.row.author }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="预约日期"> </el-table-column>
      <el-table-column prop="bookName" label="书籍名称"> </el-table-column>
      <el-table-column prop="author" label="图书作者"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-popconfirm
            title="确认取消该预约吗？"
            style="margin-right: 10px"
            @confirm="cancelReserve(scope.$index, scope.row)"
            v-if="scope.row.status == '已预约'"
          >
            <el-button size="mini" type="warning" plain slot="reference"
              >取消预约
            </el-button>
          </el-popconfirm>
          <el-button
            @click="openBorrow(scope.row)"
            v-if="scope.row.status == '已预约'"
            size="mini"
            type="primary"
            plain
            slot="reference"
            >确认借书
          </el-button>
          <el-button size="mini" disabled v-if="scope.row.status == '已借阅'"
            >已借阅
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="扫码借书" :visible.sync="borrowVisible" width="340px" class="beautify-dialog">
      <div class="dialog-center">
        <el-image style="width: 100px; height: 100px; margin-bottom: 30px" :src="codePng"></el-image>
        <el-button type="primary" class="dialog-btn" @click="confirmBorrow()">我已扫码，确认借书</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteReserve, addBorrow } from "@/api";
import qs from "qs";
import codePng from "@/assets/code.png";

export default {
  data() {
    return {
      loading: false,
      borrowVisible: false,
      codePng,
      currentRow: {}
    };
  },
  name: "ReaderSubscribe",
  methods: {
    openBorrow(row) {
      this.currentRow = row
      this.borrowVisible = true
    },
    cancelReserve(index, row) {
      let bookId = row.bookId;
      let readerId = this.$store.state.User.readerInfo.readerId;
      let date = row.date;
      let obj = { bookId, readerId, date };
      this.loading = true;
      deleteReserve(qs.stringify(obj)).then(
        (res) => {
          this.loading = false;
          if (res.status == 200) {
            this.$message({
              showClose: true,
              message: "取订成功！",
              type: "success",
            });
          }
          this.$store.dispatch("initReserve", { readerId: this.readerId });
        },
        (err) => {
          this.loading = false;
        }
      );
    },
    confirmBorrow() {
      let readerId = this.readerId;
      let bookId = this.currentRow.bookId;
      let date = this.currentRow.date;
      this.loading = true;
      let borrowObj = { readerId, bookId, date };
      addBorrow(qs.stringify(borrowObj)).then(
        (res) => {
          this.loading = false;
          if (res.status == 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          } else if (res.status == 200) {
            this.$message({
              showClose: true,
              message: "借书成功！",
              type: "success",
            });
            this.borrowVisible = false
          }
          this.$store.dispatch("initBorrows", { readerId: this.readerId });
          this.$store.dispatch("initReserve", { readerId: this.readerId });
        },
        (err) => {
          this.loading = false;
        }
      );
    },
  },
  computed: {
    ...mapState({
      reserve(state) {
        return state.Reserve.reserve;
      },
      readerId(state) {
        return state.User.readerInfo.readerId;
      },
    }),
  },
  mounted() {
    this.$store.dispatch("initReserve", { readerId: this.readerId });
  },
};
</script>

<style lang="less" scoped>
.beautify-readerreserve {
  background: #f8fcfe;
  border-radius: 14px;
  padding: 30px 10px 24px 10px;
  min-height: 420px;
  box-shadow: 0 4px 24px 0 rgba(30, 144, 255, 0.10);
}
.beautify-table {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  margin: 0 0 20px 0;
  box-shadow: 0 2px 12px 0 rgba(221, 241, 255, 0.20);
}
.el-table th, .el-table td {
  background: #f7fbfd;
  color: #336699;
  font-size: 15px;
}
.dialog-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dialog-btn {
  margin-top: 12px;
  width: 160px;
  border-radius: 8px;
  font-size: 16px;
}
</style>