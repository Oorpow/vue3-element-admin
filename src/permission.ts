import type { RouteRecordRaw } from "vue-router";
import router from "./router";
import { usePermissionStoreHook } from "./stores/modules/permission";
import { useUserStoreHook } from "./stores/modules/user";

const permissionStore = usePermissionStoreHook();

/**
 * 是否属于白名单中的路径
 * @param path 要访问的路由
 */
function isInWhiteList(path: string) {
  const whiteList = ["/login"];
  return whiteList.includes(path);
}

// router.beforeEach(async (to, from, next) => {
//   const isLogin = localStorage.getItem('accessToken')
//   if (isLogin) {
//     // 已登录，直接跳转至首页
//     if (to.path === '/login') { next({ path: '/' }) }
//     else {
//       const userStore = useUserStoreHook()
//       const hasRoles = userStore.roles && userStore.roles.length > 0
//       if (hasRoles) {
//         if (to.matched.length === 0)
//           from.name ? next({ name: from.name }) : next('/404')
//         else
//           next()
//       }
//       // 已登录，前往其它不属于白名单中的路由，需要先添加动态路由
//       else {
//         // NOTE: 1. 获取用户权限列表，根据角色生成动态路由
//         try {
//           const { roles } = userStore.getInfo()
//           const accessRoutes = await permissionStore.generateRoutes(roles)
//           // NOTE: 2. 添加到路由中
//           accessRoutes.forEach((route: RouteRecordRaw) => {
//             router.addRoute(route)
//           })
//           next({ ...to, replace: true })
//         }
//         catch (error) {
//           console.log(error)

//           // await userStore.resetToken()
//           // next(`/login?redirect=${to.path}`)
//         }
//       }
//     }
//   }
//   else {
//     // 用户未登录的情况下，允许访问白名单中的路由
//     if (isInWhiteList(to.path))
//       next()
//     else
//       next(`/login?redirect=${to.path}`)
//   }
// })

// router.afterEach(() => {
//   // 关闭NProgress进度条
// })
