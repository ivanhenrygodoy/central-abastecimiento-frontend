import NotFound404 from '@/modules/auth/common/NotFound404.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { authService } from '@/modules/auth/services/authService'

// Extender el tipo de meta para incluir requiresAuth
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    //Auth
    path: '/auth',
    // redirect: '/login',
    redirect: { name: 'login' },
    component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/modules/auth/pages/LoginPage.vue'),
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    // Mantenimiento
    path: '/indexMantenimiento',
    name: 'indexMantenimiento',
    component: () => import('@/modules/mantenimientos/pages/indexMantenimiento.vue'),
    meta: { requiresAuth: true },
  },
  {
    // Mantenimiento Productos
    path: '/productos',
    name: 'productos',
    component: () => import('@/modules/mantenimientos/pages/indexMantProductos.vue'),
    meta: { requiresAuth: true },
  },
  {
    // Redirigir la raíz al login
    path: '/',
    redirect: { name: 'login' },
  },
  {
    //Not Found
    path: '/:pathMatch(.*)*',
    component: NotFound404,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard de navegación global para proteger rutas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = authService.isAuthenticated()

  if (requiresAuth && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está logueado
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    // Si el usuario ya está logueado y trata de ir al login, redirigir al dashboard
    next({ name: 'indexMantenimiento' })
  } else {
    // Permitir la navegación
    next()
  }
})

export default router
