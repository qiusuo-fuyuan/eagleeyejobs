import axios from 'axios';
import { AlipayTradePrecreateRequest } from './DataTypes';

<<<<<<< HEAD
const ALIPAY_API_ENDPOINT = 'https://openapi.alipay.com/gateway.do';
=======
>>>>>>> main

export class AlipayAPIGateway {
  private APP_ID: string;
  private APP_PRIVATE_KEY: string;
  private ALIPAY_PUBLIC_KEY: string;
  private ALIPAY_NOTIFY_URL: string;
<<<<<<< HEAD
=======
  private ALIPAY_API_HOST: string
>>>>>>> main

  constructor() {
    this.APP_ID = process.env.ALIPAY_APP_ID;
    this.APP_PRIVATE_KEY = process.env.ALIPAY_APP_PRIVATE_KEY;
    this.ALIPAY_PUBLIC_KEY = process.env.ALIPAY_PUBLIC_KEY;
    this.ALIPAY_NOTIFY_URL = process.env.ALIPAY_NOTIFY_URL;
<<<<<<< HEAD
=======
    this.ALIPAY_API_HOST = process.env.ALIPAY_API_HOST
>>>>>>> main
  }

  async requestQRCodePayment(subject: string, outTradeNo: string, totalAmount: string): Promise<string> {
    const request: AlipayTradePrecreateRequest = {
      app_id: this.APP_ID,
      method: 'alipay.trade.precreate',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: new Date().toISOString(),
      version: '1.0',
      notify_url: this.ALIPAY_NOTIFY_URL,
      biz_content: {
        subject: subject,
        out_trade_no: outTradeNo,
        total_amount: totalAmount,
      },
    };

    const response = await axios.post<{ alipay_trade_precreate_response: { qr_code: string } }>(
<<<<<<< HEAD
      ALIPAY_API_ENDPOINT,
=======
      this.ALIPAY_API_HOST,
>>>>>>> main
      this.buildRequestBody(request),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return response.data.alipay_trade_precreate_response.qr_code;
  }

  private buildRequestBody(request: AlipayTradePrecreateRequest): string {
    const unsignedRequestBody = JSON.stringify(request);
    const signedRequestBody = unsignedRequestBody.slice(0, -1) + `, "sign":"${this.generateSign(unsignedRequestBody)}"}`;

    return Object.entries(JSON.parse(signedRequestBody))
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  }

  private generateSign(unsignedRequestBody: string): string {
    const crypto = require('crypto');

    const sign = crypto.createSign('RSA-SHA256');
    sign.write(unsignedRequestBody);
    sign.end();

    const signature = sign.sign(this.APP_PRIVATE_KEY, 'base64');
    return signature;
  }
}



export default new AlipayAPIGateway()