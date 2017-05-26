import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login', 
            meta: { auth: false },
            component: resolve => require(['../page/Login.vue'], resolve)
        },
        {
            path: '/pageone',
            component: resolve => require(['../page/Main.vue'], resolve),
            children: [{
                    path: '',
                    component: resolve => require(['../page/PageOne.vue'], resolve)
                },
                {
                    path: '/pagetwo',
                    component: resolve => require(['../page/pagetwo.vue'], resolve)
                }
            ]
        }
    ]
})
