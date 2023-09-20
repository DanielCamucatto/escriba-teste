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
  {
    path: '/produtos', 
    component: () => import('./views/Produto.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
