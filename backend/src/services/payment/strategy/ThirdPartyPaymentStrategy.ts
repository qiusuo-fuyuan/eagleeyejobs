export interface ThirdPartyPaymentStrategy {
    /**
     * Creates a new payment transaction with the specified details.
     *
     * @param userId the ID of the user initiating the payment
     * @param amount the amount of the payment
     * @param description a description of the payment
     * @returns the ID of the new payment transaction
     */
    createTransaction(platformTransactionId: string, amount: number, userId: string, description: string): Promise<boolean>;
    /**
     * Gets the status of the specified payment transaction.
     *
     * @param transactionId the ID of the payment transaction to get
     * @returns the status of the payment transaction
     */
  
    /**
     * Gets the details of the specified payment transaction.
     *
     * @param transactionId the ID of the payment transaction to get
     * @returns the details of the payment transaction
     */
    getTransactionStatus(transactionId: string): Promise<boolean>;
  }
  