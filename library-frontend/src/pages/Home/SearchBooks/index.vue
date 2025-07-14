<template>
  <div class="beautify-searchbooks">
    <el-input
      placeholder="请输入您要搜索的书名/作者"
      prefix-icon="el-icon-search"
      @keyup.enter.native="searchBook"
      @blur="clear"
      v-model="name"
      class="search-input"
    ></el-input>
    <el-table
      :data="flag == 0 ? booksList : searchBooks"
      height="450"
      style="width: 100%"
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
            <el-form-item label="图书名称：">
              <span>{{ props.row.bookName }}</span>
              <el-button
                v-show="isAdmin"
                @click="changeBookName(props.row)"
                type="text"
                class="edit-btn"
                size="mini"
                icon="el-icon-edit"
                >修改</el-button
              >
            </el-form-item>
            <el-form-item label="图书作者：">
              <span>{{ props.row.author }}</span>
              <el-button
                v-show="isAdmin"
                @click="changeBookAuthor(props.row)"
                type="text"
                class="edit-btn"
                size="mini"
                icon="el-icon-edit"
                >修改</el-button
              >
            </el-form-item>
            <el-form-item label="书籍位置：">
              <span>{{ props.row.position }}</span>
              <el-button
                v-show="isAdmin"
                @click="changeBookPosition(props.row)"
                type="text"
                class="edit-btn"
                size="mini"
                icon="el-icon-edit"
                >修改</el-button
              >
            </el-form-item>
            <el-form-item label="当前库存：">
              <span>{{ props.row.amount }}</span>
              <el-button
                v-show="isAdmin"
                @click="changeCurrentAmount(props.row)"
                type="text"
                class="edit-btn"
                size="mini"
                icon="el-icon-edit"
                >修改</el-button
              >
            </el-form-item>
            <el-form-item label="总库存：">
              <span>{{ props.row.totalAmount }}</span>
            </el-form-item>
            <el-form-item label="借阅次数：">
              <span>{{ props.row.borrowedTimes }}</span>
              <el-popconfirm
                title="确认删除该书籍吗？"
                v-if="isAdmin"
                style="float: right;"
                @confirm="delBook(props.row)"
              >
                <el-button  size="mini" type="danger" plain slot="reference"
                  >删除书籍</el-button
                >
              </el-popconfirm>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="图书名称" sortable prop="bookName"></el-table-column>
      <el-table-column sortable label="图书作者" prop="author"></el-table-column>
      <el-table-column sortable label="书籍位置" prop="position"></el-table-column>
      <el-table-column sortable label="当前库存" prop="amount"></el-table-column>
      <el-table-column label="操作" v-if="!isAdmin">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            class="reserve-btn"
            @click="bookReserve(scope.$index, scope.row)"
            >预约</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { addReserve, initReserve, searchBook, changeBookInfo,delBook } from "@/api";
import qs from "qs";
import moment from 'moment';

export default {
  name: "SearchBooks",
  data() {
    return {
      loading: false,
      name: "",
      flag: 0,
      borrowInfo: {
        borrowDate: "",
        realDate: "",
      },
      searchBooks: [],
    };
  },
  methods: {
    bookReserve(index, row) {
      this.loading = true;
      let readerId = this.readerId;
      let bookId = row.bookId;
      let date = moment().format("YYYY-MM-DD HH:mm:ss");
      let reserveObj = { readerId, bookId, date, status: "已预约" };
      addReserve(qs.stringify(reserveObj)).then(
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
              message: res.msg,
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
    searchBook(e) {
      this.loading = true;
      searchBook(qs.stringify({ name: this.name })).then(
        (res) => {
          this.loading = false;
          e.target.blur();
          this.flag = 1;
          this.searchBooks = res.data;
          if (res.status == 0) {
            this.$message({
              showClose: true,
              message: "未找到相关书籍！",
              type: "error",
            });
          }
        },
        (err) => {
          this.loading = false;
        }
      );
    },
    clear() {
      this.flag = 0;
      this.searchBooks = [];
    },
    changeBookName(row) {
      var bookId = row.bookId;
      var status = 1;
      this.$prompt("请输入书名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.bookName,
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你修改的书名是: " + value,
          });
          var infoObj = { bookId, value, status };
          changeBookInfo(qs.stringify(infoObj)).then(
            (res) => {
              this.$store.dispatch("initBooksList");
              this.$store.dispatch("initReserveList");
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    changeBookAuthor(row) {
      var bookId = row.bookId;
      var status = 2;
      this.$prompt("请输入作者名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.author,
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你修改的作者名是: " + value,
          });
          var infoObj = { bookId, value, status };
          changeBookInfo(qs.stringify(infoObj)).then(
            (res) => {
              this.$store.dispatch("initBooksList");
              this.$store.dispatch("initReserveList");
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    changeBookPosition(row) {
      var bookId = row.bookId;
      var status = 3;
      this.$prompt("请输入位置", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.position,
      })
        .then(({ value }) => {
          var infoObj = { bookId, value, status };
          changeBookInfo(qs.stringify(infoObj)).then(
            (res) => {
              if (res.status == 0) {
                this.$message({
                  type: "error",
                  message: res.msg,
                });
              } else {
                this.$message({
                  type: "success",
                  message: "你修改的位置是: " + value,
                });
              }
              this.$store.dispatch("initBooksList");
              this.$store.dispatch("initReserveList");
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    changeCurrentAmount(row){
      var bookId = row.bookId;
      var status = 4;
      this.$prompt("请输入库存", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.amount,
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你修改当前库存是: " + value,
          });
          let difference = value - row.amount
          var infoObj = { bookId, value, status, difference };
          changeBookInfo(qs.stringify(infoObj)).then(
            (res) => {
              this.$store.dispatch("initBooksList");
              this.$store.dispatch("initReserveList");
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    delBook(row){
      let bookId = row.bookId;
      delBook(qs.stringify({bookId})).then(res=>{
        if(res.status == 200)
         this.$message({
            type: "success",
            message: res.msg,
          });
         this.$store.dispatch("initBooksList");
         this.$store.dispatch("initReserveList");
      })
    }
  },
  computed: {
    ...mapState({
      booksList(state) {
        return state.Books.booksList;
      },
      readerId(state) {
        return state.User.readerInfo.readerId;
      },
      isAdmin(state) {
        return state.User.isAdmin;
      },
    }),
  },
  mounted() {
    this.$store.dispatch('initBooksList')
  },
};
</script>

<style lang="less" scoped>
.beautify-searchbooks {
  background: rgba(248, 252, 254, 0.8);
  border-radius: 14px;
  padding: 30px 16px 24px 16px;
  min-height: 420px;
  box-shadow: 0 4px 24px 0 rgba(30, 144, 255, 0.10);
}
.beautify-table {
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.75);
  margin: 16px 0 0 0;
  box-shadow: 0 2px 12px 0 rgba(221, 241, 255, 0.20);
}
.el-table th, .el-table td {
  background: rgba(247, 251, 253, 0.7);
  color: #336699;
  font-size: 15px;
}
.search-input {
  width: 340px;
  border-radius: 8px;
  border: 1.5px solid #c1e1fe;
  background: #fff;
  font-size: 16px;
  margin-bottom: 18px;
}
.reserve-btn {
  border-radius: 8px;
  font-weight: 600;
  background-image: linear-gradient(90deg,#4fc3f7 0,#1976d2 100%);
  color: #fff;
  border: none;
}
.reserve-btn:hover {
  background-image: linear-gradient(90deg,#1976d2 0,#4fc3f7 100%);
  color: #fff;
}
.edit-btn {
  margin-left: 10px;
  color: #1976d2;
}
.demo-table-expand {
  font-size: 0;
  background: rgba(250, 253, 255, 0.85);
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>