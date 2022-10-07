import { Job } from '../../models/Job.js'
import { JobRepository } from '../../repositories/JobRepository.js';

export class JobService {
    private jobRepository: JobRepository

    constructor() {
        this.jobRepository = new JobRepository()
    }

    async addJob(job: Job): Promise<Job> {
        return this.jobRepository.createJob(job)
    }

    async updateJob(job: Job): Promise<Job> {
        return this.jobRepository.updateJob(job)
    }

    async queryJobDetail(jobId: string): Promise<Job> {
        return this.jobRepository.findJobById(jobId)
    }
}