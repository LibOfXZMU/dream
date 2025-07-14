import {initReserve, initReservelist} from '@/api'
import qs from "qs"
import moment from 'moment';

const state = {
    reserveList: [],
    reserve: [],
}

const actions = {
    initReserveList({commit}) {
        initReservelist().then(res => {
            console.log(res);

            commit('INITRESERVELIST', res.data)
        }, err => console.log(err.message))
    },
    initReserve({commit}, readerObj) {
        console.log(qs.stringify(readerObj));
        let newObj = qs.stringify(readerObj)
        initReserve(newObj).then(res => {
            console.log(res);
            commit('INITRESERVE', res.data)
        }, err => {
            console.log(err.message);
        })
    },

}

const mutations = {
    INITRESERVELIST(state, data) {
        // 管理员保存预订图书记录
        state.reserveList = data?.map(item => ({...item, date: moment.utc(item?.date).format('YYYY-MM-DD HH:mm:ss')}))
    },
    INITRESERVE(state, data) {
        // 读者保存预订图书记录
        state.reserve = data?.map(item => ({
            ...item,
            date: moment.utc(item?.date).format('YYYY-MM-DD HH:mm:ss'),
            bookName: '《' + item.bookName + '》'
        }))
    },
    // 新增：直接从 state.reserve 中移除一个预约项
    REMOVE_RESERVE(state, reserveItem) {
        state.reserve = state.reserve.filter(item => {
            // 通过 bookId 和 date 来唯一确定并过滤掉要删除的预约记录
            return !(item.bookId === reserveItem.bookId && item.date === reserveItem.date);
        });
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}