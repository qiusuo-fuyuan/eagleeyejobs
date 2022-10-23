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


export const mockData = {
    Query: {
      searchJobs: () => searchJobList,
      jobDetail: () => angularJob
    }
};

  