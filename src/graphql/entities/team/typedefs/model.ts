import gql from "graphql-tag";

const model = gql`
  type Team {
    id: Int!
    area: Area!
    name: String!
    shortName: String!
    tla: String
    crest: String!
    address: String!
    website: String
    founded: Int!
    clubColors: String
    venue: String
    runningCompetitions: [Competition]
    coach: Coach
    squad: [Player]
  }
`;

export default model;
