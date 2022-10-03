import { Job } from '../../models/Job.js'
import { JinaClient } from '../../search/jina/JinaClient.js'

/**
 * Uses JinaClient to search for job information
 */
export class JobSearchService {
    private jinaClient: JinaClient

    searchJobsByPageNo(pageNo: number): Array<Job> {
        return new Array();
    }

    searchJobsByUserInput(userInput: String): Array<Job> {
        return new Array();
    }
}