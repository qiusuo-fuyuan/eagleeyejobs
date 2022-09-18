import { gql } from "apollo-server-express";

export const TypeDefs = gql`
  type Job {
    title: String
  }
  type Query {
    allJobs: [Job]
  }
`;