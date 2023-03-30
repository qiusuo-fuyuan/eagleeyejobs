 
import wechatAPIGateway, {WeChatAPIGateway} from '../../../core/thirdparty/wechat/WeChatAPIGateway';
import { PaymentStrategy } from './PaymentStrategy';
import { WechatPaymentResponse, PaymentStatus, PaymentTransaction } from './PaymentTypes';

export class WechatPaymentStrategy implements PaymentStrategy {
  private readonly wechatAPIGateway: WeChatAPIGateway;

  constructor() {
    this.wechatAPIGateway = wechatAPIGateway;
  }

  async createTransaction(userId: string, amount: number, description: string): Promise<string> {
    // Use the WeChat API gateway to create a new payment transaction with the specified details.
    const response: WechatPaymentResponse = await this.wechatAPIGateway.createPaymentTransaction(amount, description);

    // If the transaction was created successfully, return the transaction ID.
    if (response.return_code === 'SUCCESS') {
      return response.prepay_id;
    } else {
      throw new Error(response.return_msg);
    }
  }

  async updateTransactionStatus(transactionId: string, status: PaymentStatus): Promise<void> {
    // WeChat does not provide a way to update the status of a transaction.
    // Instead, you should use the `getTransactionStatus()` method to get the
    // current status of the transaction.
    throw new Error('Not implemented');
  }

  async getTransactionStatus(transactionId: string): Promise<PaymentStatus> {
    // Use the WeChat API gateway to get the status of the specified payment transaction.
    const response: WechatPaymentResponse = await this.wechatAPIGateway.queryPaymentTransaction(transactionId);

    // Map the WeChat payment status to the PaymentStatus enum.
    switch (response.trade_state) {
      case 'NOTPAY':
      case 'USERPAYING':
        return PaymentStatus.PENDING;
      case 'CLOSED':
      case 'REVOKED':
      case 'PAYERROR':
        return PaymentStatus.FAILURE;
      case 'SUCCESS':
      case 'REFUND':
        return PaymentStatus.SUCCESS;
      default:
        throw new Error(`Unknown trade status: ${response.trade_state}`);
    }
  }

  async getTransactionDetails(transactionId: string): Promise<PaymentTransaction> {
    // Use the WeChat API gateway to get the details of the specified payment transaction.
    const response: WechatPaymentResponse = await this.wechatAPIGateway.queryPaymentTransaction(transactionId);

    // Parse the response into a PaymentTransaction object.
    const transaction = new PaymentTransaction(
      response.out_trade_no,
      response.transaction_id,
      response.total_fee,
      PaymentStatus.SUCCESS,
      new Date(response.time_start),
      new Date(response.time_end)
    );

    return transaction;
  }
}

export default new WechatPaymentStrategy()
