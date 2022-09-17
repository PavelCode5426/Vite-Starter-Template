interface ImportMetaEnv {
    readonly VITE_URL_SERVER: string
    readonly VITE_BASE_URL: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}