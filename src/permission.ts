import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "./router";

import { usePermissionStoreHook } from "./stores/modules/permission";
import { useUserStoreHook } from "./stores/modules/user";

NProgress.configure({
  showSpinner: false,
});

const permissionStore = usePermissionStoreHook();

/**
 * 是否属于白名单中的路径
 * @param path 要访问的路由
 */
function isInWhiteList(path: string) {
  const whiteList = ["/login"];
  return whiteList.includes(path);
}

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = localStorage.getItem("accessToken");

  if (hasToken) {
    // NOTE: 已登录，获取当前用户的角色，筛选出有权访问的路由列表，然后添加到路由中
    const userStore = useUserStoreHook();
    const hasRoles = userStore.roles && userStore.roles.length > 0;
    if (hasRoles) {
      next();
    } else {
      try {
        // NOTE: 没有权限列表，手动获取
        const { roles } = await userStore.getInfo();
        const accessRoutes = await permissionStore.generateRoutes(roles);
        accessRoutes.forEach((route) => {
          router.addRoute(route);
        });
        next({ ...to, replace: true });
      } catch (error) {
        NProgress.done();
      }
    }
  } else {
    if (isInWhiteList(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  // 关闭NProgress进度条
  NProgress.done();
});
