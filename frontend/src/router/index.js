import { createRouter, createWebHistory } from 'vue-router'
import Signin from '../components/Signin.vue'
import Home from '../components/Home'
import User from '../view/User.vue'
import Position from '../view/Position.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Signin
  },
  {
    path: '/index',
    name: 'User',
    component: Home,
    children: [
      {
        path: 'user',
        component: User
      },
      {
        path: 'position',
        component: Position
      }
    ]
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
