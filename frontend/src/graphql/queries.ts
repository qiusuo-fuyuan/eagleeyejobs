import gql from 'graphql-tag'


export const JobBaseAttributes = gql`
  fragment JobBaseAttributes on Job {
  title
  country
  city
  companyName
}
`

export const JobDetail = gql`query JobDetail($jobId: String!) {
  ${JobBaseAttributes}
  jobDetail(jobId: $jobId) { 
  ...JobBaseAttributes
    description
  }
}`

export const SearchJobs = gql`query SearchJobs($userInput: String, $pageNumber: Int) {
  ${JobBaseAttributes}
  searchJobs(userInput: $userInput, pageNumber: $pageNumber) {
    pageSize
    pageNumber
    jobs {
    _id
    ...JobBaseAttributes
    }
  }
}`