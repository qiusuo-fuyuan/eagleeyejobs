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
  companyName?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  removeJob?: Maybe<Job>;
};


export type MutationRemoveJobArgs = {
  jobId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  jobDetail?: Maybe<Job>;
  searchJobs?: Maybe<Array<Maybe<Job>>>;
};


export type QueryJobDetailArgs = {
  jobId: Scalars['String'];
};


export type QuerySearchJobsArgs = {
  pageNo?: InputMaybe<Scalars['Int']>;
};