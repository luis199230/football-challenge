import { DocumentNode } from "graphql";

import ScalarTypes from "./scalar/typedefs";
import AreaTypes from "./area/typedefs";
import ContractTypes from "./contract/typedefs";
import CoachTypes from "./coach/typedefs";
import PlayerTypes from "./player/typedefs";
import CompetitionTypes from "./competition/typedefs";
import SeasonTypes from "./season/typedefs";
import TeamTypes from "./team/typedefs";

const typeDefs: DocumentNode[] = [
    ...ScalarTypes,
    ...AreaTypes,
    ...ContractTypes,
    ...CoachTypes,
    ...PlayerTypes,
    ...CompetitionTypes,
    ...SeasonTypes,
    ...TeamTypes,
];
  
  export default typeDefs;