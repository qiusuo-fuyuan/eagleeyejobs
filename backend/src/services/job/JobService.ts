import { Job , JobPageOutput} from '../../models/Job.js'
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

    async findJobs(): Promise<Array<Job>> {
        return this.jobRepository.findAllJobs();
    }

    async queryJobDetail(jobId: string): Promise<Job> {
        return this.jobRepository.findJobById(jobId)
    }

    async findJobsByTitle(titleKeyword: string, page: number, size: number): Promise<JobPageOutput> {
        return this.jobRepository.findJobsByTitle(titleKeyword, page, size);
    }

}