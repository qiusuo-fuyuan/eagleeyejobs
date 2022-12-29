import { BaseElasticRepository } from "./BaseElasticRepository.js"
import { Job, JobDocumentSchemaDefinition } from "../models/Job.js"

export class JobSearchRepository extends BaseElasticRepository<Job>{

    /**
     * Search jobs in Elastic Search
     * 
     * @param queryBody : Your query Json
     */
    public async search(queryBody: any): Promise<Array<Job>> {
        const index = process.env.MONGO_DATABASE + "." + JobDocumentSchemaDefinition.tableName
        console.log("JobSearchRepository index:" + index)
        return super.search(index, queryBody)
    }
}

