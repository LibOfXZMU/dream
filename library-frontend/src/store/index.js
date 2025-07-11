import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

import Books from './Books'
import User from './User'
import Borrows from './Borrows'
import Reserve from './Reserve'
import Notification from './Notification'


export default new Vuex.Store({
    modules:{
        Books,
        User,
        Borrows,
        Reserve,
        Notification
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            paths: ["Books", "User","Borrows","Reserve", "Notification"]
        })
    ]
})