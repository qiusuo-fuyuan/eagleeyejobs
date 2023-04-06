import AlipaySdk from 'alipay-sdk';
import { AlipayTradePrecreateRequest, AlipayTradePrecreateResponse, AlipayTradeQueryRequest, AlipayTradeQueryResponse } from './DataTypes.js';

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

  async initiatePrecreatePayment(outTradeNo: string, totalAmount: string, subject: string): Promise<string> {
    const request: AlipayTradePrecreateRequest = {
      bizContent: {
        subject,
        out_trade_no: outTradeNo,
        total_amount: totalAmount,
      },
      notify_url: this.ALIPAY_NOTIFY_URL,
    };

    try {
      const precreateResponse = await this.alipaySdk.exec<AlipayTradePrecreateResponse>('alipay.trade.precreate', request);
      return precreateResponse.alipay_trade_precreate_response.qr_code;
    } catch (error) {
      console.error('Error in requestQRCodePayment', error);
      throw error;
    }
  }

  async getTransactionDetails(outTradeNo: string): Promise<AlipayTradeQueryResponse> {
    const request: AlipayTradeQueryRequest = {
      bizContent: {
        out_trade_no: outTradeNo,
      },
    };

    const response = await this.alipaySdk.exec<AlipayTradeQueryResponse>('alipay.trade.query', request);
    return response
  }
}

export default new AlipayAPIGateway();
