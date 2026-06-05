import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/listed',
      name: 'listed',
      component: () => import('../views/ListedView.vue')
    },
    {
      path: '/otc',
      name: 'otc',
      component: () => import('../views/OtcView.vue')
    },
    {
      path: '/company/:id',
      name: 'company',
      component: () => import('../views/CompanyView.vue')
    }
  ]
})

export default router