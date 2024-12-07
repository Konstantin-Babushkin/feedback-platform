import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'

export const MAIN_ROUTES = [
  {
    path: '',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
    name: 'dashboard',
  },
  {
    path: '/session/:sessionId',
    component: () => import('@/views/SessionView.vue'),
    meta: { requiresAuth: true },
    name: 'session',
  },
  {
    path: '/create-session',
    component: () => import('@/views/NewSession.vue'),
    meta: { requiresAuth: true },
    name: 'create-session',
  },
  {
    path: '/survey/:sessionId',
    component: () => import('@/views/SurveyView.vue'),
    meta: { requiresAuth: true },
    name: 'survey',
  },
  {
    path: '/account',
    component: () => import('@/views/AccountSettingsView.vue'),
    meta: { requiresAuth: true },
    name: 'account',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main-layout',
      children: MAIN_ROUTES,
      component: MainLayout,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
  ],
})

export default router
