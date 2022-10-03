import { DocumentSchemaDefinitionType } from "./BaseTypes.js"


export const JobDocumentSchemaDefinition: DocumentSchemaDefinitionType = 
{
    name: "Job",
    tableName: 'job',
    schemaDefinition: {
        title: {
            type:String, 
            required: true 
        },
        location: String
    }
}


export class Job {
    title: String
    location: String
}