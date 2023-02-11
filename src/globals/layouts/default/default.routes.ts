import {RouteRecordRaw} from 'vue-router'
import {getLayoutRoutes} from '@/helpers/router.load'

const requireModules = import.meta.globEager('/src/modules/**/*.routes.ts')
const layoutRoutes = getLayoutRoutes('Admin',requireModules)

const routes:RouteRecordRaw[] = [
    {
        path:'',
        component:() => import('./DefaultLayout.vue'),
        children: layoutRoutes
    }
]
export default routes
