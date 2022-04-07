import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/MainView.vue'),
    children: [
      {
        path: 'tasks',
        component: () => import('../views/SidebarViews/SidebarTasks')
      },
      {
        path: 'plan',
        component: () => import('../views/SidebarViews/SidebarPlan')
      },
      {
        path: 'search',
        component: () => import('../views/SidebarViews/SidebarSearch')
      },
      {
        path: 'alerts',
        component: () => import('../views/SidebarViews/SidebarAlerts')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/RegistrationView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
