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
      path: '/stories',
      name: 'stories',
      component: () => import('../pages/Stories.vue')
    },
    {
      path: '/question/:questionId',
      name: 'question',
      component: () => import('../pages/QuestionDetail.vue')
    },
    {
      path: '/job/:jobId',
      name: 'job',
      component: () => import('../pages/JobDetails.vue')
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',

      component: () => import('../pages/AboutUs.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue')
    },
    {
      path: '/:provider/authorizationCallback',
      name: 'authorizationCallback',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AuthorizationCallback.vue')
    }


  ]
})

export default router
