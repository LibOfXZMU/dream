<template>
    <el-table
        :data="readerList"
        style="width: 100%"
        :default-sort="{prop: 'readerName', order: 'descending'}"
        class="beautify-table"
        border
        stripe
        highlight-current-row
    >
        <el-table-column
            prop="readerName"
            label="姓名"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="phone"
            sortable
            label="电话"
            min-width="140"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="email"
            sortable
            label="邮箱"
            min-width="180"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="borrowTimes"
            sortable
            label="借阅次数"
        >
        </el-table-column>
        <el-table-column
            prop="ovdTimes"
            sortable
            label="逾期次数"
        >
        </el-table-column>
        <el-table-column
            label="操作"
        >
            <template slot-scope="scope">
                <el-popconfirm
                    title="确认删除该人员吗？"
                    @confirm="delPerson(scope.$index, scope.row)"
                >
                    <el-button
                        size="mini"
                        type="danger"
                        plain
                        slot="reference"
                    >删除人员</el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {mapState} from 'vuex'
import {delPerson} from '@/api'
import qs from 'qs'
export default {
    name: 'AdminPerson',
    computed:{
        ...mapState({
            readerList(state){
                return state.User.readerList
            }
        })
    },
    methods:{
        delPerson(index,row){
            let infoObj = {readerId:row.readerId}
            delPerson(qs.stringify(infoObj)).then(res=>{
                if(res.status == 200){
                    this.$message({
                        showClose: true,
                        message: "删除人员成功！",
                        type: "success",
                    });
                }
                this.$store.dispatch('initReaderList')
            },err=>{
                console.log(err.message);
            })
        }
    },
    mounted(){
        this.$store.dispatch('initReaderList')
    }
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
    background: #f7fbfd;
    color: #5082ad;
    font-size: 16px;
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
.el-popconfirm__main {
    color: #1976d2;
    font-size: 14px;
}
</style>