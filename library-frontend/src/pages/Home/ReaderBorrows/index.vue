<template>
  <div class="beautify-readerborrows">
    <el-table
      :data="borrows"
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
            <el-form-item
              label="借书日期："
              v-if="props.row.borrowDate != '9999-12-31 00:00:00'"
            >
              <span>{{ props.row.borrowDate }}</span>
            </el-form-item>
            <el-form-item label="应还日期：">
              <span>{{ props.row.returnDate }}</span>
            </el-form-item>
            <el-form-item label="书籍名称：">
              <span>{{ props.row.bookName }}</span>
            </el-form-item>
            <el-form-item label="图书作者：">
              <span>{{ props.row.author }}</span>
            </el-form-item>
            <el-form-item label="图书状态：">
              <span>{{ props.row.status }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="borrowDate" label="借阅日期"> </el-table-column>
      <el-table-column prop="bookName" label="书籍名称"> </el-table-column>
      <el-table-column prop="author" label="图书作者"> </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" disabled v-if="scope.row.status == '已还'">已还</el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            class="action-btn"
            @click="openReturn(scope.row)"
            v-if="scope.row.status != '已还' && !handleIfOverdue(scope.row)"
            >还书
          </el-button>
          <el-button
            size="mini"
            type="success"
            :plain="scope.row.status == '未还'"
            :disabled="scope.row.status == '续借'"
            v-if="scope.row.status != '已还' && !handleIfOverdue(scope.row)"
            @click="openContinue(scope.row)"
            class="action-btn"
            >续借
          </el-button>
          <el-button
            size="mini"
            type="warning"
            plain
            class="action-btn"
            v-if="handleIfOverdue(scope.row) && scope.row.status !== '已还'"
            @click="openOverdue(scope.row)"
            >立即还书
          </el-button>
          <el-button
            size="mini"
            type="danger"
            disabled
            plain
            v-if="handleIfOverdue(scope.row) && scope.row.status !== '已还'"
            >已逾期
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="扫码还书" :visible.sync="returnVisible" width="340px" class="beautify-dialog">
      <div class="dialog-center">
        <el-image style="width: 100px; height: 100px; margin-bottom: 30px" :src="codePng"></el-image>
        <el-button type="primary" class="dialog-btn" @click="returnBook(currentRow)">我已扫码，立即还书</el-button>
      </div>
    </el-dialog>
    <el-dialog title="扫码续借" :visible.sync="continueVisible" width="340px" class="beautify-dialog">
      <div class="dialog-center">
        <el-image style="width: 100px; height: 100px; margin-bottom: 30px" :src="codePng"></el-image>
        <el-button type="primary" class="dialog-btn" @click="continueBorrowBook(currentRow)">我已扫码，现在续借</el-button>
      </div>
    </el-dialog>
    <el-dialog title="逾期支付" :visible.sync="overdueVisible" width="340px" class="beautify-dialog">
      <div class="dialog-center">
        <el-image style="width: 100px; height: 100px; margin-bottom: 30px" :src="codePng"></el-image>
        <el-button type="primary" class="dialog-btn" @click="returnBook(currentRow)">我已支付，现在还书</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { continueBorrow, returnBook } from "@/api";
import codePng from "@/assets/code.png";
import qs from "qs";
export default {
  name: "ReaderBorrow",
  data() {
    return {
      loading: false,
      overdueVisible: false,
      returnVisible: false,
      continueVisible: false,
      codePng,
      currentRow: {},
    };
  },
  methods: {
    handleIfOverdue(item) {
      return new Date(item.returnDate) - new Date() < 0;
    },
    openReturn(row) {
      this.currentRow = row;
      this.returnVisible = true;
    },
    openOverdue(row) {
      this.currentRow = row;
      this.overdueVisible = true;
    },
    openContinue(row) {
      this.currentRow = row;
      this.continueVisible = true;
    },
    returnBook(row) {
      const isOverdue = this.handleIfOverdue(row);
      if (isOverdue) {
        this.overdueVisible = true;
      }
      let infoObj = {
        bookId: row.bookId,
        readerId: row.readerId,
        borrowDate: row.borrowDate,
      };
      returnBook(qs.stringify(infoObj)).then(
        (res) => {
          if (res.status == 100) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          } else if (res.status == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
            this.overdueVisible = false;
            this.returnVisible = false;
          }
          this.$store.dispatch(
            "initBorrows",
            qs.stringify({ readerId: this.readerId })
          );
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
    continueBorrowBook(row) {
      this.loading = true;
      let infoObj = {
        readerId: row.readerId,
        bookId: row.bookId,
        borrowDate: row.borrowDate,
        date: row.date,
      };
      continueBorrow(qs.stringify(infoObj)).then((res) => {
        this.loading = false;
        if (res.status == 200) {
          this.$message({
            showClose: true,
            message: "续借成功！",
            type: "success",
          });
          this.continueVisible = false;
        }
        this.$store.dispatch(
          "initBorrows",
          qs.stringify({ readerId: this.readerId })
        );
      });
    },
  },
  computed: {
    ...mapState({
      borrows(state) {
        return state.Borrows.borrows;
      },
      readerId(state) {
        return state.User.readerInfo.readerId;
      },
    }),
  },
  mounted() {
    this.$store.dispatch(
      "initBorrows",
      qs.stringify({ readerId: this.readerId })
    );
  },
};
</script>

<style lang="less" scoped>
.beautify-readerborrows {
  background: #f8fcfe;
  border-radius: 14px;
  padding: 30px 14px 24px 14px;
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
.action-btn {
  margin-right: 7px;
  margin-bottom: 2px;
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
.el-button--primary, .el-button--success, .el-button--warning {
  color: #fff;
  border: none;
  font-weight: 600;
}
.el-button--primary {
  background: linear-gradient(90deg,#4fc3f7 0,#1976d2 100%);
}
.el-button--success {
  background: linear-gradient(90deg,#a5d6a7 0,#388e3c 100%);
}
.el-button--warning {
  background: linear-gradient(90deg,#fffde7,#ffe082 100%);
  color: #ff9800;
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