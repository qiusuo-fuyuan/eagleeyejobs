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
        internalUserId: {
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


export enum PaymentProviderEnum {
    WECHAT = "wechat",
    ALIPAY = "alipay"
}


// Transaction.ts
export enum TransactionStatusEnum {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
}

export class Transaction {
    _id: string;
    internalUserId: string;
    membershipId: string;
    amount: number;
    currency: string;
    status: TransactionStatusEnum;
    paymentProvider: string;
    paymentId: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
}
 