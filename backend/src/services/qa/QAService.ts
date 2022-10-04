import { Question } from '../../models/Question.js'
import { QuestionRepository } from '../../repositories/QARepository.js';

export class QAService {
    private questionRepository: QuestionRepository

    constructor() {
        this.questionRepository = new QuestionRepository()
    }

    async addQuestion(title: string, content: string): Promise<Question> {
        return this.questionRepository.createQuestion(new Question(title, content))
    }

    async findQuestions(): Promise<Array<Question>> {
        return this.questionRepository.findAllQuestions();
    }

    async queryQuestionDetail(questionId: string): Promise<Question> {
        return this.questionRepository.findQuestionById(questionId)
    }
}