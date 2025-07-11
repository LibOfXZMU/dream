import {initCommentsList} from '@/api'
import moment from 'moment';

const state = {
    commentsList:[]
}

const actions = {
    initCommentsList({commit}){
        initCommentsList().then(res=>{
            commit('INITCOMMENTSLIST',res.data)
        },err=>console.log(err.message))
    }
}

const mutations = {
    INITCOMMENTSLIST(state,data){
        // 保存聊天室消息数组
        data = data.map(item => ({...item, date: moment.utc(item?.date).format('YYYY-MM-DD HH:mm:ss')}))
        state.commentsList = data.filter(item=>{
            return item.status === 1
        })
    }
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}