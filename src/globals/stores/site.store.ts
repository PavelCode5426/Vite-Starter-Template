import {defineStore} from "pinia";

export type siteModel = {
    title: string|undefined,
    lastTitle:string|undefined,
    isLoading: boolean|undefined,
}
const initialState:siteModel = {
    title: "Cargando...",
    lastTitle:undefined,
    isLoading: true
}

const siteStore = defineStore('site',{
    state:() => initialState,
    actions: {
        setAttr(data:siteModel) {
            Object.keys(data).forEach(i => this[i] = data[i])
        }
    },
    getters: {
    }
})

export default siteStore