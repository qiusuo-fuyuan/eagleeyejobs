import { MongoClient } from "../db/MongoClient.js"
import { BaseRepository } from "./BaseRepository.js"
import { Question, QuestionDocumentSchemaDefinition } from "../models/Question.js"

export class QuestionRepository extends BaseRepository{
    private QuestionDocumentModel: any

    constructor() {
        super()
        this.QuestionDocumentModel = this.mongoClient.getDocumentModel(QuestionDocumentSchemaDefinition.name)
    }

    findQuestionById(questionId: string): PromiseLike<Question> | Question {
        return this.QuestionDocumentModel.findById(questionId)
    }

    findQuestionByTitle(): PromiseLike<Question> | Question {
        return this.QuestionDocumentModel.findById()        
    }

    findAllQuestions(): PromiseLike<Array<Question>> | Array<Question> {
        return this.QuestionDocumentModel.find()
    }

    createQuestion(question: Question): Question | PromiseLike<Question> {
        let QuestionDocument = new this.QuestionDocumentModel(question)
        return QuestionDocument.save()
    }
}

