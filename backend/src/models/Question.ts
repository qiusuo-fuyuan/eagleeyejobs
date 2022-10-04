import { DocumentSchemaDefinitionType } from "./BaseTypes.js"


export const QuestionDocumentSchemaDefinition: DocumentSchemaDefinitionType = 
{
    name: "Question",
    tableName: 'question',
    schemaDefinition: {
        title: {
            type:String, 
            required: true 
        },
        content: String
    }
}



export class Question {
    title: String
    content: String

    constructor(title: String, content: String) {
        this.title = title;
        this.content = content;
    }
}