import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    // ⼦路由请求会经过⽗路由，直接给⽗路由设置登录检测更加简单，适合所有⼦路由均需要登录的情况
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      },
      // 添加菜单路由
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/create')
      },
      // 编辑菜单路由
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit')
      },
      // 添加资源路由
      {
        path: '/resource/create',
        name: 'resource-create',
        component: () => import(/* webpackChunkName: 'resource-create' */'@/views/resource/create')
      },
      // 编辑资源路由
      {
        path: '/resource/:id/edit',
        name: 'resource-edit',
        component: () => import(/* webpackChunkName: 'resource-edit' */'@/views/resource/edit')
      },
      // 分配菜单路由
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu'),
        props: true
      },
      // 分配资源路由
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'alloc-resource' */'@/views/role/alloc-resource'),
        props: true
      },
      // 新增课程路由
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */'@/views/course/create')
      },
      // 编辑课程路由
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-edit' */'@/views/course/edit'),
        props: true
      },
      // 课程内容路由
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */'@/views/course/section'),
        props: true
      },
      // 课时上传视频
      {
        path: '/course/:courseId/:lessonId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-video' */'@/views/course/video'),
        props: true
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检测 store 中的 user是否存在
    if (!store.state.user) {
      // 未登录，导航跳转到登录⻚
      next({
        name: 'login',
        // 通过 query 属性给 URL 设置查询字符串参数（键值均为⾃定义）
        query: {
          // path 仅包含路径，fullpath 为完整 url（包含查询字符串参数等信息）
          redirect: to.fullPath
        }
      })
    } else {
      // 已经登录，允许通过
      next()
    }
  } else {
    // ⽆需登录，允许通过
    next()
  }
})

export default router
