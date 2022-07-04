import Vue from 'vue'
import VueRouter from 'vue-router'
import * as userApi from "@/api/user";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/MainView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/SidebarViews/SidebarPlan')
      },
      {
        path: 'tasks',
        component: () => import('@/views/SidebarViews/SidebarTasks'),
        meta: { requiresAuth: true }
      },
      {
        path: 'plan',
        component: () => import('@/views/SidebarViews/SidebarPlan')
      },
      {
        path: 'search',
        component: () => import('@/views/SidebarViews/SidebarSearch')
      },
      {
        path: 'alerts',
        component: () => import('@/views/SidebarViews/SidebarAlerts'),
        meta: { requiresAuth: true }
      },
      {
        path: 'results',
        component: () => import('@/views/SidebarViews/SidebarResults')
      },
      {
        path: 'user',
        component: () => import('@/views/SidebarViews/SidebarUser'),
        meta: { requiresAuth: true }
      },
      {
        path: 'files',
        component: () => import('@/views/SidebarViews/SidebarFiles'),
        meta: { requiresAuth: true }
      },
      {
        path: 'area',
        component: () => import('@/views/SidebarViews/SidebarArea')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/views/RegistrationView.vue')
  },
  {
    path: '/tutorial',
    name: 'tutorial',
    component: () => import('@/views/TutorialView.vue')
  },
  {
    path: '/plan/:id',
    component: () => import('@/views/PlanView.vue')
  },
  {
    path: '/full-screen',
    name: 'full-screen',
    component: () => import('@/views/FullScreenView.vue')
  },
  {
    path: '/admin',
    component: () => import('@/components/admin/AdminMain.vue')
  },
  {
		path: '*',
		component: () => import('@/views/E404View.vue')
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta?.requiresAuth == true && to.name !== 'login') {
    let {data} = await userApi.isAuth();
    if (!data.isAuth) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
