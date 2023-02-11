import { defineStore } from 'pinia'
import type { AuthUserModel } from '~/backed_services/models/user.model'

export interface authStoreModel extends AuthUserModel {
  isAuthenticated: boolean
  token: string | undefined
}
export const initialState: authStoreModel = {

}

const authStore = defineStore('auth', () => {
  const isAuthenticated = ref<boolean>(false)
  const token = ref<string | undefined>(undefined)
  const user = ref<AuthUserModel | undefined>(undefined)

  return { token, isAuthenticated, user }
})
export default authStore
