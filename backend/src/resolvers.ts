import { Job } from "./models/Job.js";
import { JobService } from "./services/job/JobService.js";
import { JobSearchService } from "./services/job/JobSearchService.js";


export const resolvers = {
    Query: {
        searchJobs: () => new JobSearchService().searchJobsByPageNo(0)
    },

    Mutation: {

    }
};