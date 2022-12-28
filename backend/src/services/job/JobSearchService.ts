import { Job } from '../../models/Job.js'
import { JobSearchRepository } from "../../repositories/JobSearchRepository.js";

/**
 * Uses JinaClient to search for job information
 */
export class JobSearchService {
    private jobSearchRepository : JobSearchRepository

    constructor() {
        this.jobSearchRepository = new JobSearchRepository()
    }

    async searchJobs(userInput: string, pageNumber: number): Promise<Array<Job>> {
        var queryBody = {
            query: {
                multi_match: {
                    query: userInput,
                    fields: ['title','description', 'companyName', 'country', 'city']
                }
            }
        }
        return this.jobSearchRepository.search(queryBody);
    }

}

export default new JobSearchService()