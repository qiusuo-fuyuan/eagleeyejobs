import { Question } from '../models/Question.js'


export class QAService {
    async createQuestion(title:string, content: string): Promise<Question> {
        console.log("QAService.createQuestion() called")
        return Promise.resolve(new Question("question title", "question description"))
    }
}