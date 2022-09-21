import { Job } from "./models/Job.js";
import { JobService } from "./services/job/JobService.js";
import { JobSearchService } from "./services/job/JobSearchService.js";

let service = new JobSearchService();

export const resolvers = {
    Query: {
        searchJobs: () => service.searchJobsByPageNo(0),
        jobDetail(jobId: String) {
            console.log("query job detail jobId:" + jobId)
            return service.queryJobDetail(jobId);
        }
    },

    Mutation: {

    }
};