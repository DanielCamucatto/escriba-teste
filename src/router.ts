import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/', 
    component: () => import('./views/LoginForm.vue'),
  },
  {
    path: '/home', 
    component: () => import('./views/Home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
