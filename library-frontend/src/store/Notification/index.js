import { getNotifications } from '@/api';
import qs from 'qs';

const state = {
unreadCount: 0
};

const mutations = {
SET_UNREAD_COUNT(state, count) {
state.unreadCount = count;
}
};

const actions = {
updateUnreadCount({ commit }, readerIdObj) {
if (!readerIdObj || !readerIdObj.readerId) {
commit('SET_UNREAD_COUNT', 0);
return;
}
getNotifications(qs.stringify(readerIdObj)).then(res => {
if (res.status === 200 && res.data) {
const count = res.data.filter(item => !item.isRead).length;
commit('SET_UNREAD_COUNT', count);
} else {
commit('SET_UNREAD_COUNT', 0);
}
}).catch(() => {
commit('SET_UNREAD_COUNT', 0);
});
}
};

const getters = {
unreadCount: state => state.unreadCount
};

export default {
namespaced: true,
state,
mutations,
actions,
getters
};