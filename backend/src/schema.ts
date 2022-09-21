import { gql } from "apollo-server-express";

export const TypeDefs = gql`
  type Job {
    title: String
    location: String
    content: String
    companyName: String
  }
  type Query {
    searchJobs(pageNo: Int): [Job]
    jobDetail(jobId: String!): Job
  }

  type Mutation {
    removeJob(jobId: String!): Job
  }
`;