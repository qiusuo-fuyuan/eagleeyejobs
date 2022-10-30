import { Job } from '../../models/Job.js'
import jobRepository, { JobRepository } from '../../repositories/JobRepository.js';

export class JobService {
    private jobRepository: JobRepository

    constructor() {
        this.jobRepository = jobRepository
    }

    async addJob(job: Job): Promise<Job> {
        return this.jobRepository.createJob(job)
    }

    async updateJob(job: Job): Promise<Job> {
        return this.jobRepository.updateJob(job)
    }

    async queryJobDetail(jobId: string): Promise<Job> {
        return this.jobRepository.findById(jobId)
    }
}

export default new JobService()