declare namespace ApiInterface {
    /** 接口通用的返回属性 */
    interface ICommonRes<T = any> {
        code: string
        msg: string
        data: T
    }
}

declare namespace ApiUser {
    /** 用户登录表单 */
    interface IUserLoginFormDto {
        username: string
        password: string
        verifyCodeKey?: string
        verifyCode?: string
    }

    /** 用户登录返回结果 */
    interface IAuthLoginResData {
        accessToken?: string
        tokenType?: string
        refreshToken?: string
        expires?: string
    }

    /** 验证码返回结果 */
    interface IAuthCaptchaResData {
        verifyCodeKey: string
        verifyCodeBase64: string
    }

    /** 获取当前登录用户信息的返回结果 */
    interface IUserProfileResData {
        userId: number
        nickname: string
        avatar: string
        roles: string[]
        perms: string[]
    }

    /** 获取登录用户路由列表 */
    interface IUserMenuRouteResData {
        path?: string
        component?: string
        redirect?: string
        name?: string
        meta?: any
        children?: IUserMenuRouteResData[]
    }
}
