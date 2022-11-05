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
        nickName: String,
        firstName: String,
        lastName: String,
        gender: String,
        role: String,

        platform: String,
        openid: String, //this can not be empty when platform="wechat" or others for identifying one user
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
    _id: String
    email: String
    name: String
    nickName: String
    firstName: String
    lastName: String
    gender: String
    companyName: String
    role: UserType
    membershipStatus: MemberShipStatus
        
    //platform denotes where the user come from "wechat or alipay"
    platform: String
    openid: String
}