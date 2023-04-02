import AlipaySdk from 'alipay-sdk';
import { AlipayTradePrecreateRequest } from './DataTypes';

const API_ENDPOINT = '/gateway.do';
export class AlipayAPIGateway {
  private APP_ID: string
  private APP_PRIVATE_KEY: string
  private ALIPAY_PUBLIC_KEY: string
  private ALIPAY_NOTIFY_URL: string

  private alipaySdk: AlipaySdk;

  constructor() {
    this.APP_ID = process.env.ALIPAY_APP_ID;
    this.APP_PRIVATE_KEY = process.env.ALIPAY_APP_PRIVATE_KEY;
    this.ALIPAY_PUBLIC_KEY = process.env.ALIPAY_PUBLIC_KEY;
    this.ALIPAY_NOTIFY_URL = process.env.ALIPAY_NOTIFIY_URL;

    this.alipaySdk = new AlipaySdk({
      appId: process.env.ALIPAY_APP_ID,
      privateKey: process.env.ALIPAY_APP_PRIVATE_KEY,
      alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
      signType: 'RSA2',
      gateway: process.env.ALIPAY_API_HOST + API_ENDPOINT,
      timeout: 30000,
      camelcase: true,
    });
  }

  async initiatePrecreatePayment(subject: string, outTradeNo: string, totalAmount: string): Promise<string> {
    const request: AlipayTradePrecreateRequest = {
      bizContent: {
        subject,
        out_trade_no: outTradeNo,
        total_amount: totalAmount,
      },
      notify_url: this.ALIPAY_NOTIFY_URL,
    };

    try {
      const response = await this.alipaySdk.exec('alipay.trade.precreate', request);
      return response.qrCode;
    } catch (error) {
      console.error('Error in requestQRCodePayment', error);
      throw error;
    }
  }
}

export default new AlipayAPIGateway();
