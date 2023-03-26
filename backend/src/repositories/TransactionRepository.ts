import { BaseRepository } from './BaseRepository';
import { Transaction } from '../models/Transaction';
import { TransactionDocumentSchemaDefinition } from '../models/Transaction.js';

export class TransactionRepository extends BaseRepository<Transaction> {
    constructor() {
        super(TransactionDocumentSchemaDefinition.name);
    }

    updateTransaction(transaction: Transaction): Promise<Transaction> {
        return this.documentModel.findByIdAndUpdate(transaction._id, transaction, { new: true });
    }
}

export default new TransactionRepository();
