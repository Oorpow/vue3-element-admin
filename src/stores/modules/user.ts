/* eslint-disable prefer-promise-reject-errors */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { getUserProfile, userLogin } from '@/request/api'
import { store } from '@/stores'

export const useUserStore = defineStore('userStore', () => {
  const token = useStorage('accessToken', '')
  const userId = ref(0)
  const nickname = ref('')
  const avatar = ref('')
  /** 用户角色编码 => 判断路由权限 */
  const roles = ref<string[]>([])
  /** 用户权限编码 => 判断按钮级别权限 */
  const perms = ref<string[]>([])

  /** 用户登录 */
  function login(loginForm: ApiUser.IUserLoginFormDto) {
    return new Promise<void>((resolve, reject) => {
      userLogin(loginForm).then((res) => {
        const { accessToken, tokenType } = res.data
        token.value = `${tokenType} ${accessToken}`
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  }

  /** 获取当前登录用户信息 */
  function getInfo() {
    return new Promise<ApiUser.IUserProfileResData>((resolve, reject) => {
      getUserProfile().then(({ data }) => {
        if (!data)
          return reject('verify failed, please login again')
        if (!data.roles || data.roles.length <= 0)
          reject('getUserInfo: roles must be a non-null array!')
        userId.value = data.userId
        nickname.value = data.nickname
        avatar.value = data.avatar
        roles.value = data.roles
        perms.value = data.perms
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  return {
    token,
    login,
    getInfo,
  }
})

/** 非setup */
export function useUserStoreHook() {
  return useUserStore(store)
}
