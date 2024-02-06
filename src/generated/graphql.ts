/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FootballContext } from '../server/context';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601 format Date without a time component. */
  Date: { input: any; output: any; }
  /** An ISO 8601 format Date with a time component. */
  DateTime: { input: any; output: any; }
};

export type Area = {
  __typename?: 'Area';
  code: Scalars['String']['output'];
  flag?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Coach = {
  __typename?: 'Coach';
  contract?: Maybe<Contract>;
  dateOfBirth?: Maybe<Scalars['Date']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nationality?: Maybe<Scalars['String']['output']>;
};

export type Competition = {
  __typename?: 'Competition';
  area: Area;
  code: Scalars['String']['output'];
  currentSeason: Season;
  emblem: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastUpdated?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  seasons?: Maybe<Array<Maybe<Season>>>;
  type: Scalars['String']['output'];
};

export type Contract = {
  __typename?: 'Contract';
  start?: Maybe<Scalars['String']['output']>;
  until?: Maybe<Scalars['String']['output']>;
};

export type ImportResponse = {
  __typename?: 'ImportResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  importCompetition: ImportResponse;
};


export type MutationImportCompetitionArgs = {
  code: Scalars['String']['input'];
};

export type Player = {
  __typename?: 'Player';
  currentTeam?: Maybe<Team>;
  dateOfBirth?: Maybe<Scalars['Date']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  lastUpdated?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  nationality?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
  shirtNumber?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  listPlayers?: Maybe<Array<Maybe<Player>>>;
  showTeam?: Maybe<Team>;
};


export type QueryListPlayersArgs = {
  competitionCode: Scalars['String']['input'];
  teamName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryShowTeamArgs = {
  name: Scalars['String']['input'];
};

export type Season = {
  __typename?: 'Season';
  currentMatchday?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['Date']['output']>;
  winner?: Maybe<Team>;
};

export type Team = {
  __typename?: 'Team';
  address: Scalars['String']['output'];
  area: Area;
  clubColors?: Maybe<Scalars['String']['output']>;
  coach?: Maybe<Coach>;
  crest: Scalars['String']['output'];
  founded: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  runningCompetitions?: Maybe<Array<Maybe<Competition>>>;
  shortName: Scalars['String']['output'];
  squad?: Maybe<Array<Maybe<Player>>>;
  tla?: Maybe<Scalars['String']['output']>;
  venue?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Area: ResolverTypeWrapper<Area>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Coach: ResolverTypeWrapper<Coach>;
  Competition: ResolverTypeWrapper<Competition>;
  Contract: ResolverTypeWrapper<Contract>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  ImportResponse: ResolverTypeWrapper<ImportResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Player: ResolverTypeWrapper<Player>;
  Query: ResolverTypeWrapper<{}>;
  Season: ResolverTypeWrapper<Season>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Team: ResolverTypeWrapper<Team>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Area: Area;
  Boolean: Scalars['Boolean']['output'];
  Coach: Coach;
  Competition: Competition;
  Contract: Contract;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  ImportResponse: ImportResponse;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Player: Player;
  Query: {};
  Season: Season;
  String: Scalars['String']['output'];
  Team: Team;
};

export type AreaResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['Area'] = ResolversParentTypes['Area']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoachResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['Coach'] = ResolversParentTypes['Coach']> = {
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nationality?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompetitionResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['Competition'] = ResolversParentTypes['Competition']> = {
  area?: Resolver<ResolversTypes['Area'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currentSeason?: Resolver<ResolversTypes['Season'], ParentType, ContextType>;
  emblem?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seasons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Season']>>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContractResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['Contract'] = ResolversParentTypes['Contract']> = {
  start?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  until?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ImportResponseResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['ImportResponse'] = ResolversParentTypes['ImportResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  importCompetition?: Resolver<ResolversTypes['ImportResponse'], ParentType, ContextType, RequireFields<MutationImportCompetitionArgs, 'code'>>;
};

export type PlayerResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  currentTeam?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nationality?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  section?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shirtNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  listPlayers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Player']>>>, ParentType, ContextType, RequireFields<QueryListPlayersArgs, 'competitionCode'>>;
  showTeam?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<QueryShowTeamArgs, 'name'>>;
};

export type SeasonResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = {
  currentMatchday?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  winner?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = FootballContext, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  area?: Resolver<ResolversTypes['Area'], ParentType, ContextType>;
  clubColors?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coach?: Resolver<Maybe<ResolversTypes['Coach']>, ParentType, ContextType>;
  crest?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  founded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  runningCompetitions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Competition']>>>, ParentType, ContextType>;
  shortName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  squad?: Resolver<Maybe<Array<Maybe<ResolversTypes['Player']>>>, ParentType, ContextType>;
  tla?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  venue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = FootballContext> = {
  Area?: AreaResolvers<ContextType>;
  Coach?: CoachResolvers<ContextType>;
  Competition?: CompetitionResolvers<ContextType>;
  Contract?: ContractResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  ImportResponse?: ImportResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Season?: SeasonResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
};

