import { gql } from "apollo-server-express";

export const TypeDefs = gql`
  type Job {
    _id: String
    title: String
    content: String
    companyName: String
    country: String
    city: String
    address: String
    createdAt: String
    updatedAt: String
    isDeleted: Int
  }

  input JobInput {
    title: String!
    content: String!
    companyName: String
    country: String
    city: String
    address: String
    isDeleted: Int
  }

  input JobUpdate {
    _id: String!
    title: String
    content: String
    companyName: String
    country: String
    city: String
    address: String
    isDeleted: Int
  }
  
  type findJobsOutput {
    jobs: [Job]
    size: Int
    current: Int
    total: Int
  }

  type Query {
    searchJobs(pageNo: Int): [Job]
    jobDetail(jobId: String!): Job
    findJobsByTitle(titleKeyword: String!, page: Int, size: Int): findJobsOutput
  }

  type Mutation {
    addJob(job: JobInput): Job
    updateJob(job: JobUpdate): Job
    removeJob(jobId: String!): Job
  }
`;