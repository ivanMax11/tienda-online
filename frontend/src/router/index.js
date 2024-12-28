import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/agregar-producto',
      name: 'AgregarProducto',
      component: () => import('@/views/AgregarProductoView.vue')
    },
    {
      path: '/Productos-component',
      name: 'ProductosComponent',
      component: () =>  import('@/components/ProductosComponent.vue')
    },
    {
      path: '/login',
      name: 'LoginComponent',
      component: () => import('@/components/LoginComponent.vue')
    },
    {
      path: '/register',
      name: 'RegisterComponent',
      component: () => import('@/components/RegisterComponent.vue')
    },
    {
      path: '/cart',
      name: 'CartComponent',
      component: () => import('@/components/CartComponent.vue')
    },
    {
      path: '/producto/:id',
      name: 'DetallesProductos',
      component: () => import('@/views/DetallesProductos.vue'),
      props: true,
    },
  ],
})

export default router
