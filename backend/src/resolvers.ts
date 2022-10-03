import { Job } from "./models/Job.js";
import { JobService } from "./services/job/JobService.js";
import { JobSearchService } from "./services/job/JobSearchService.js";

let jobSearchService;
let jobService: JobService

function getJobService(): JobService {
    if(jobService == undefined) {
        jobService = new JobService()
    }
    return jobService
}


export const resolvers = {
    Query: {
        /**
         * Jobs Query Resolvers
         */
        searchJobs: () => getJobService().findJobs(),

        //https://stackoverflow.com/questions/54158775/graphql-schema-query-not-recognizing-passed-input-parameters-in-the-resolver-fun
        jobDetail(_: any, args: any) {
            console.log("query job detail jobId:" + args.jobId)
            return getJobService().queryJobDetail(args.jobId);
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
         * Jobs Mutation Resolvers
        */
        addJob(_:any, args:any) {
            console.log("[Mutation] add job:" + args.job)
            return jobService.addJob(args.job);
        }

        /**
         * User Mutation Resolvers
         */


        /**
         * Membership Mutation Resolvers
         */


        /**
         * Community Story Mutation Resolvers
         */
    }
};