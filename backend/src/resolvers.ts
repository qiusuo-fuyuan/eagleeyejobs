import { Job } from "./models/Job.js";
import { JobService } from "./services/job/JobService.js";
import { JobSearchService } from "./services/job/JobSearchService.js";
import { QAService } from "./services/qa/QAService.js";
import { argv } from "process";

function getJobService(): JobService {
    if(jobService == undefined) {
        var jobService = new JobService()
    }
    return jobService
}

function getQAService(): QAService {
    if(QAService == undefined) {
        var qaService = new QAService()
    }
    return qaService
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
            return getJobService().addJob(args.job);
        },

        createQuestion: (_:any, args: any) => {
            console.log("createQuestion:" + args)
            return getQAService().addQuestion(args.title, args.content)
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