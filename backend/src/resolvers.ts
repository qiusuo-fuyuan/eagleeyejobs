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
        jobDetail(_: any, args: any) {
            console.log("query job detail jobId:" + args.jobId)
            return service.queryJobDetail(args.jobId);
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