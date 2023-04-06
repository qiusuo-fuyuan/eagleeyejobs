import axios from 'axios';
import crypto from 'crypto';
import { urlParamsToURI } from '../utils/Utils.js';
import { WeChatAuthorizationSessionData, WechatServerResponse, WeChatURLParams, WeChatUserInfo } from './DataTypes.js';
import { CHECK_ACCESS_TOKEN_VALIDITY_PATH, REQUEST_ACCESS_TOKEN_PATH, REQUEST_REFRESH_TOKEN_PATH, REQUEST_USER_INFO_PATH, WECHAT_QRCODE_LOGIN_PATH } from "./WeChatConstants.js";


/**
 * WeChat API Gateway contains all the APIs we will use for calling wechat API
 */

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


    getOpenConnectUrl(state: string): string {
        let urlParams: WeChatURLParams = {}
        urlParams.appId = this.APP_ID
        urlParams.redirect_url = process.env.WECHAT_AUTHORIZE_CALLBACK_URL
        urlParams.response_type = "code"
        urlParams.scope = "snsapi_login"
        urlParams.state = state
        
        return this.WECHAT_HOST + WECHAT_QRCODE_LOGIN_PATH +  urlParamsToURI(urlParams)
    }

    /**
     * send request access token
     */
    async requestAccessToken(authorizationCode: string, state: string): Promise<WechatServerResponse> {
        let urlParams: WeChatURLParams = {}

        urlParams.appId = this.APP_ID
        urlParams.secret = this.APP_SECRET
        urlParams.code = authorizationCode
        urlParams.grant_type = "authorization_code"
        urlParams.state = state

        const res = await axios.get<WechatServerResponse>(this.WECHAT_HOST + REQUEST_ACCESS_TOKEN_PATH +  urlParamsToURI(urlParams))
        return res.data
    }


    /**
     * send refresh access token request
     */
    async refreshAccessToken() {
        let urlParams: WeChatURLParams = {}
        urlParams.appId = this.APP_ID
        urlParams.secret = this.APP_SECRET
        urlParams.refresh_token = this.wechatAuthorizationSessionData.refreshToken
        urlParams.grant_type = "authorization_code"

        const res = await axios.get<WechatServerResponse>(this.WECHAT_HOST + REQUEST_REFRESH_TOKEN_PATH +  urlParamsToURI(urlParams))
        this.wechatAuthorizationSessionData.accessToken = res.data.access_token
        this.wechatAuthorizationSessionData.refreshToken = res.data.refresh_token
    }

    /**
     * request user information by openid
     * https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
     * request the user info
     */
    async requestUserInfo(accessToken: string, openId: string): Promise<WeChatUserInfo> {
        let urlParams: WeChatURLParams = {}
        urlParams.access_token = accessToken
        urlParams.openid = openId
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
    initiateUnifiedOrderPayment() {
        const UNIFIED_ORDER_API = 'pay/unifiedorder' 
    }

    async generateWeChatQRCode(outTradeNo, totalFee, body, notifyUrl, ip) {
        const unifiedOrderUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
    
        const nonceStr = this.generateNonceStr();
        const sign = this.generateSign({
          appid: this.appId,
          mch_id: this.mchId,
          nonce_str: nonceStr,
          body,
          out_trade_no: outTradeNo,
          total_fee: totalFee,
          spbill_create_ip: ip,
          notify_url: notifyUrl,
          trade_type: 'NATIVE',
        });
    
        const xmlData = `
          <xml>
            <appid>${this.appId}</appid>
            <mch_id>${this.mchId}</mch_id>
            <nonce_str>${nonceStr}</nonce_str>
            <sign>${sign}</sign>
            <body>${body}</body>
            <out_trade_no>${outTradeNo}</out_trade_no>
            <total_fee>${totalFee}</total_fee>
            <spbill_create_ip>${ip}</spbill_create_ip>
            <notify_url>${notifyUrl}</notify_url>
            <trade_type>NATIVE</trade_type>
          </xml>
        `;
    
        try {
          const response = await axios.post(unifiedOrderUrl, xmlData, {
            headers: { 'Content-Type': 'application/xml' },
          });
    
          const jsonResponse = await xml2js.parseStringPromise(response.data);
          if (jsonResponse.xml.return_code[0] === 'SUCCESS') {
            return jsonResponse.xml.code_url[0];
          } else {
            throw new Error(jsonResponse.xml.return_msg[0]);
          }
        } catch (error) {
          console.error('Error in generateWeChatQRCode', error);
          throw error;
        }
      }
    
      generateNonceStr(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let nonceStr = '';
    
        for (let i = 0; i < length; i++) {
          nonceStr += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    
        return nonceStr;
      }
    
      generateSign(params) {
        const paramString = Object.keys(params)
          .sort()
          .map(key => `${key}=${params[key]}`)
          .join('&');
    
        const stringSignTemp = `${paramString}&key=${this.apiKey}`;
        const md5hash = crypto.createHash('md5').update(stringSignTemp, 'utf8').digest('hex');
        return md5hash.toUpperCase();
      }
}


export default new WeChatAPIGateway()