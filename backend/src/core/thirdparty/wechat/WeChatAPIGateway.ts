import axios from 'axios';
import crypto from 'crypto';
import { WeChatAuthorizationSessionData, WechatServerResponse, WeChatURLParams, WeChatUserInfo } from './DataTypes.js';
import { CHECK_ACCESS_TOKEN_VALIDITY_PATH, REQUEST_ACCESS_TOKEN_PATH, REQUEST_REFRESH_TOKEN_PATH, REQUEST_USER_INFO_PATH, WECHAT_QRCODE_LOGIN_PATH } from "./WeChatConstants.js";


/**
 * WeChat API Gateway contains all the APIs we will use for calling wechat API
 */

 function urlParamsToURI(dict: WeChatURLParams) {
    var str = [];
    for (const [key, value] of Object.entries(dict)) {
        if(typeof value !==  'undefined')  {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
    }
    return str.join("&");
}

export class WeChatAPIGateway {
    private APP_ID: string
    private APP_SECRET: string
    private WECHAT_HOST: string

    private wechatAuthorizationSessionData: WeChatAuthorizationSessionData

    constructor() {
        this.APP_ID = process.env.WECHAT_APP_ID
        this.APP_SECRET = process.env.WECHAT_API_SECRET
        this.WECHAT_HOST = process.env.WECHAT_API_HOST

        this.wechatAuthorizationSessionData = {}
    }


    getOpenConnectUrl(): string {
        const sessionState = crypto.randomUUID()
        this.wechatAuthorizationSessionData.state = sessionState
        
        let urlParams: WeChatURLParams
        urlParams.appId = this.APP_ID
        urlParams.redirect_url = process.env.WECHAT_AUTHORIZE_CALLBACK_URL
        urlParams.response_type = "code"
        urlParams.scope = "snsapi_login"
        urlParams.state = this.wechatAuthorizationSessionData.state
        
        return this.WECHAT_HOST + WECHAT_QRCODE_LOGIN_PATH +  urlParamsToURI(urlParams)
    }

    /**
     * send request access token
     */
    async requestAccessToken(authorizationCode: string): Promise<WechatServerResponse> {
        let urlParams: WeChatURLParams

        urlParams.appId = this.APP_ID
        urlParams.secret = this.APP_SECRET
        urlParams.code = authorizationCode
        urlParams.grant_type = "authorization_code"

        const res = await axios.get<WechatServerResponse>(this.WECHAT_HOST + REQUEST_ACCESS_TOKEN_PATH +  urlParamsToURI(urlParams))
        
    }


    /**
     * send refresh access token request
     */
    async refreshAccessToken() {
        let urlParams: WeChatURLParams
        urlParams.appId = this.APP_ID
        urlParams.secret = this.APP_SECRET
        urlParams.refresh_token = this.refreshToken
        urlParams.grant_type = "authorization_code"

        const res = await axios.get<WechatServerResponse>(this.WECHAT_HOST + REQUEST_REFRESH_TOKEN_PATH +  urlParamsToURI(urlParams))
        this.accessToken = res.data.access_token
        this.refreshToken = res.data.refresh_token
    }

    /**
     * request user information by openid
     * https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
     * request the user info
     */
    async requestUserInfo(): Promise<WeChatUserInfo> {
        let urlParams: WeChatURLParams
        urlParams.access_token = this.accessToken
        urlParams.openid = this.openId
        urlParams.lang = "zh_CN"

        const res = await axios.get<WeChatUserInfo>(this.WECHAT_HOST + REQUEST_USER_INFO_PATH +  urlParamsToURI(urlParams))
        return res.data
    }


    /**
     * Wechat payment API. We should request wechat to generate the QR code with specific amount, then user can scan
     * the scan code to finish payment.
     * 
     * third party request wechat => wechat return qr code => user scan qr code to finish the payment. Our frontend will 
     * update the qr code to reflect the user payment has finished
     */
    requestPayment() {
        
    }
}