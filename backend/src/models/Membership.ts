import { DocumentSchemaDefinitionType } from "./BaseTypes.js"


enum MembershipCode {
    ENTRY = "entry",
    MEDIUM = "medium",
    ADVANCED = "advanced",
}

// create table
export const MembershipDocumentSchemaDefinition: DocumentSchemaDefinitionType =
{
    name: "Membership",
    tableName: 'membership',
    schemaDefinition: {
        code: {
            type: String,
            required: true,
            enum: Object.values(MembershipCode),
        },
        prices: {
            type: Map,
            of: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
        }
    }
}


export class Membership {
    _id: string;
    code: MembershipCode;
    prices: {
        [currencyCode: string]: number;
    };
    description: string;
}

// create table
export const UserMembershipStatusDocumentSchemaDefinition: DocumentSchemaDefinitionType = {
    name: "UserMembershipStatus",
    tableName: "user_membership_status",
    schemaDefinition: {
      code: {
        type: String,
        required: true,
        enum: Object.values(MembershipCode),
    },
      lastPaidAt: {
        type: Date,
        required: true,
      },
      willExpireAt: {
        type: Date,
        required: true,
      },
    },
};

export class UserMembershipStatus {
    code: MembershipCode
    lastPaidAt: Date
    willExpireAt: Date

    constructor(code: MembershipCode,  lastPaidAt: Date, willExpireAt: Date) {
        this.code = code;
        this.lastPaidAt = lastPaidAt;
        this.willExpireAt = willExpireAt;
    }
}
