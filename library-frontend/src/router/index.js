import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import LoginRegister from '@/pages/LoginRegister'
import HomePage from '@/pages/Home' // 修改点：将 Home 改为 HomePage
import Entertainment from '@/pages/Home/Entertainment'
import Introduce from '@/pages/Home/Introduce'
import SearchBooks from '@/pages/Home/SearchBooks'
import AdminSubscribe from '@/pages/Home/AdminSubscribe'
import AdminBorrows from '@/pages/Home/AdminBorrows'
import AdminPerson from '@/pages/Home/AdminPerson'
import AdminAddBooks from '@/pages/Home/AdminAddBooks'

import ReaderBorrows from '@/pages/Home/ReaderBorrows'
import ReaderRserve from '@/pages/Home/ReaderRserve'
import ReaderNotifications from '@/pages/Home/ReaderNotifications'


export default new VueRouter({
    routes: [{
        path: '*',
        redirect: '/LoginRegister'
    },
        {
            path: '/LoginRegister',
            component: LoginRegister
        },
        {
            path: '/home',
            component: HomePage, // 修改点：将 Home 改为 HomePage
            redirect: '/home/introduce',
            children: [
                {
                    //    主页介绍
                    path: 'introduce',
                    component: Introduce,
                },
                {
                    //    书籍查询
                    path: 'search',
                    component: SearchBooks,
                },
                {
                    //    娱乐页面
                    path: 'entertainment',
                    component: Entertainment,
                },
                // 管理员
                {
                    //    人员管理
                    path: 'person',
                    component: AdminPerson,
                },
                {
                    //    管理员管理借阅记录
                    path: 'adminborrows',
                    component: AdminBorrows,
                },
                {
                    //    管理员管理预约记录
                    path: 'adminsubcribe',
                    component: AdminSubscribe,
                }, {
                    //    管理员添加图书
                    path: 'adminaddbooks',
                    component: AdminAddBooks,
                },
                // 读者
                {
                    //    读者借阅记录
                    path: 'readerborrows',
                    component: ReaderBorrows,
                },
                {
                    //    读者预约记录
                    path: 'readerreserve',
                    component: ReaderRserve,
                },
                {
                    //    读者通知页面
                    path: 'readernotifications',
                    component: ReaderNotifications,
                },
            ]
        }
    ]
})