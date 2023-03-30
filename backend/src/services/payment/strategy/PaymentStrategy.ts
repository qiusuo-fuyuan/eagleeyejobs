export interface PaymentStrategy {
    /**
     * Creates a new payment transaction with the specified details.
     *
     * @param userId the ID of the user initiating the payment
     * @param amount the amount of the payment
     * @param description a description of the payment
     * @returns the ID of the new payment transaction
     */
    createTransaction(userId: string, amount: number, description: string): Promise<string>;
  
    /**
     * Updates the status of the specified payment transaction.
     *
     * @param transactionId the ID of the payment transaction to update
     * @param status the new status of the payment transaction
     */
    updateTransactionStatus(transactionId: string, status: PaymentStatus): Promise<void>;
  
    /**
     * Gets the status of the specified payment transaction.
     *
     * @param transactionId the ID of the payment transaction to get
     * @returns the status of the payment transaction
     */
    getTransactionStatus(transactionId: string): Promise<PaymentStatus>;
  
    /**
     * Gets the details of the specified payment transaction.
     *
     * @param transactionId the ID of the payment transaction to get
     * @returns the details of the payment transaction
     */
    getTransactionDetails(transactionId: string): Promise<PaymentTransaction>;
  }
  