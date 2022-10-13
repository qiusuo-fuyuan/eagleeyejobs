import { DocumentSchemaDefinitionType } from "./BaseTypes.js"
import  { Types } from 'mongoose'

export const JobDocumentSchemaDefinition: DocumentSchemaDefinitionType = 
{
    name: "Job",
    tableName: 'job',
    schemaDefinition: {
        title: {
            type: String,
            required: true 
        },
        content: String,
        companyName: String,
        country: String,
        city: String,
        address: String,
        isDeleted: {
            type: Number,
            default: 0
        }
    }
}

/**
 * Job Entity
 * _id: is the auto index created by mongodb.
 */
export class Job {
    _id: Types.ObjectId
    title: String
    content: String
    companyName: String
    country: String
    city: String
    address: String
    createdAt: String
    updatedAt: String
    isDeleted: Number
}