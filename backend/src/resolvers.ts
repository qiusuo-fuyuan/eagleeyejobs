import { Job } from "./models/Job.js";
import jobService from "./services/job/JobService.js";
import jobSearchService from "./services/job/JobSearchService.js";
import qaService from "./services/qa/QAService.js";
import userService from "./services/user/UserService.js";
import permissionService from "./services/permission/PermissionService.js";
import thirdPartyLoginService from "./services/login/ThirdPartyLoginService.js";
import logger from "./utils/Logger.js";
import { JwtToken } from "./services/jwt/JwtToken.js";
import jwtTokenService from "./services/jwt/JwtTokenService.js";
import { User } from "./models/User.js";

import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();



type Context = {
    user: User
}
/**
 * ToDo: The arguments of resolvers need to be defined. Otherwise, the code readability
 * is really bad
 */
export const resolvers = {
    Query: {
        /**
         * Login query resolvers
         */
        wechatLoginUrl(_: any, args: any) {
            return thirdPartyLoginService.getLoginUrl("wechat")
         },
        
        /**
         * Jobs query resolvers
         */
        jobDetail(_: any, args: any) {
            logger.info("query job detail jobId:" + args.jobId)
            return jobService.queryJobDetail(args.jobId);
        },

        searchJobs(_: any, args: any) {
            logger.info("user search job input:" + args.userInput)
            return jobSearchService.searchJobs(args.userInput, args.pageNumber)
        },
        questionDetail(_: any, args: any) {
            logger.info("query question detail questionId:" + args.questionId)
            return qaService.queryQuestionDetail(args.questionId);
        },


        allQuestions(_: any, args: any) {
            return qaService.allQuestions()
        },

        /**
         * User Query Resolvers
         */
        currentUserDetail(_: any, args: any, { user }: any) {
            return user;
        },

        searchUser(_: any, args: any, { user }: any) {
            return userService.getAllUser()
        },

        /**
         * Membership Query Resolvers
         */


        /**
         * Community Story Query Resolvers
         */

    },

    Mutation: {
        /**
         * Login related
         */
        wechatAuthorizationCallback(_: any, args: any) {
            const authorizationCode = args.authorizationCode
            const state = args.state
            return thirdPartyLoginService.loginUserByAuthorizationCode("wechat", authorizationCode, state)
         },
        /**
         * Jobs Mutation Resolvers
        */
        addJob(_: any, args: any) {
            logger.info("[Mutation] add job:" + args.job)
            return jobService.addJob(args.job);
        },

        updateJob(_: any, args: any) {
            return jobService.updateJob(args.job);
        },

        createQuestion(_: any, args: any, { user }: Context, { fieldName }: any) {
            pubsub.publish('QUESTION_CREATED', { questionCreated: args }); 
            return qaService.addQuestion(args.title, args.content, args.userId)
        },

        createAnswer(_: any, args: any, { user }: Context, { fieldName }: any) {
            logger.info("createAnswer:" + args.questionId, args.content, args.userId)
            pubsub.publish('ANSWER_CREATED', { answerCreated: args }); 
            return qaService.addAnswer(args.questionId, args.content, args.userId)
        },
         /**
         * Jwt Token Mutations Resolvers
         */
        refreshJwtToken(_:any, args: any): JwtToken {
            return jwtTokenService.refreshJwtToken(args.jwtRefreshToken)
        },



        /**
         * User Mutation Resolvers
         */
        registerNewUser: (_: any, args: any, { user }: any, { fieldName }: any) => {
            logger.info('registerNewUser:' + args.email);
            return userService.registerUser(args)
        },

        /**
         * Membership Mutation Resolvers
         */


        /**
         * Community Story Mutation Resolvers
         */
    },
    Subscription: {
        questionCreated: {
          subscribe: () => pubsub.asyncIterator(['QUESTION_CREATED'])
      },
        answerCreated: { 
            subscribe:() => pubsub.asyncIterator(['ANSWER_CREATED'])
        }
    },
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
                typeResolvers[field] = function (source: any, args: any, context: any, info: any) {
                    beforeResolverCheck(source, args, context, info);
                    return originalResolver(source, args, context, info);
                }
            }
        }
    }
}

// let permissionCheckBeforeResolver = (source: any, args: any, context: any, info: any) => permissionService.hasPermission(context.user, info.fieldName)

// patchResolvers(resolvers, permissionCheckBeforeResolver)
