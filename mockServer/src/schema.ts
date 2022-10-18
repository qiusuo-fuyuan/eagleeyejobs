export const TypeDefs = `
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
}

input JobUpdate {
  _id: String!
  title: String
  content: String
  companyName: String
  country: String
  city: String
  address: String
}

type JobSearchPagingResult {
  jobs: [Job]
  pageSize: Int
  pageNumber: Int
  totalCount: Int
}

type Query {
  searchJobs(userInput: String, pageNumber: Int): JobSearchPagingResult
  jobDetail(jobId: String!): Job
}

type Mutation {
  addJob(job: JobInput): Job
  updateJob(job: JobUpdate): Job
  removeJob(jobId: String!): Job
}
`;