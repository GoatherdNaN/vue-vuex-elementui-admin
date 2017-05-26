import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import './assets/css/reset.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach(({meta, path}, from, next) => {
    let { auth = true } = meta
    let isLogin = Boolean(store.state.username) //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
