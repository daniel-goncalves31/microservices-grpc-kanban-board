import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
};

export type MultipleUsersResponse = {
  __typename?: 'MultipleUsersResponse';
  users: Array<UserResponse>;
};

export type TaskResponse = {
  __typename?: 'TaskResponse';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type OkResponse = {
  __typename?: 'OkResponse';
  ok: Scalars['Boolean'];
};

export type Stage = {
  __typename?: 'Stage';
  id: Scalars['ID'];
  progress: Progress;
  projectId: Scalars['ID'];
  tasks: Array<TaskResponse>;
};

export enum Progress {
  Todo = 'TODO',
  Doing = 'DOING',
  Done = 'DONE'
}

export type StagesResponse = {
  __typename?: 'StagesResponse';
  stages: Array<Stage>;
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  id: Scalars['ID'];
  name: Scalars['String'];
  priority: Priority;
  status: Status;
  createdAt: Scalars['String'];
  userId: Scalars['ID'];
};

export enum Priority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH'
}

export enum Status {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS'
}

export type ProjectsResponse = {
  __typename?: 'ProjectsResponse';
  projects: Array<ProjectResponse>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<UserResponse>;
  getAllUsers: MultipleUsersResponse;
  getStages: StagesResponse;
  getProjects: ProjectsResponse;
};


export type QueryGetStagesArgs = {
  projectId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  signUp: UserResponse;
  logOut: Scalars['Boolean'];
  newTask: TaskResponse;
  updateTask: OkResponse;
  deleteTask: OkResponse;
  createProject: ProjectResponse;
  updateProject: OkResponse;
  deleteProject: OkResponse;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationSignUpArgs = {
  signUpUserInput: SignUpUserInput;
};


export type MutationNewTaskArgs = {
  newTaskInput: NewTaskRequest;
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskRequest;
};


export type MutationDeleteTaskArgs = {
  taskIdInput: TaskIdRequest;
};


export type MutationCreateProjectArgs = {
  newProjectInput: NewProjectRequest;
};


export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectRequest;
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['ID'];
};

export type LoginUserInput = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type SignUpUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type NewTaskRequest = {
  name: Scalars['String'];
  stageId: Scalars['ID'];
};

export type UpdateTaskRequest = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TaskIdRequest = {
  id: Scalars['ID'];
};

export type NewProjectRequest = {
  name: Scalars['String'];
  priority: Priority;
};

export type UpdateProjectRequest = {
  id: Scalars['ID'];
  name: Scalars['String'];
  status: Status;
  priority: Priority;
};

export type LogOutMutationVariables = {};


export type LogOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logOut'>
);

export type LoginMutationVariables = {
  loginUserInput: LoginUserInput;
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'id' | 'name' | 'email'>
  ) }
);

export type SignUpMutationVariables = {
  signUpUserInput: SignUpUserInput;
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'id' | 'name' | 'email'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'id' | 'name' | 'email'>
  )> }
);


export const LogOutDocument = gql`
    mutation LogOut {
  logOut
}
    `;
export type LogOutMutationFn = ApolloReactCommon.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, baseOptions);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = ApolloReactCommon.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginUserInput: LoginUserInput!) {
  login(loginUserInput: $loginUserInput) {
    id
    name
    email
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginUserInput: // value for 'loginUserInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($signUpUserInput: SignUpUserInput!) {
  signUp(signUpUserInput: $signUpUserInput) {
    id
    name
    email
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signUpUserInput: // value for 'signUpUserInput'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;