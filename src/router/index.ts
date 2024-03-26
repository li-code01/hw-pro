import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/welcome/welcome.vue'),
      children: [
        {
          path: '/welcomeTable',
          name: 'welcome-table',
          meta: { requiresAuth: true }, // 添加meta字段
          component: () => import('../views/welcomeTable/welcomeTable.vue')
        },
        {
          path: '/welcomeIndex',
          name: 'welcome-index',
          meta: { requiresAuth: true }, // 添加meta字段
          component: () => import('../views/welcomeIndex/welcomeIndex.vue')
        },
        {
          path: '/training',
          name: 'welcome-training',
          meta: { requiresAuth: true }, // 添加meta字段
          component: () => import('../views/training/score/score.vue')
        },
        {
          path: '/mark',
          name: 'welcome-mark',
          meta: { requiresAuth: true }, // 添加meta字段
          component: () => import('../views/mark/mark.vue')
        },
        {
          path: '/my',
          name: 'welcome-my',
          meta: { requiresAuth: true }, // 添加meta字段
          component: () => import('../views/my/my.vue')
        }
      ]
    }
  ]
})
// 在router.js文件中
router.beforeEach((to, from, next) => {
  // 进行路由守卫逻辑
  if (to.meta.requiresAuth) {
    // 检查用户是否已登录
    const isLoggedIn = window.localStorage.getItem('token')
    if (isLoggedIn) {
      next()
    } else {
      next({ name: 'login' }) // 跳转到登录页面
    }
  } else {
    next()
  }
})
export default router
