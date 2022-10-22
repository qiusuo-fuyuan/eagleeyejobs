export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Answer = {
  __typename?: 'Answer';
  _id?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Comment = {
  __typename?: 'Comment';
  _id?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Job = {
  __typename?: 'Job';
  _id: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  companyName: Scalars['String'];
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type JobInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type JobSearchPagingResult = {
  __typename?: 'JobSearchPagingResult';
  jobs?: Maybe<Array<Maybe<Job>>>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type JobUpdate = {
  _id: Scalars['String'];
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addJob?: Maybe<Job>;
  createQuestion?: Maybe<Question>;
  removeJob?: Maybe<Job>;
  updateJob?: Maybe<Job>;
};


export type MutationAddJobArgs = {
  job?: InputMaybe<JobInput>;
};


export type MutationCreateQuestionArgs = {
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveJobArgs = {
  jobId: Scalars['String'];
};


export type MutationUpdateJobArgs = {
  job?: InputMaybe<JobUpdate>;
};

export type Query = {
  __typename?: 'Query';
  jobDetail?: Maybe<Job>;
  questionDetail?: Maybe<Question>;
  searchJobs?: Maybe<JobSearchPagingResult>;
};


export type QueryJobDetailArgs = {
  jobId: Scalars['String'];
};


export type QueryQuestionDetailArgs = {
  questionId: Scalars['String'];
};


export type QuerySearchJobsArgs = {
  pageNumber?: InputMaybe<Scalars['Int']>;
  userInput?: InputMaybe<Scalars['String']>;
};

export type Question = {
  __typename?: 'Question';
  _id?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Answer>>>;
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type JobDetailQueryVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type JobDetailQuery = { __typename?: 'Query', jobDetail?: { __typename?: 'Job', title: string, description?: string | null } | null };

export type SearchJobsQueryVariables = Exact<{
  userInput?: InputMaybe<Scalars['String']>;
  pageNumber?: InputMaybe<Scalars['Int']>;
}>;


export type SearchJobsQuery = { __typename?: 'Query', searchJobs?: { __typename?: 'JobSearchPagingResult', pageSize?: number | null, pageNumber?: number | null, jobs?: Array<{ __typename?: 'Job', city: string, country: string, companyName: string, title: string, _id: string } | null> | null } | null };

export type QuestionDetailQueryVariables = Exact<{
  questionId: Scalars['String'];
}>;


export type QuestionDetailQuery = { __typename?: 'Query', questionDetail?: { __typename?: 'Question', title?: string | null, content?: string | null } | null };

export type CreateQuestionMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion?: { __typename?: 'Question', title?: string | null, content?: string | null } | null };
