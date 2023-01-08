import gql from 'graphql-tag'


/**
 * login related
 */

export const WechatLoginUrl = gql`query WechatLoginUrl {
  wechatLoginUrl
}`

export const WechatAuthorizationCallback = gql`query WechatAuthorizationCallback($authorizationCode: String!, $state: String!) {
  wechatAuthorizationCallback(authorizationCode: $authorizationCode, state: $state) {
    jwtToken
  }
}
`

/**
 * Job related
 */
export const jobBaseAttributes = gql`fragment JobBaseAttributes on Job { 
    title
    country
    city
    companyName
  }`

export const JobDetail = gql`query JobDetail($jobId: String!) {
  jobDetail(jobId: $jobId) { 
    ...JobBaseAttributes
    description
  }
}
${jobBaseAttributes}
`

export const SearchJobs = gql`query SearchJobs($userInput: String, $pageNumber: Int) {
  searchJobs(userInput: $userInput, pageNumber: $pageNumber) {
    pageSize
    pageNumber
    jobs {
      _id
    ...JobBaseAttributes
    }
  }
}
${jobBaseAttributes}
`

export const CreateQuestion = gql`mutation CreateQuestion($userId: String, $content: String, $title: String) {
  createQuestion(userId: $userId, content: $content, title: $title) {
    _id
    title
    content
    }
}`

export const AllQuestions = gql`query AllQuestions {
  allQuestions {
    _id
    title
    content
  }
}`

export const QuestionDetail = gql`query QuestionDetail($questionId: String!) {
  questionDetail(questionId: $questionId) { 
    _id
    title
    content
    answers{
      _id
      content
    }
  }
}`

export const CreateAnswer = gql`mutation CreateAnswer($questionId: String!, $content: String, $userId: String){
  createAnswer(questionId: $questionId, content: $content, userId: $userId){
    _id
    answers{
      _id
      content
    }
  }
}`

export const CurrentUserDetail = gql`query CurrentUserDetail {
  currentUserDetail {
    _id
    companyName
    email
    firstName
    gender
    lastName
    nickName
    name
    role
    userId
  }
}`