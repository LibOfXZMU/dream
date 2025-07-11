<template>
	<el-form ref="form" label-width="90px" class="beautify-form">
      <el-form-item label="书籍名称">
        <el-col :span="12">
            <el-input v-model="bookName" placeholder="请输入书籍名称"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="书籍作者">
        <el-col :span="6">
            <el-input v-model="author" placeholder="请输入作者"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="总库存">
        <el-col :span="6">
            <el-input v-model="amount" min="0" type="number" placeholder="请输入库存"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="图书位置">
        <el-col :span="6">
        <el-autocomplete
            popper-class="my-autocomplete"
            v-model="position"
            :fetch-suggestions="querySearch"
            placeholder="请输入图书位置"
            @select="handleSelect">
            <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
            ></i>
            <template slot-scope="{ item }">
                <div class="name">{{ item.position }}</div>
            </template>
        </el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="6">
            <el-button type="primary" @click="addBook">立即添加</el-button>
        </el-col>
      </el-form-item>
    </el-form>
</template>

<script>
import { mapState } from "vuex";
import {addBooks} from '@/api'
import qs from 'qs'
export default {
	name: 'AdminAddBooks',
    data() {
        return {
            bookName: '',
            author:'',
            amount:'',
            position: ''
        }
    },
    computed: {
        ...mapState({
            booksList(state) {
                return state.Books.booksList;
            }
        })
    },
    methods: {
        querySearch(queryString, cb) {
            cb(this.booksList);
        },
        handleSelect(item) {
            this.position = item.position
        },
        addBook(){
            let {bookName,author,amount,position} = this
            let infoObj = {bookName,author,amount,position}
            addBooks(qs.stringify(infoObj)).then(res=>{
                if(res.status == 200){
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success',
                    });
                    this.bookName =  '',
                    this.author = '',
                    this.amount = '',
                    this.position =  ''
                    this.$store.dispatch('initBooksList')
                }else{
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                }
            },err=>{
                console.log(err.message);
            })
        }
    }
};
</script>

<style lang="less" scoped>
.beautify-form {
    background: #f6fafd;
    border-radius: 10px;
    box-shadow: 0 2px 14px 0 rgba(30, 144, 255, 0.09);
    padding: 30px 30px 15px 30px;
    margin: 0 auto;
    max-width: 600px;
}
.el-form-item {
    margin-bottom: 22px;
}
.el-input, .el-autocomplete {
    border-radius: 8px;
    border: 1.5px solid #c1e1fe;
    background: #fff;
    font-size: 15px;
}
.el-button {
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 2px;
    background-image: linear-gradient(90deg,#4fc3f7 0,#1976d2 100%);
    border: none;
    color: #fff;
    box-shadow: 0 2px 8px rgba(33, 150, 243, .07);
    transition: all .2s;
}
.el-button:hover {
    background-image: linear-gradient(90deg,#1976d2 0,#4fc3f7 100%);
}
.my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;
        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}
</style>