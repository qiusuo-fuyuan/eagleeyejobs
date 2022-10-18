import { MockList } from "@graphql-tools/mock";
import { Job } from "../models/Job";
import { JobSearchPagingResult } from "../models/JobSearchPagingResult";


const searchJobList: JobSearchPagingResult = {
  pageSize: 2,
  pageNumber: 0,
  totalCount: 40,
  jobs: [{
    _id: '23434343',
    title: 'Senior React Frontend Engineer',
    country: 'Germany',
    city: 'Berlin',
    description: 'We have a magic job located in Berlin. What we can offer',
    companyName: 'Kloeckner.i GmbH',
    createdAt: '2022-10-19',
    updatedAt: '2022-10-19',
    address: 'Berlin Haupbahnhof'
  },
  {
    _id: '234342343',
    title: 'Senior Angular Frontend Engineer',
    country: 'Germany',
    city: 'Berlin',
    description: 'We have a magic job located in Berlin. What we can offer. 30 Days vacation per year',
    companyName: 'Kloeckner.i GmbH',
    createdAt: '2022-10-19',
    updatedAt: '2022-10-19',
    address: 'Berlin Haupbahnhof'
  }]
}


export const resolvers = {
    Query: {
      searchJobs: () => searchJobList,
    }
};
  