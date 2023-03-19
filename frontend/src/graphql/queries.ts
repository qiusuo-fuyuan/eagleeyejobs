import gql from 'graphql-tag'


/**
 * login related
 */

export const WechatLoginUrl = gql`query WechatLoginUrl {
  wechatLoginUrl
}`

export const WechatAuthorizationCallback = gql`mutation WechatAuthorizationCallback($authorizationCode: String!, $state: String!) {
  wechatAuthorizationCallback(authorizationCode: $authorizationCode, state: $state) {
    jwtAccessToken
    jwtRefreshToken
  }
}
`

export const RefreshJwtToken = gql`mutation RefreshJwtToken($jwtRefreshToken: String) {
  refreshJwtToken(jwtRefreshToken: $jwtRefreshToken) {
    jwtAccessToken
    jwtRefreshToken
  }
}`

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

export const CreateQuestion = gql`mutation CreateQuestion($content: String, $title: String) {
  createQuestion(content: $content, title: $title) {
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

export const CreateAnswer = gql`mutation CreateAnswer($questionId: String!, $content: String){
  createAnswer(questionId: $questionId, content: $content){
    _id
    answers{
      _id
      content
    }
  }
}`


export const userDetails = gql`fragment UserDetails on User { 
  _id
  companyName
  email
  firstName
  profilePicture
  gender
  lastName
  nickName
  name
  role
  userId
}`

export const CurrentUserDetail = gql`query CurrentUserDetail {
  currentUserDetail {
    ...UserDetails
  }
}
${userDetails}
`


export const QuestionCreated = gql`subscription QuestionCreated {
  questionCreated {
    _id
    content
    title
  }
}`


export const AnswerCreated = gql`subscription AnswerCreated {
  answerCreated {
    _id
    content
    answers{
      _id
      content
    }
  }
}`



