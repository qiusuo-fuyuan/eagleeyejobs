import { BaseRepository } from "./BaseRepository.js"
import { Question, QuestionDocumentSchemaDefinition } from "../models/Question.js"

export class QuestionRepository extends BaseRepository<Question>{
    private QuestionDocumentModel: any

    constructor() {
        super(QuestionDocumentSchemaDefinition.name)
    }
}

