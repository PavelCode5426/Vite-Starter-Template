import {RouteRecordRaw} from "vue-router";

export function getRoutes(requireModule:any) {
    let routes:any[] = []
    Object.keys(requireModule).forEach((fileName) => {
            const elem = requireModule[fileName]
            routes = routes.concat(elem.default as any)
        }
    )
    return routes
}

export function getLayoutRoutes(layout:string,requireModule:any) {
    return getRoutes(requireModule).filter((item:any) => item.layout.indexOf(layout)!=-1)
}

export function putPrefixInRoutes(prefix:string,routes:RouteRecordRaw[]){
    routes.forEach(i => i.path = prefix+i.path)
}

export default {getRoutes, getLayoutRoutes,putPrefixInRoutes}
