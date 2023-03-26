import { DocumentSchemaDefinitionType } from "./BaseTypes.js";

// create table
export const TransactionDocumentSchemaDefinition: DocumentSchemaDefinitionType = {
    name: "Transaction",
    tableName: 'transaction',
    schemaDefinition: {
        transactionId: {
            type: String,
            unique: true,
            index: true
        },
        userId: {
            type: String,
            index: true
        },
        membershipId: {
            type: String,
            index: true
        },
        amount: Number,
        currency: String,
        paymentMethod: String,
        status: String,
        createdAt: Date,
        updatedAt: Date,
        paymentProviderTransactionId: {
            type: String,
            unique: true
        }
    }
}


enum PaymentProviderEnum {
    WECHAT = "wechat",
    ALIPAY = "alipay"
}


// Transaction.ts
enum TransactionStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
}

export class Transaction {
    _id: string;
    userId: string;
    membershipId: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
    paymentProvider: string;
    paymentId: string;
    createdAt: Date;
    updatedAt: Date;
}
 