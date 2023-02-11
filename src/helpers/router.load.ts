import type { RouteRecordRaw } from 'vue-router'
import { functions } from 'lodash-es'

export interface DefaultRouterMeta {
  title: string
  accesible: Function
}
export interface LayoutRouteRecordRaw extends RouteRecordRaw {
  meta: DefaultRouterMeta
  layout: string[]
}

export function getRoutes(requireModule: any) {
  let routes: any[] = []
  Object.keys(requireModule).forEach((fileName) => {
      const elem = requireModule[fileName]
      routes = routes.concat(elem.default as any)
    },
  )
  return routes
}
export function getLayoutRoutes(layout: string, requireModule: any) {
  return getRoutes(requireModule).filter((item: any) => {
    let is = false
    if (item.layout)
      is = item.layout.includes(layout)
    return is
  })
}
export function putPrefixInRoutes(prefix: string, routes: RouteRecordRaw[]) {
  routes.forEach(i => i.path = prefix + i.path)
}

export default { getRoutes, getLayoutRoutes }
