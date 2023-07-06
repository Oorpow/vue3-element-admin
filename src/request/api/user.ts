import type { RouteRecordRaw } from "vue-router";
import requestInstance from "..";

export function userLogin(data: ApiUser.IUserLoginFormDto) {
  return requestInstance<ApiInterface.ICommonRes<ApiUser.IAuthLoginResData>>({
    url: "/auth/login",
    method: "POST",
    params: data,
  });
}

export function getCaptcha() {
  return requestInstance<ApiInterface.ICommonRes<ApiUser.IAuthCaptchaResData>>({
    url: "/auth/captcha",
    method: "GET",
  });
}

/** 获取当前登录用户信息 */
export function getUserProfile() {
  return requestInstance<ApiInterface.ICommonRes<ApiUser.IUserProfileResData>>({
    url: "/users/me",
    method: "GET",
  });
}

/** 获取路由列表 */
export function getMenuRoutes() {
  return requestInstance<ApiInterface.ICommonRes<RouteRecordRaw[]>>({
    url: "/menus/routes",
    method: "GET",
  });
}
