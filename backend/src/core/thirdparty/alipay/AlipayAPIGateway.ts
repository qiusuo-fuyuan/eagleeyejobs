import axios from 'axios';
import { AlipayTradePrecreateRequest } from './DataTypes';


export class AlipayAPIGateway {
  private APP_ID: string;
  private APP_PRIVATE_KEY: string;
  private ALIPAY_PUBLIC_KEY: string;
  private ALIPAY_NOTIFY_URL: string;
  private ALIPAY_API_HOST: string

  constructor() {
    this.APP_ID = process.env.ALIPAY_APP_ID;
    this.APP_PRIVATE_KEY = process.env.ALIPAY_APP_PRIVATE_KEY;
    this.ALIPAY_PUBLIC_KEY = process.env.ALIPAY_PUBLIC_KEY;
    this.ALIPAY_NOTIFY_URL = process.env.ALIPAY_NOTIFY_URL;
    this.ALIPAY_API_HOST = process.env.ALIPAY_API_HOST
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
      this.ALIPAY_API_HOST,
      this.buildRequestBody(request),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return response.data.alipay_trade_precreate_response.qr_code;
  }

}


export default new AlipayAPIGateway()