import alipayAPIGateway, {AlipayAPIGateway} from '../../../core/thirdparty/alipay/AlipayAPIGateway.js';
import { ThirdPartyPaymentStrategy } from './ThirdPartyPaymentStrategy.js';
import { AlipayTradeQueryResponse, AlipayTradeStatus } from '../../../core/thirdparty/alipay/DataTypes.js';

export class AlipayPaymentStrategy implements ThirdPartyPaymentStrategy {
  private readonly alipayAPIGateway: AlipayAPIGateway;

  constructor() {
    this.alipayAPIGateway = alipayAPIGateway;
  }

  async createTransaction(platformTransactionId: string, amount: number, userId: string, description: string): Promise<string> {
    // Use the Alipay API gateway to create a new payment transaction with the specified details.
    const qr_code: string = await this.alipayAPIGateway.initiatePrecreatePayment(platformTransactionId, amount, description);
    return qr_code;
  }

  async getTransactionStatus(transactionId: string): Promise<boolean> {
    // Use the Alipay API gateway to get the details of the specified payment transaction.
    const response: AlipayTradeQueryResponse = await this.alipayAPIGateway.getTransactionDetails(transactionId);
    return response.trade_status == AlipayTradeStatus.TRADE_SUCCESS
  }
}


export default new AlipayPaymentStrategy()