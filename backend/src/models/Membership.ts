import { DocumentSchemaDefinitionType } from "./BaseTypes.js"

// create table
export const MembershipDocumentSchemaDefinition: DocumentSchemaDefinitionType = 
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


export class Membership {
    name: String
    price: String
    status: String
    payAt: String
    expireAt: String
    userId: String

    constructor(name: String, status: String, userId: String) {
        this.name = name;
        this.status = status;
        this.userId = userId;
    }
}
