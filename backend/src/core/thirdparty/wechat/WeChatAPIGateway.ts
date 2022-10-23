import axios from 'axios';
import { WechatServerResponse, WeChatURLParams } from './DataTypes.js';
import { CHECK_ACCESS_TOKEN_VALIDITY_PATH, REQUEST_ACCESS_TOKEN_PATH, REQUEST_REFRESH_TOKEN_PATH, REQUEST_USER_INFO_PATH } from "./WeChatConstants.js";


/**
 * WeChat API Gateway contains all the APIs we will use for calling wechat API
 */

 function dictToURI(dict: WeChatURLParams) {
    var str = [];
    for(var p in dict){
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dict[p]));
    }
    return str.join("&");
}

class WeChatAPIGateway {
    APP_ID: string
    APP_SECRET: string
    WECHAT_HOST: string

    accessToken: string
    refreshToken: string

    constructor() {
        this.APP_ID = process.env.WECHAT_APP_ID
        this.APP_SECRET = process.env.WECHAT_API_SECRET
        this.WECHAT_HOST = process.env.WECHAT_API_HOST
    }

    /**
     * send request access token
     */
    async requestAccessToken(authorizationCode: string) {
        let urlParams: WeChatURLParams
        urlParams.appId = this.APP_ID
        urlParams.secret = this.APP_SECRET
        urlParams.code = authorizationCode
        urlParams.grant_type = "authorization_code"

        const res = await axios.get<WechatServerResponse>(this.WECHAT_HOST + REQUEST_ACCESS_TOKEN_PATH +  dictToURI(urlParams))
        this.accessToken = res.data.access_token
        this.refreshToken = res.data.refresh_token
    }


    /**
     * send refresh access token request
     */
    refreshAccessToken() {

    }

    /**
     * request the user info
     */
    requestUserInfo() {

    }


    requestPayment() {
        
    }
}