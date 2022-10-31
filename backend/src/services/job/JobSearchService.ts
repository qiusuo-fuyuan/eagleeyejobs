import { Job } from '../../models/Job.js'
import { JobSearchPagingResult } from '../../models/JobSearchPagingResult.js'
import { JinaClient } from '../../search/jina/JinaClient.js'

/**
 * Uses JinaClient to search for job information
 */
export class JobSearchService {
    private jinaClient: JinaClient


    constructor() {
        this.jinaClient = new JinaClient()        
    }

    searchJobs(userInput: string, pageNumber: number): Promise<JobSearchPagingResult> {
        return Promise.resolve(new JobSearchPagingResult())    
    }
}

export default new JobSearchService()