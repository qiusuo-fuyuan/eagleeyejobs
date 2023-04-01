// AlipayAPIGateway.test.ts
import * as crypto from "crypto";
import { AlipayAPIGateway } from '../../../../src/core/thirdparty/alipay/AlipayAPIGateway';

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import


describe('AlipayAPIGateway', () => {
  let gateway: AlipayAPIGateway;

  beforeEach(() => {
    gateway = new AlipayAPIGateway();
  });

  afterEach(() => {
  });

  it('should request QR code payment', async () => {
    const subject = 'Test product';
    const outTradeNo = '123456789';
    const totalAmount = '10.00';

    const result = await gateway.requestQRCodePayment(subject, outTradeNo, totalAmount);

    expect(result).toBeTruthy(); // Check if the returned QR code is truthy since we can't know the exact value
  });

  // You can add more tests for other methods like `buildRequestBody` and `generateSign`.
  // However, since these methods are private, you would need to make them public or find a way to indirectly test their behavior.
});
