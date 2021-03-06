import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index';
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
        path: 'notifications',
        component: () => import('@/views/SidebarViews/SidebarNotifications'),
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
      },
      {
        path: 'groups',
        component: () => import('@/views/SidebarViews/SidebarGroups'),
        meta: { requiresAuth: true }
      },
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
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/ResetPasswordView.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPasswordView.vue')
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
    component: () => import('@/views/AdminView.vue'),
    children: [
      {
        path: '',
        redirect: 'users'
      },
      {
        path: 'users',
        component: () => import('@/views/AdminViews/AdminUsersView'),
        meta: { requiresAuth: true }
      },
      {
        path: 'tasks',
        component: () => import('@/views/AdminViews/AdminTasksView'),
        meta: { requiresAuth: true }
      },
      {
        path: 'files',
        component: () => import('@/views/AdminViews/AdminFilesView'),
        meta: { requiresAuth: true }
      },
      {
        path: 'groups',
        component: () => import('@/views/AdminViews/AdminGroupsView'),
        meta: { requiresAuth: true }
      },
    ]
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
    let res = await store.dispatch('users/auth');
    if (res.data == null) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
