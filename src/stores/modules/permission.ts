/* eslint-disable array-callback-return */
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'
import { store } from '@/stores'
import { getMenuRoutes } from '@/request/api'
import { constantRoutes } from '@/router'

/** 获取views资源目录 */
const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layout/index.vue')

/**
 * 利用route.meta.roles来决定当前用户是否有权访问
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    if (roles.includes('ROOT'))
      return true
    return roles.some((role) => {
      if (route.meta?.roles !== undefined)
        return (route.meta.roles as string[]).includes(role)
    })
  }
  return false
}

/**
   * 递归过滤出用户有权访问的路由
   * @param routes
   * @param roles
   */
function filterAccessRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const asyncRoutes: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tempRoute = { ...route }

    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.component?.toString() === 'Layout') {
        tempRoute.component = Layout
      }
      else {
        const component = modules[`../../views/${tempRoute.component}.vue`]
        if (component)
          tempRoute.component = component

        else
          tempRoute.component = modules['../../views/error-page/404.vue']
      }

      if (tempRoute.children)
        tempRoute.children = filterAccessRoutes(tempRoute.children, roles)

      asyncRoutes.push(tempRoute)
    }
  })

  return asyncRoutes
}

export const usePermissionStore = defineStore('permissionStore', () => {
  const routes = ref<RouteRecordRaw[]>([])

  /**
   * 将静态路由和动态路由进行拼接，形成完整的路由表
   * @param newRoutes
   */
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes)
  }

  /**
   * 生成动态路由
   * @param roles 用户角色集合
   */
  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      getMenuRoutes().then(({ data }) => {
        // NOTE: 1. 根据角色获取有访问权限的路由
        const accessRoutes = filterAccessRoutes(data, roles)
        setRoutes(accessRoutes)
        resolve(accessRoutes)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  return {
    routes,
    setRoutes,
    generateRoutes,
  }
})

export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
