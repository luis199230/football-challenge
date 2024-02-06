import { mergeResolvers } from "@graphql-tools/merge";
import { Resolvers } from "../../generated/graphql";

import PlayerResolvers from "./player/resolvers";
import TeamResolvers from "./team/resolvers";
import CompetitionResolvers from "./competition/resolvers";
import SeasonResolvers from "./season/resolvers";

const resolvers: Resolvers[] = [
  PlayerResolvers,
  TeamResolvers,
  CompetitionResolvers,
  SeasonResolvers,
];

const mergedResolvers: Resolvers = mergeResolvers(resolvers);

export default mergedResolvers;
