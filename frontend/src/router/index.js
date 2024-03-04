import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '@/views/DashBoard'
import LoginPage from '@/views/LoginPage'
import RegisterPage from '@/views/RegisterPage'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name:'Dashboard',component: DashBoard },
    { path: '/login', name:'Login',component: LoginPage },
    { path: '/register', name:'Register',component: RegisterPage }
  ],
});

export default router;
