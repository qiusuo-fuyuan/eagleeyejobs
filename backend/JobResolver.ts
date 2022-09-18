import { Job } from './ models/Job.js'


export const resolvers = {
    Query: {
        allJobs: () => new Job("")
    },
};