import { createRouter, createWebHistory } from 'vue-router'
import Signin from '../components/Signin.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Signin
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home/Home.vue')
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
