import Vue from 'vue'
import VueRouter from 'vue-router'

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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
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

export default router
