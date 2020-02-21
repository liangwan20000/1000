import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/welcome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/home'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import(/* webpackChunkName: "about" */ '@/views/welcome')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import(/* webpackChunkName: "about" */ '@/views/article')
      },
      {
        path: '/articleadd',
        name: 'articleadd',
        component: () => import(/* webpackChunkName: "about" */ '@/views/articleadd')
      },
      {
        path: '/articleedit/:aid',
        name: 'articleedit',
        component: () => import(/* webpackChunkName: "about" */ '@/views/articleedit')
      },
      {
        path: '/account',
        name: 'account',
        component: () => import(/* webpackChunkName: "about" */ '@/views/account')
      },
      {
        path: '/material',
        name: 'material',
        component: () => import(/* webpackChunkName: "about" */ '@/views/material')
      },
      {
        path: '/fans',
        name: 'fans',
        component: () => import(/* webpackChunkName: "about" */ '@/views/fans')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
  Nprogress.set(0.4);
  // to: 去哪里
  // form: 从哪里来
  // next: 没有特殊情况该方法都要执行
  //    next(false)   路由停止执行
  //    next('/home') 要执行的具体路由
  //    next()   当前路由没有阻拦继续执行
  var token = window.sessionStorage.getItem('token');
  if (!token && to.path !== '/login') {
    if (form.path === '/login') {
      return next();
    };
    return next('/login')
  };
  next()
})

router.afterEach((to, form, next) => {
  Nprogress.done();
})

export default router
