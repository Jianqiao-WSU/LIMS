import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import Main from '@/pages/Main';
import Factor from '@/components/Factor';
import Method from '@/components/Method';
import Analysis from '@/components/Analysis';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: 'Factor', component: Factor },
        { path: 'Method', component: Method },
        { path: 'Analysis', component: Analysis },
        // ...其他子路由
      ],
    },
  ],
});
