import Vue from 'vue';
import Router from 'vue-router';

// import Home from '@/components/common/Home';
// import index from '@/components/page/index';
// import marketing from '@/components/page/marketing';
// import modifyPwd from '@/components/page/modifyPwd';
// import login from '@/components/login/login';

const Home = r => require.ensure([], () => r(require('../components/common/Home')), 'Home')
const index = r => require.ensure([], () => r(require('../components/page/index')), 'index')
const marketing = r => require.ensure([], () => r(require('../components/page/marketing')), 'marketing')
const editMarketing = r => require.ensure([], () => r(require('../components/page/editMarketing')), 'editMarketing')
const enrollment = r => require.ensure([], () => r(require('../components/page/enrollment')), 'enrollment')
const modifyPwd = r => require.ensure([], () => r(require('../components/page/modifyPwd')), 'modifyPwd')
const login = r => require.ensure([], () => r(require('../components/login/login')), 'login')
const tabble = r => require.ensure([], () => r(require('../components/page/tabble')), 'tabble')
const account = r => require.ensure([],()=>r(require('../components/page/account')),'account')
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/',
        component: Home,
        children: [{
            path: '',
            component: marketing
        }, {
            path: '/index',
            component: index
        }, {
            path: '/marketing',
            component: marketing
        }, {
          path: '/editMarketing',
          component: editMarketing
      }, {
            path: '/enrollment',
            component: enrollment
        }, {
            path: '/modifyPwd',
            component: modifyPwd
        },{
          path:'/account',
          component:account
        }]
    }, {
        path: '/login',
        component: login
    },{
      path:'/tabble',
      component:tabble
    }]
})
