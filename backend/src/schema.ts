import { gql } from "apollo-server-express";

export const TypeDefs = gql`
  type Job {
    _id: String
    title: String
    location: String
    content: String
    companyName: String
  }
  
  input JobInput {
    title: String!
    location: String!
  }

  input JobUpdate {
    jobId: String!
    title: String
    location: String
  }
  
  
  type Query {
    searchJobs(pageNo: Int): [Job]
    jobDetail(jobId: String!): Job
  }

  type Mutation {
    addJob(job: JobInput): Job
    updateJob(job: JobUpdate): Job
    removeJob(jobId: String!): Job
  }
`;