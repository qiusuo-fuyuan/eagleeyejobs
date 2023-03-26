import { DocumentSchemaDefinitionType } from "./BaseTypes.js"


enum MembershipLevel {
    ENTRY = "entry",
    MEDIUM = "medium",
    ADVANCED = "advanced",
  }

export class Membership {
    _id: string;
    level: MembershipLevel;
    price: number;   
    prices: {
        [currencyCode: string]: number;
    };
}

// create table
export const MembershipStatusDocumentSchemaDefinition: DocumentSchemaDefinitionType = 
{
    name: "Membership",
    tableName: 'membership',
    schemaDefinition: {
        name: {
            type: String, 
            required: true 
        },
        price: String,
        status: String,
        payAt: String,
        expireAt: String
    }
}

export class UserMembershipStatus {
    name: String
    price: String
    status: String
    payAt: String
    expireAt: String
    userId: String
    internalUserId: String

    constructor(name: String, status: String, userId: String) {
        this.name = name;
        this.status = status;
        this.userId = userId;
    }
}
