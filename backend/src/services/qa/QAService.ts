import { Question } from '../../models/Question.js'
import { QuestionRepository } from '../../repositories/QARepository.js';

export class QAService {
    private questionRepository: QuestionRepository

    constructor() {
        this.questionRepository = new QuestionRepository()
    }

    async addQuestion(title: string, content: string, userId: string): Promise<Question> {
        return this.questionRepository.save(new Question(title, content))
    }

    async allQuestions(): Promise<Array<Question>> {
        return this.questionRepository.findAll();
    }

    async queryQuestionDetail(questionId: string): Promise<Question> {
        return this.questionRepository.findById(questionId)
    }
}