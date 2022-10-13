import { gql } from "apollo-server-express";

export const TypeDefs = gql`
  type Job {
    _id: String!
    title: String!
    description: String
    companyName: String!
    country: String!
    city: String!
    address: String
    createdAt: String
    updatedAt: String
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
  
  type JobSearchPagingResult {
    jobs: [Job]
    pageSize: Int
    pageNumber: Int
    totalCount: Int
  }

  type Question {
    _id: String
    title: String
    content: String
    answers: [Answer]
  }

  type Answer {
    _id: String
    content: String
    question: Question
  }


  type Query {
    searchJobs(userInput: String, pageNumber: Int): JobSearchPagingResult
    jobDetail(jobId: String!): Job
    questionDetail(QuestionId: String!): Question
  }

  type Mutation {
    addJob(job: JobInput): Job
    updateJob(job: JobUpdate): Job
    removeJob(jobId: String!): Job
    createQuestion(title: String, content: String): Question
  }
`;