import { Job } from "./models/Job.js";
import { JobService } from "./services/job/JobService.js";
import { JobSearchService } from "./services/job/JobSearchService.js";

let service = new JobSearchService();

export const resolvers = {
    Query: {
        /**
         * Jobs Query Resolvers
         */
        searchJobs: () => service.searchJobsByPageNo(0),
        jobDetail(jobId: String) {
            console.log("query job detail jobId:" + jobId)
            return service.queryJobDetail(jobId);
        }

        /**
         * User Query Resolvers
         */


        /**
         * Membership Query Resolvers
         */


        /**
         * Community Story Query Resolvers
         */

    },

    Mutation: {
        /**
         * Jobs Query Resolvers
        */

        /**
         * User Query Resolvers
         */


        /**
         * Membership Query Resolvers
         */


        /**
         * Community Story Query Resolvers
         */

    }
};