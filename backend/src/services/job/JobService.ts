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

    async findJobs(): Promise<Array<Job>> {
        return this.jobRepository.findAllJobs();
    }

    async queryJobDetail(jobId: string): Promise<Job> {
        return this.jobRepository.findJobById(jobId)
    }
}