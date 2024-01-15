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
          component: () => import('../views/welcomeTable/welcomeTable.vue')
        },
        {
          path: '/welcomeIndex',
          name: 'welcome-index',
          component: () => import('../views/welcomeIndex/welcomeIndex.vue')
        },
        {
          path: '/training',
          name: 'welcome-training',
          component: () => import('../views/training/score/score.vue')
        }
      ]
    }
  ]
})

export default router
