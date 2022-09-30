import { gql } from "apollo-server-express";

export const TypeDefs = gql`
  type Job {
    _id: String
    title: String
    location: String
    content: String
    companyName: String
  }
  
  input JobSave {
    title: String!
    location: String!
}
  
  type Query {
    searchJobs(pageNo: Int): [Job]
    jobDetail(jobId: String!): Job
  }

  type Mutation {
    addJob(job: JobSave): Job
    removeJob(jobId: String!): Job
  }
`;