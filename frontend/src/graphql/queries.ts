import gql from 'graphql-tag'


export const JobDetail = gql`query JobDetail($jobId: String!) {
  jobDetail(jobId: $jobId) { 
    title
    description
  }
}`

export const SearchJobs = gql`query SearchJobs($userInput: String, $pageNumber: Int) {
  searchJobs(userInput: $userInput, pageNumber: $pageNumber) {
    pageSize
    pageNumber
    jobs {
      city
      country
      companyName
      title
      _id
    }
  }
}`