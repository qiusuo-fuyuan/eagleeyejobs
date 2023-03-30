// AlipayAPIGateway.test.ts
import crypto from 'crypto';
import { AlipayAPIGateway } from '../../../../src/core/thirdparty/alipay/AlipayAPIGateway';

jest.mock('crypto');

describe('AlipayAPIGateway', () => {
  let gateway: AlipayAPIGateway;

  beforeEach(() => {
    gateway = new AlipayAPIGateway();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should request QR code payment', async () => {
    const mockCryptoCreateSign = crypto.createSign as jest.MockedFunction<typeof crypto.createSign>;

    const mockSignInstance = {
      write: jest.fn(),
      end: jest.fn(),
      sign: jest.fn().mockReturnValue('sample_signature'),
    };
    mockCryptoCreateSign.mockReturnValue(mockSignInstance);

    const subject = 'Test product';
    const outTradeNo = '123456789';
    const totalAmount = '10.00';

    const result = await gateway.requestQRCodePayment(subject, outTradeNo, totalAmount);

    expect(mockCryptoCreateSign).toHaveBeenCalledWith('RSA-SHA256');
    expect(mockSignInstance.write).toHaveBeenCalled();
    expect(mockSignInstance.end).toHaveBeenCalled();
    expect(mockSignInstance.sign).toHaveBeenCalledWith(process.env.ALIPAY_APP_PRIVATE_KEY, 'base64');
    expect(result).toBeTruthy(); // Check if the returned QR code is truthy since we can't know the exact value
  });

  // You can add more tests for other methods like `buildRequestBody` and `generateSign`.
  // However, since these methods are private, you would need to make them public or find a way to indirectly test their behavior.
});
