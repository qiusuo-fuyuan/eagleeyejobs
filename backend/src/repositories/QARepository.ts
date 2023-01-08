import { BaseRepository } from "./BaseRepository.js"
import { Question, QuestionDocumentSchemaDefinition } from "../models/Question.js"
import logger from "../utils/Logger.js"

export class QuestionRepository extends BaseRepository<Question>{
    private QuestionDocumentModel: any

    constructor() {
        super(QuestionDocumentSchemaDefinition.name)
    }

    async updateQuestion( questionId: string,content: string, userId: string): Promise<Question> {
        const filter = {_id: questionId}
        const update = {
            $push: {answers: 
                {content: content,
                userId: userId}
            }
        }
        logger.info("filter: ", filter, "update: ", update)
        return this.documentModel.findOneAndUpdate(filter, update, {new:true})
    }
}