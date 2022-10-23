import { type } from "os"

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
    refresh_token: string
}