import gql from "graphql-tag";

const model = gql`
  type Competition {
    id: Int!
    name: String!
    code: String!
    type: String!
    emblem: String!
    currentSeason: Season!
    seasons: [Season]
    area: Area!
    lastUpdated: DateTime
  }
`;

export default model;
