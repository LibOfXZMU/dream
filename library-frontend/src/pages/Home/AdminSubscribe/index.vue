<template>
   <el-table
    :data="reserveList"
    style="width: 100%"
    height="450"
    :default-sort = "{prop: 'date', order: 'descending'}"
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
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="预约日期"
      sortable
      prop="date"
      >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="图书名称"
      sortable
      prop="bookName"
      >
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
    <el-table-column
      label="读者姓名"
      sortable
      prop="readerName"
      >
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
          @click="handleDelete(scope.$index, scope.row)">删除记录</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {mapState} from 'vuex'
import {deleteReserve,initReserve} from '@/api'
import qs from 'qs'
export default {
    name: 'AdminSubscribe',
    data() {
        return {
        };
    },
    computed:{
        ...mapState({
            reserveList(state){
                return state.Reserve.reserveList
            }
        })
    },
    mounted() {
        this.$store.dispatch('initReserveList')
    },
    methods: {
        handleDelete(index,row){
            let reserveObj = {readerId:row.readerId,bookId:row.bookId,date:row.date}
            deleteReserve(qs.stringify(reserveObj)).then(res=>{
                this.$store.dispatch('initReserveList')
            },err=>{
                console.log(err.message);
            })
        }
    },
};
</script>

<style lang="less" scoped>
.beautify-table {
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    margin: 16px 0;
    box-shadow: 0 4px 24px 0 rgba(40, 130, 170, 0.12);
}
.el-table th, .el-table td {
    background: #f6fcff;
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
</style>