import { PaymentStrategyFactory } from './PaymentStrategyFactory';
import { PaymentTransaction, PaymentStatus } from './PaymentTypes';
import { ThirdPartyPaymentStrategy } from './strategy/PaymentStrategy';

export class ThirdPartyPaymentService {
  private readonly paymentStrategyFactory: PaymentStrategyFactory;

  constructor(paymentStrategies: Map<string, ThirdPartyPaymentStrategy>) {
    this.paymentStrategyFactory = new PaymentStrategyFactory(paymentStrategies);
  }

  async createTransaction(providerType: string, userId: string, amount: number, description: string): Promise<string> {
    const strategy = this.paymentStrategyFactory.getStrategy(providerType);
    return strategy.createTransaction(userId, amount, description);
  }

  async updateTransactionStatus(providerType: string, transactionId: string, status: PaymentStatus): Promise<void> {
    const strategy = this.paymentStrategyFactory.getStrategy(providerType);
    return strategy.updateTransactionStatus(transactionId, status);
  }

  async getTransactionStatus(providerType: string, transactionId: string): Promise<PaymentStatus> {
    const strategy = this.paymentStrategyFactory.getStrategy(providerType);
    return strategy.getTransactionStatus(transactionId);
  }

  async getTransactionDetails(providerType: string, transactionId: string): Promise<PaymentTransaction> {
    const strategy = this.paymentStrategyFactory.getStrategy(providerType);
    return strategy.getTransactionDetails(transactionId);
  }
}
