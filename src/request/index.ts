import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStoreHook } from '@/stores/modules/user'

const requestInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

requestInstance.interceptors.request.use((config) => {
  const userStore = useUserStoreHook()
  if (userStore.token)
    config.headers.Authorization = userStore.token
  return config
}, (err) => {
  return Promise.reject(err)
})

requestInstance.interceptors.response.use((res) => {
  const { msg } = res.data

  ElMessage.error(msg || '系统出错')
  return res
}, (err) => {
  return Promise.reject(err)
})

export default <T = any>(config: AxiosRequestConfig) => {
  return requestInstance(config).then((res) => {
    return res.data as T
  })
}
