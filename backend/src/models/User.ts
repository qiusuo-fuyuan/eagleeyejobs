import { DocumentSchemaDefinitionType } from "./BaseTypes.js"
import  { Types } from 'mongoose'

export const UserDocumentSchemaDefinition: DocumentSchemaDefinitionType = 
{
    name: "User",
    tableName: 'user',
    schemaDefinition: {
        email: {
            type: String,
            required: true 
        },
        name: String,
        firstName: String,
        lastName: String,
        role: String,
    }
}

enum UserType {
    RECRUITER, 
    TEMPORARY_USER, 
    ENTRY_MEMBERSHIP, 
    INTERMEDIATE_MEMBERSHIP,
    ADVANCED_MEMBERSHIP,
}

export class MemberShipStatus {
    lastPaymentAt: String
    willExpireAt: String
}

export class User {
  email: String
  name: String
  firstName: String
  lastName: String
  companyName: String
  role: UserType
  membershipStatus: MemberShipStatus
}