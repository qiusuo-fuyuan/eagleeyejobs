export type WechatServerResponse = {
    access_token: string 
    expires_in: number 
    refresh_token: string
    openid: string 
    scope: string
    unionid: string
}

export type WeChatURLParams = {
    appId: string
    secret: string
    code: string
    grant_type: string
    access_token: string
    refresh_token: string
    openid: string
    lang: string
}

export type WeChatUserInfo = {
    openid: string
    nickname: string
    sex: number
    province: string
    city: string
    headimgurl: string
    priviledge: string[]
    unionid: string
    errcode: string
    errmsg: null
}