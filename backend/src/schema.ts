import { gql } from "apollo-server-express";

export const TypeDefs = gql`
  type Job {
    _id: String
    title: String
    location: String
    content: String
    companyName: String
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
    searchJobs(pageNo: Int): [Job]
    jobDetail(jobId: String!): Job
    questionDetail(QuestionId: String!): Question
  }

  type Mutation {
    removeJob(jobId: String!): Job
    createQuestion(title: String, content: String): Question
  }
`;