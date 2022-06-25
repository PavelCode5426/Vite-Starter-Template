import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import router from './globals/config/router'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  router,
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./globals/plugins/**/*.ts')).forEach(i => i.install?.(ctx))
  },
)
