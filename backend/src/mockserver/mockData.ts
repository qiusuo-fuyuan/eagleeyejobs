import { MockList } from "@graphql-tools/mock";
import { Job } from "../models/Job";
import { JobSearchPagingResult } from "../models/JobSearchPagingResult";


const angularJob = {
  _id: '23434343',
  title: 'Senior React Frontend Engineer',
  country: 'Germany',
  city: 'Berlin',
  description: 'We have a magic job located in Berlin. What we can offer',
  companyName: 'Kloeckner.i GmbH',
  createdAt: '2022-10-19',
  updatedAt: '2022-10-19',
  address: 'Berlin Haupbahnhof'
}

const reactJob =  {
  _id: '234342343',
  title: 'Senior Angular Frontend Engineer',
  country: 'Germany',
  city: 'Berlin',
  description: 'We have a magic job located in Berlin. What we can offer. 30 Days vacation per year',
  companyName: 'Kloeckner.i GmbH',
  createdAt: '2022-10-19',
  updatedAt: '2022-10-19',
  address: 'Berlin Haupbahnhof'
}

const searchJobList: JobSearchPagingResult = {
  pageSize: 2,
  pageNumber: 0,
  totalCount: 40,
  jobs: [angularJob, reactJob]
}

const question1 = {
  _id: "0100",
  title: "question NO.1",
  content: "how to use apollo?"
}

const question2 = {
  _id: "0101",
  title: "question NO.2",
  content: "how to use vue?"
}

const question3 = {
  _id: "0102",
  title: "question NO.3",
  content: "how to use graghQL?"
}

const allQuestions = [ question1, question2, question3 ]



export const mockData = {
    Query: {
      searchJobs: () => searchJobList,
      jobDetail: () => angularJob,
      allQuestions: () => allQuestions
    }
};

  
export enum USER_AUTHORIZATION_STATE {
  NOT_SCANNED,
  SCANNED,
  CONFIRMED
}


export const activeAuthorizationSessions: {[uuid: string]: any} = {
  "0215MUmK2z350w3w": USER_AUTHORIZATION_STATE.NOT_SCANNED
}