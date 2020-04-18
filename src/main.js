// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import { request } from './assets/js/ajax'
import { glbalData } from './assets/js/globalData'
import './assets/js/rem'
//引入element-ui的默认CSS样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$request = request
Vue.prototype.$glbalData = glbalData

Vue.use(ElementUI);
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('sup_con_id')
  if (!token && to.path !== '/login') {
    next({
      path: '/login',
      query: {redirect: to.fullPath} // 将要跳转路由的path作为参数，传递到登录页面
    })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    beforeCreate: function() {
        console.log('beforeCreated.....');
    }
})
