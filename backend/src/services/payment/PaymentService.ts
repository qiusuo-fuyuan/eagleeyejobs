import { PaymentProviderEnum, Transaction, TransactionStatusEnum } from '../../models/Transaction';
import { User } from '../../models/User';
import { MembershipRepository } from '../../repositories/MembershipRepository';
import transactionRepository, { TransactionRepository } from '../../repositories/TransactionRepository';
import { PaymentStrategyFactory } from './PaymentStrategyFactory';
import { PaymentTransaction, PaymentStatus } from './PaymentTypes';

export class PaymentService {
  private membershipRepository: MembershipRepository
  private transactionRepository: TransactionRepository;

  private readonly paymentStrategyFactory: PaymentStrategyFactory;

  constructor(transactionRepository: TransactionRepository, paymentStrategies: Map<string, ThirdPartyPaymentStrategy>) {
    this.transactionRepository = transactionRepository
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

  async handlePaymentNotification(data: any): Promise<AlipayPayment> {
    
  }

  /**
   * This function will create a pending transaction and return the qrcode as a string
   * 
   * @param membershipId 
   * @param paymentProvider 
   */
  async requestNewPaymentTransaction(membershipId: number, paymentProvider: string, user: User, currency: string): Promise<String> {
      // Fetch membership from the database
      const membership = await this.membershipRepository.findById(membershipId+'');

      if (!membership) {
        throw new Error('Membership not found');
      }
  
      // Create a new Transaction object
      const transaction = new Transaction()
      transaction.internalUserId = user._id
      transaction.amount = membership.prices[currency],
      transaction.currency = currency
      transaction.status = TransactionStatusEnum.PENDING
      transaction.paymentProvider = paymentProvider
  
      // Store the transaction in the database
      const savedTransaction = await this.transactionRepository.save(transaction);
  
      // Initiate the payment process with the chosen payment provider
      const paymentStrategy = this.paymentStrategyFactory[paymentProvider];
      return paymentStrategy.createPayment(savedTransaction);
  }
}
