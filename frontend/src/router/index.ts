import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('../pages/JobSearch.vue')
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('../pages/Forum.vue')
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutUs.vue')
    }
  ]
})

export default router
