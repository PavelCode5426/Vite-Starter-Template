import type { RouteRecordRaw } from 'vue-router'
import type { LayoutRouteRecordRaw } from '~/helpers/router.load'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'server-error',
    name: 'server-error-page',
    component: () => import('../pages/ServerErrorPage.vue'),
    meta: {
      title: 'Error Inesperado',
    },
    layout: ['Default'],
  },
  {
    path: 'acceso-denegado',
    name: 'acceso-denegado-page',
    component: () => import('../pages/AccesoDenegado.vue'),
    meta: {
      title: 'Acceso Denegado',
    },
    layout: ['Admin'],
  },
  {
    path: 'no-encontrado',
    name: 'no-encontrado-page',
    component: () => import('../pages/NoEncontrado.vue'),
    meta: {
      title: 'No Encontrado',
    },
    layout: ['Admin'],
  },
]
export default routes
