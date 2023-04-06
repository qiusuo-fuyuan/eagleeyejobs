import  * as xml2js from 'xml2js';
import crypto from 'crypto';
import { AxiosResponse } from 'axios';

interface KeyValue {
  [key: string]: string | number;
}



export function toXml(request: KeyValue): string {
        const builder = new xml2js.Builder({
          rootName: 'xml',
          headless: true,
          renderOpts: { pretty: false },
        });
        return builder.buildObject(request);
}

export function fromXml(resp: AxiosResponse): Promise<any> {
  const result =  xml2js.parseStringPromise(resp.data, { explicitArray: false, ignoreAttrs: true });
  return result['xml'];
}

export function generateSign(params: KeyValue, wechatApiKey: string) {
  const paramString = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const stringSignTemp = `${paramString}&key=${wechatApiKey}`;
  const md5hash = crypto.createHash('md5').update(stringSignTemp, 'utf8').digest('hex');
  return md5hash.toUpperCase();
}

export function verifySign(dct: KeyValue): boolean {
  const sign = dct['sign'] as string;
  delete dct['sign'];
  return sign === this.generateSign(dct);
}

export function generateNonceStr(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonceStr = '';

  for (let i = 0; i < length; i++) {
    nonceStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return nonceStr;
}
    