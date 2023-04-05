import { PaymentProviderEnum, Transaction, TransactionStatusEnum } from '../../models/Transaction.js';
import { User } from '../../models/User';
import { MembershipRepository } from '../../repositories/MembershipRepository.js';
import transactionRepository, { TransactionRepository } from '../../repositories/TransactionRepository.js';
import paymentStrategyFactory, { PaymentStrategyFactory } from './strategy/PaymentStrategyFactory.js';
import { PaymentTransaction, PaymentStatus } from './PaymentTypes.js';
import { Membership } from '../../models/Membership.js';

export class PaymentService {
  private membershipRepository: MembershipRepository
  private transactionRepository: TransactionRepository;

  private readonly paymentStrategyFactory: PaymentStrategyFactory;

  constructor() {
    this.transactionRepository = transactionRepository
    this.paymentStrategyFactory = paymentStrategyFactory
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
   * This function will create a pending transaction and return the qrcode as a string. 
   * 
   * @param membershipId 
   * @param paymentProvider 
   */
  async requestPaymentTransaction(paymentProvider: string, user: User, membership: Membership, currency: string): Promise<String> {
      // Create a new Transaction object
      const transaction = new Transaction()
      transaction.internalUserId = user._id
      transaction.amount = membership.prices[currency],
      transaction.currency = currency
      transaction.status = TransactionStatusEnum.PENDING
      transaction.paymentProvider = paymentProvider
      transaction.description = membership.description
  
      // Store the transaction in the database
      const savedTransaction = await this.transactionRepository.save(transaction);
  
      // Initiate the payment process with the chosen payment provider
      const paymentStrategy = this.paymentStrategyFactory.getPaymentStrategy(paymentProvider);
      return await paymentStrategy.createTransaction(savedTransaction._id, savedTransaction.amount, savedTransaction.internalUserId, membership.description);
  }
}


export default new PaymentService()