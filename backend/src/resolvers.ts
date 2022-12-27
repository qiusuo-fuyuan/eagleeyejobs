import { Job } from "./models/Job.js";
import jobService from "./services/job/JobService.js";
import { JobSearchService } from "./services/job/JobSearchService.js";

const jobSearchService =  new JobSearchService();
export const resolvers = {
    Query: {
        /**
         * Jobs Query Resolvers
         */
        //https://stackoverflow.com/questions/54158775/graphql-schema-query-not-recognizing-passed-input-parameters-in-the-resolver-fun
        jobDetail(_: any, args: any) {
            console.log("query job detail jobId:" + args.jobId)
            return jobService.queryJobDetail(args.jobId);
        },

        searchJobs(_: any, args: any) {
            console.log("user search job input:" + args.userInput)
            // todo
            var jobs = jobSearchService.searchJobs(args.userInput, args.pageNumber)
            return {"jobs": jobs, "pageSize":0, "pageNumber":0, "totalCount": 0}
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
        addJob(_:any, args: any) {
            console.log("[Mutation] add job:" + args.job)
            return jobService.addJob(args.job);
        },

        updateJob(_:any, args: any) {
            return jobService.updateJob(args.job);
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