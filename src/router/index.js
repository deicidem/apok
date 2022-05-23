import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/MainView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/SidebarViews/SidebarTasks')
      },
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
      },
      {
        path: 'results',
        component: () => import('../views/SidebarViews/SidebarResults')
      },
      {
        path: 'person',
        component: () => import('../views/SidebarViews/SidebarPerson')
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
  },
  {
    path: '/tutorial',
    name: 'tutorial',
    component: () => import('../views/TutorialView.vue')
  },
  {
    path: '/plan/:id',
    component: () => import('../views/PlanView.vue')
  },
  {
		path: '*',
		component: () => import('../components/AppE404.vue')
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
