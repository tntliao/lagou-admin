import { createRouter, createWebHistory } from 'vue-router'
import Signin from '../components/Signin.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Signin
  },
  {
    path: '/index/user',
    name: 'User',
    component: () => import('../components/User/User.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
