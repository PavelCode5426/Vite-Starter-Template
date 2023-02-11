import type { LayoutRouteRecordRaw } from '~/helpers/router.load'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: '',
    name: 'login-page',
    component: () => import('../pages/LoginPage.vue'),
    meta: {
      title: 'Inicio de Sesion',
    },
    layout: ['Default'],
  },
]

export default routes
