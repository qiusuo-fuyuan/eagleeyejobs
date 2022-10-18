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
  removeJob?: Maybe<Job>;
  updateJob?: Maybe<Job>;
};


export type MutationAddJobArgs = {
  job?: InputMaybe<JobInput>;
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
  searchJobs?: Maybe<JobSearchPagingResult>;
};


export type QueryJobDetailArgs = {
  jobId: Scalars['String'];
};


export type QuerySearchJobsArgs = {
  pageNumber?: InputMaybe<Scalars['Int']>;
  userInput?: InputMaybe<Scalars['String']>;
};

export type JobBaseAttributesFragment = { __typename?: 'Job', title: string, country: string, city: string, companyName: string };

export type JobDetailQueryVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type JobDetailQuery = { __typename?: 'Query', jobDetail?: { __typename?: 'Job', description?: string | null, title: string, country: string, city: string, companyName: string } | null };

export type SearchJobsQueryVariables = Exact<{
  userInput?: InputMaybe<Scalars['String']>;
  pageNumber?: InputMaybe<Scalars['Int']>;
}>;


export type SearchJobsQuery = { __typename?: 'Query', searchJobs?: { __typename?: 'JobSearchPagingResult', pageSize?: number | null, pageNumber?: number | null, jobs?: Array<{ __typename?: 'Job', _id: string, title: string, country: string, city: string, companyName: string } | null> | null } | null };
