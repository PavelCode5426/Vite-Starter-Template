import {RouteRecordRaw} from 'vue-router'
import {getLayoutRoutes} from '@/helpers/router.load'

const requireModules = import.meta.globEager('/src/modules/**/*.routes.ts')
const admin_childrens = getLayoutRoutes('Admin',requireModules)

const routes:RouteRecordRaw[] = [
    {
        path:'',
        component:() => import('./Sample.vue'),
        children: admin_childrens
    }
]
export default routes