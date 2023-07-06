// 存放页面中需要用到的接口类型
declare namespace LoginView {
  /** 登录表单校验 */
  interface IloginFormRule {
    username: string;
    password: string;
    verifyCode: string;
  }
}
