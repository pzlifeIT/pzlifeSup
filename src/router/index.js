import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/common/Home';
import index from '@/components/page/index';
import login from '@/components/login/login';

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/',
        component: Home,
        children: [{
            path: '',
            component: index
        }, {
            path: '/index',
            component: index
        }]
    }, {
        path: '/login',
        component: login
    }]
})