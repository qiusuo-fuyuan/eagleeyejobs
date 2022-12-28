import { Job } from "./models/Job.js";
import jobService from "./services/job/JobService.js";
import jobSearchService from "./services/job/JobSearchService.js";
import qaService from "./services/qa/QAService.js";
import userService  from "./services/user/UserService.js";
import permissionService from "./services/permission/PermissionService.js";

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

        allQuestions(_: any, args: any, {user2}:any) {
            console.log(user2, user2.role)
            permissionService.hasPermission(user2, "allQuestions")
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

        createQuestion(_:any, args: any, {user1}:any) {
            console.log(user1, user1.role)
            // console.log(userPermissions)
            console.log(args.callee.name)
            permissionService.hasPermission(user1, args.callee.name )
    
            console.log("createQuestion:" + args)


            // return qaService.addQuestion(args.title, args.content, args.userId)
        },

        createAnswer:(_:any, args: any) => { 
            // permissionService.hasPermission(ctx)
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
    Question: {
        /**
         * Question Query Resolvers
         */
        user: (parent:any, args: any) => {
            console.log("question's user: "+ args)
            return userService.queryUserDetail(parent.userId)
        }
    }
};

function patchResolvers(resolvers: any, beforeResolverCheck: any) {
    // Loop through the Query and Mutation attributes of the resolvers object
    for (const type of ['Query', 'Mutation']) {
      const typeResolvers = resolvers[type];
      // Loop through the attributes of the Query or Mutation object
      for (const field in typeResolvers) {
        // Check if the attribute is a function
        if (typeof typeResolvers[field] === 'function') {
          // Save a reference to the original function
          const originalResolver = typeResolvers[field];
          // Replace the function with a new function that calls the beforeResolverCheck function before executing the original function
          typeResolvers[field] = function(...args: any[]) {
            beforeResolverCheck(args);
            return originalResolver(...args);
          }
        }
      }
    }
  }

patchResolvers(resolvers, () => console.log('Before resolver check'));
