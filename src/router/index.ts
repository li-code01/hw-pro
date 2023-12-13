import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
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
        }
      ]
    }
  ]
})

export default router
