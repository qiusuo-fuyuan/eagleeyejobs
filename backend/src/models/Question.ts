import { DocumentSchemaDefinitionType } from "./BaseTypes.js"
import  { User }  from "./../models/User.js"


// create table
export const QuestionDocumentSchemaDefinition: DocumentSchemaDefinitionType = 
{
    name: "Question",
    tableName: 'question',
    schemaDefinition: {
        title: {
            type: String, 
            required: true 
        },
        content: String,
        answers: [{content: String}],
        userId: String
    }
}


export class Question {
    title: String
    content: String
    answers: Array<Answer>
    user: User

    constructor(title: String, content: String) {
        this.title = title;
        this.content = content;
    }
}

export class Answer {
    content: String
    comments: Array<Comment>
}

export class Comment {
    content: String
    user: String
}

