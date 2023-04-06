import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';
import  xml2js from 'xml2js';
import https from 'https';
import { urlParamsToURI } from '../utils/Utils.js';
import { WeChatAuthorizationSessionData, 
  WechatServerResponse, 
  WeChatURLParams, 
  WeChatUserInfo,
  WeChatUnifiedOrderRequest, 
  WeChatUnifiedOrderResponse,
  WeChatQueryOrderRequest,
  WeChatQueryOrderResponse} from './DataTypes.js';
import { fromXml, generateNonceStr, generateSign, toXml } from './Utils.js';
import { CHECK_ACCESS_TOKEN_VALIDITY_PATH, 
  REQUEST_ACCESS_TOKEN_PATH, 
  REQUEST_REFRESH_TOKEN_PATH, 
  REQUEST_USER_INFO_PATH, 
  WECHAT_QRCODE_LOGIN_PATH, 
  UNIFIED_ORDER_PATH } from "./WeChatConstants.js";


/**
 * WeChat API Gateway contains all the APIs we will use for calling wechat API
 */
export class WeChatAPIGateway {
    private APP_ID: string
    private APP_SECRET: string
    private WECHAT_HOST: string
    private WECHAT_PAY_HOST: string
    private WECHAT_MERCHANT_ID: string
    private WECHAT_API_KEY: string
    private WECHAT_PAYMENT_NOTIFY_URL: string
    private WECHAT_SUBMERCHANT_ID: string
    private WECHAT_CERTIFICATE: string

    private wechatAuthorizationSessionData: WeChatAuthorizationSessionData

    constructor() {
        this.APP_ID = process.env.WECHAT_APP_ID
        this.APP_SECRET = process.env.WECHAT_API_SECRET
        this.WECHAT_HOST = process.env.WECHAT_API_HOST
        this.WECHAT_PAY_HOST = process.env.WECHAT_PAY_HOST
        this.WECHAT_MERCHANT_ID = process.env.WECHAT_MERCHANT_ID
        this.WECHAT_API_KEY = process.env.WECHAT_API_KEY
        this.WECHAT_PAYMENT_NOTIFY_URL = process.env.WECHAT_PAYMENT_NOTIFY_URL
        this.WECHAT_SUBMERCHANT_ID = process.env.WECHAT_SUBMERCHANT_ID
        this.WECHAT_CERTIFICATE = process.env.WECHAT_CERTIFICATE

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
    async initiateUnifiedOrderPayment(outTradeNo: string, totalFee: number, feeType: string, body: string, notifyUrl: string) {
        const nonceStr = generateNonceStr();

        const unifiedOrderRequest: WeChatUnifiedOrderRequest = {
          appid: this.APP_ID,
          mch_id: this.WECHAT_MERCHANT_ID,
          body: body,
          nonce_str: nonceStr,
          notify_url: this.WECHAT_PAYMENT_NOTIFY_URL,
          out_trade_no: outTradeNo,
          sub_mch_id: this.WECHAT_SUBMERCHANT_ID,
          total_fee: totalFee,
          trade_type: 'NATIVE',
          fee_type: 'CNY',     
        }
        unifiedOrderRequest.sign = generateSign(unifiedOrderRequest, this.WECHAT_API_KEY);    
        const requestXml = toXml(unifiedOrderRequest);
        
        const response = await this.requestPost(this.WECHAT_PAY_HOST + UNIFIED_ORDER_PATH, requestXml);
        return fromXml(response) as Promise<WeChatUnifiedOrderResponse>;
    }

    private async queryOrder(outTradeNo: string): Promise<WeChatQueryOrderResponse> {
      const data: WeChatQueryOrderRequest = {
        appid: this.APP_ID,
        mch_id: this.WECHAT_MERCHANT_ID,
        nonce_str: generateNonceStr(),
        out_trade_no: outTradeNo
      };

      data.sign = generateSign(data, this.WECHAT_API_KEY);
      const requestXml = toXml(data);

      const response = await this.requestPost(this.WECHAT_PAY_HOST + 'pay/orderquery', requestXml);

      return fromXml(response) as Promise<WeChatQueryOrderResponse>;

    }

    private async requestPost(url: string, data: string, isCert = false): Promise<any> {
      const headers = { 'Content-Type': 'application/xml' };
  
      if (isCert) {
        if (!this.WECHAT_CERTIFICATE || !this.WECHAT_API_KEY) {
          throw new Error('Cert or key not provided');
        }

        const cert = this.WECHAT_CERTIFICATE
        const key = this.WECHAT_API_KEY
        const response = await axios.post(url, data, { headers, httpsAgent: new https.Agent({ cert, key }) });
        return fromXml(response);
      } else {
        const response = await axios.post(url, data, { headers });
        return fromXml(response);
      }
    }
}


export default new WeChatAPIGateway()