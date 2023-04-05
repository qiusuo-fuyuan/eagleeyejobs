import alipayAPIGateway, {AlipayAPIGateway} from '../../../core/thirdparty/alipay/AlipayAPIGateway.js';
import { ThirdPartyPaymentStrategy } from './ThirdPartyPaymentStrategy.js';
import { AlipayPaymentResponse, PaymentStatus, PaymentTransaction } from './PaymentTypes.js';

export class AlipayPaymentStrategy implements ThirdPartyPaymentStrategy {
  private readonly alipayAPIGateway: AlipayAPIGateway;

  constructor() {
    this.alipayAPIGateway = alipayAPIGateway;
  }

  async createTransaction(platformTransactionId: string, amount: number, userId: string, description: string): Promise<string> {
    // Use the Alipay API gateway to create a new payment transaction with the specified details.
    const response: AlipayPaymentResponse = await this.alipayAPIGateway.initiatePrecreatePayment(platformTransactionId, amount, description);

    // If the transaction was created successfully, return the transaction ID.
    if (response.code === '10000') {
      return response.out_trade_no;
    } else {
      throw new Error(response.msg);
    }
  }

  async updateTransactionStatus(transactionId: string, status: PaymentStatus): Promise<void> {
    // Alipay does not provide a way to update the status of a transaction.
    // Instead, you should use the `getTransactionStatus()` method to get the
    // current status of the transaction.
    throw new Error('Not implemented');
  }

  async getTransactionStatus(transactionId: string): Promise<PaymentStatus> {
    // Use the Alipay API gateway to get the status of the specified payment transaction.
    const response: AlipayPaymentResponse = await this.alipayAPIGateway.queryPaymentTransaction(transactionId);

    // Map the Alipay payment status to the PaymentStatus enum.
    switch (response.trade_status) {
      case 'WAIT_BUYER_PAY':
        return PaymentStatus.PENDING;
      case 'TRADE_CLOSED':
      case 'TRADE_FINISHED':
        return PaymentStatus.FAILURE;
      case 'TRADE_SUCCESS':
        return PaymentStatus.SUCCESS;
      default:
        throw new Error(`Unknown trade status: ${response.trade_status}`);
    }
  }

  async getTransactionDetails(transactionId: string): Promise<PaymentTransaction> {
    // Use the Alipay API gateway to get the details of the specified payment transaction.
    const response: AlipayPaymentResponse = await this.alipayAPIGateway.queryPaymentTransaction(transactionId);

    // Parse the response into a PaymentTransaction object.
    const transaction = new PaymentTransaction(
      response.out_trade_no,
      response.trade_no,
      response.total_amount,
      PaymentStatus.SUCCESS,
      new Date(response.send_pay_date),
      new Date(response.gmt_payment)
    );
    return transaction;
  }
}


export default new AlipayPaymentStrategy()