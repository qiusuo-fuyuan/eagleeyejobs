import { Job } from "./models/Job.js";
import { JobService } from "./services/job/JobService.js";
import { JobSearchService } from "./services/job/JobSearchService.js";
import { QAService } from "./services/qa/QAService.js";

let jobService = new JobService()
let jobSearchService: JobSearchService = new JobSearchService()

let qaService: QAService = new QAService()


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
            return jobSearchService.searchJobs(args.userInput, args.pageNumber)
        },

        questionDetail(_: any, args: any) {
            console.log("query question detail questionId:" + args.questionId)
            return qaService.queryQuestionDetail(args.questionId);
        },

        // questionAnswers:(parent, args, context) => {
        //         const questionId = parent.id;
        //         return s.filter(product => product.category === categeryId);
        // }, 

        allQuestions(_: any, args: any) {
            console.log("query all questions")
            return qaService.allQuestions()
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
        },

        createQuestion: (_:any, args: any) => {
            console.log("createQuestion:" + args)
            return qaService.addQuestion(args.title, args.content, args.userId)
        },

        createAnswer:(_:any, args: any) => { 
            console.log("createAnswer:" + args.questionId, args.content, args.userId)
            return qaService.addAnswer(args.questionId, args.content, args.userId)
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
    },
    // Question: {
    //     /**
    //      * Question Query Resolvers
    //      */
    //     answers: (_:any, args: any) => {
    //         console.log("question answers: "+ args)
    //         return answerService.questionAnswers(args.questionId)
    //     }


    // }
};